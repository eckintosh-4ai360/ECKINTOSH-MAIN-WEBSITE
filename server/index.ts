import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { DEFAULT_SITE_CONTENT, type CaseStudy, type SiteContent } from '../src/data/contentData';
import { mergeSiteContent, stampContentVersion } from '../src/data/contentMerge';
import { query } from './db';
import { caseStudyFromRow, initializeDatabase, normalizeCaseStudy, type CaseStudyRow } from './migrate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 3000);
const jwtSecret = process.env.JWT_SECRET || 'development-only-change-this-secret';
const cookieName = 'eckintosh_admin_session';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

type AdminToken = {
  sub: string;
  email: string;
};

type AdminSearchScope = 'content' | 'projects' | 'inquiries' | 'media';

type AdminSearchResult = {
  id: string;
  scope: AdminSearchScope;
  target: string;
  title: string;
  subtitle: string;
  match: string;
};

function sendError(res: express.Response, status: number, message: string) {
  res.status(status).json({ error: message });
}

function signAdminCookie(res: express.Response, payload: AdminToken) {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

function clearAdminCookie(res: express.Response) {
  res.clearCookie(cookieName, { path: '/' });
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.cookies?.[cookieName];
  if (!token) {
    sendError(res, 401, 'Admin login required.');
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AdminToken;
    res.locals.admin = decoded;
    next();
  } catch {
    clearAdminCookie(res);
    sendError(res, 401, 'Admin session expired.');
  }
}

function publicInquiryFromBody(body: Record<string, unknown>) {
  return {
    projectType: String(body.projectType || '').trim(),
    timeline: String(body.timeline || '').trim(),
    budget: String(body.budget || '').trim(),
    fullName: String(body.fullName || '').trim(),
    organization: String(body.organization || '').trim(),
    phone: String(body.phone || '').trim(),
    email: String(body.email || '').trim(),
    notes: String(body.notes || '').trim(),
  };
}

function inquiryFromRow(row: Record<string, string>) {
  return {
    id: row.id,
    projectType: row.project_type,
    timeline: row.timeline,
    budget: row.budget,
    fullName: row.full_name,
    organization: row.organization,
    phone: row.phone,
    email: row.email,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
  };
}

async function loadContent(): Promise<SiteContent> {
  const result = await query<{ value: SiteContent }>('select value from site_content where key = $1', ['default']);
  const stored = result.rows[0]?.value;
  // Merge over the shipped defaults so newly released sections and systems
  // surface even when an older record is already saved.
  return stored ? mergeSiteContent(stored) : DEFAULT_SITE_CONTENT;
}

async function saveContent(content: SiteContent): Promise<SiteContent> {
  const result = await query<{ value: SiteContent }>(
    `
      insert into site_content (key, value, updated_at)
      values ('default', $1::jsonb, now())
      on conflict (key)
      do update set value = excluded.value, updated_at = now()
      returning value
    `,
    [JSON.stringify(stampContentVersion(content))]
  );
  return mergeSiteContent(result.rows[0].value);
}

function labelContentPath(path: string[]) {
  return path
    .filter((segment) => !/^\d+$/.test(segment))
    .map((segment) => segment.replace(/([a-z])([A-Z])/g, '$1 $2'))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' · ');
}

function findContentMatches(value: unknown, term: string, path: string[] = [], results: AdminSearchResult[] = []): AdminSearchResult[] {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    const text = String(value);
    const matchIndex = text.toLowerCase().indexOf(term);
    if (matchIndex !== -1) {
      const start = Math.max(0, matchIndex - 52);
      const end = Math.min(text.length, matchIndex + term.length + 88);
      results.push({
        id: `content-${path.join('-')}-${results.length}`,
        scope: 'content',
        target: path[0] || 'contentVersion',
        title: labelContentPath(path.slice(0, -1)) || 'Website content',
        subtitle: labelContentPath(path.slice(-1)) || 'Content value',
        match: `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`,
      });
    }
    return results;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => findContentMatches(item, term, [...path, String(index)], results));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => findContentMatches(item, term, [...path, key], results));
  }

  return results;
}

function textForSearch(value: unknown) {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value) || '';
  } catch {
    return String(value || '');
  }
}

function matchesSearch(row: Record<string, unknown>, term: string) {
  return Object.values(row).some((value) => textForSearch(value).toLowerCase().includes(term));
}

function searchSnippet(values: unknown[], term: string) {
  const text = values.map(textForSearch).find((value) => value.toLowerCase().includes(term)) || '';
  const index = text.toLowerCase().indexOf(term);
  const start = Math.max(0, index - 48);
  const end = Math.min(text.length, index + term.length + 92);
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

async function listCaseStudies(includeUnpublished = false): Promise<CaseStudy[]> {
  const result = await query<CaseStudyRow>(
    `
      select *
      from case_studies
      where ($1::boolean = true or is_published = true)
      order by sort_order asc, created_at desc
    `,
    [includeUnpublished]
  );
  return result.rows.map(caseStudyFromRow);
}

async function upsertCaseStudy(input: Partial<CaseStudy>, id?: string): Promise<CaseStudy> {
  const caseStudy = normalizeCaseStudy({ ...input, id: id || input.id });
  if (!caseStudy.title || !caseStudy.client || !caseStudy.summary) {
    throw new Error('Title, client, and summary are required.');
  }

  const result = await query<CaseStudyRow>(
    `
      insert into case_studies (
        id, title, client, industry, tags, summary, challenge, solution,
        architecture, technologies, impact, hero_image, ui_highlights, updated_at
      )
      values ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13::jsonb, now())
      on conflict (id)
      do update set
        title = excluded.title,
        client = excluded.client,
        industry = excluded.industry,
        tags = excluded.tags,
        summary = excluded.summary,
        challenge = excluded.challenge,
        solution = excluded.solution,
        architecture = excluded.architecture,
        technologies = excluded.technologies,
        impact = excluded.impact,
        hero_image = excluded.hero_image,
        ui_highlights = excluded.ui_highlights,
        updated_at = now()
      returning *
    `,
    [
      caseStudy.id,
      caseStudy.title,
      caseStudy.client,
      caseStudy.industry,
      JSON.stringify(caseStudy.tags),
      caseStudy.summary,
      caseStudy.challenge,
      caseStudy.solution,
      JSON.stringify(caseStudy.architecture),
      JSON.stringify(caseStudy.technologies),
      JSON.stringify(caseStudy.impact),
      caseStudy.heroImage,
      JSON.stringify(caseStudy.uiHighlights),
    ]
  );

  return caseStudyFromRow(result.rows[0]);
}

function uploadToCloudinary(file: Express.Multer.File, folder: string) {
  return new Promise<{
    public_id: string;
    url: string;
    secure_url: string;
    resource_type: string;
    bytes?: number;
    width?: number;
    height?: number;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Cloudinary upload failed.'));
          return;
        }
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/content', async (_req, res) => {
  try {
    res.json(await loadContent());
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load site content.');
  }
});

app.get('/api/case-studies', async (_req, res) => {
  try {
    res.json(await listCaseStudies(false));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load case studies.');
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = publicInquiryFromBody(req.body);
    if (!inquiry.fullName || !inquiry.phone || !inquiry.email) {
      sendError(res, 400, 'Name, phone, and email are required.');
      return;
    }

    const result = await query(
      `
        insert into inquiries (project_type, timeline, budget, full_name, organization, phone, email, notes)
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning *
      `,
      [
        inquiry.projectType,
        inquiry.timeline,
        inquiry.budget,
        inquiry.fullName,
        inquiry.organization,
        inquiry.phone,
        inquiry.email,
        inquiry.notes,
      ]
    );

    res.status(201).json(inquiryFromRow(result.rows[0]));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to submit inquiry.');
  }
});

/**
 * First-party pageview beacon. No cookies, no IP or user-agent storage —
 * just a path and the referrer's origin, so the admin dashboard can see
 * what's getting traffic without any third-party analytics script.
 */
app.post('/api/analytics/event', async (req, res) => {
  try {
    const path = String(req.body?.path || '').slice(0, 300) || '/';
    let referrer = '';
    const rawReferrer = String(req.body?.referrer || '');
    if (rawReferrer) {
      try {
        referrer = new URL(rawReferrer).origin;
      } catch {
        referrer = '';
      }
    }

    await query('insert into page_views (path, referrer) values ($1, $2)', [path, referrer]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    // Never let analytics failures surface to visitors.
    res.status(204).end();
  }
});

app.get('/api/admin/session', requireAdmin, (_req, res) => {
  res.json({ user: res.locals.admin });
});

/** Search every admin-managed text source without exposing any data publicly. */
app.get('/api/admin/search', requireAdmin, async (req, res) => {
  try {
    const term = String(req.query.q || '').trim().toLowerCase();
    if (term.length < 2) {
      res.json([] satisfies AdminSearchResult[]);
      return;
    }

    const [content, projectsResult, inquiriesResult, mediaResult] = await Promise.all([
      loadContent(),
      query<Record<string, unknown>>(
        'select id, title, client, industry, tags, summary, challenge, solution, architecture, technologies, impact, hero_image, ui_highlights from case_studies order by updated_at desc'
      ),
      query<Record<string, unknown>>(
        'select id, project_type, timeline, budget, full_name, organization, phone, email, notes, status, created_at from inquiries order by created_at desc'
      ),
      query<Record<string, unknown>>(
        'select id, public_id, url, secure_url, resource_type, folder, original_filename, created_at from media_assets order by created_at desc'
      ),
    ]);

    const contentMatches = findContentMatches(content, term).slice(0, 12);
    const projectMatches = projectsResult.rows
      .filter((row) => matchesSearch(row, term))
      .slice(0, 8)
      .map((row) => ({
        id: `project-${String(row.id)}`,
        scope: 'projects' as const,
        target: String(row.id),
        title: String(row.title || 'Untitled project'),
        subtitle: [row.client, row.industry].filter(Boolean).join(' · ') || 'Case study',
        match: searchSnippet([row.id, row.title, row.client, row.industry, row.summary, row.challenge, row.solution, row.tags, row.architecture, row.technologies, row.impact, row.ui_highlights, row.hero_image], term),
      }));
    const inquiryMatches = inquiriesResult.rows
      .filter((row) => matchesSearch(row, term))
      .slice(0, 8)
      .map((row) => ({
        id: `inquiry-${String(row.id)}`,
        scope: 'inquiries' as const,
        target: String(row.id),
        title: String(row.full_name || row.organization || 'Website inquiry'),
        subtitle: [row.project_type, row.email].filter(Boolean).join(' · ') || 'Contact message',
        match: searchSnippet([row.id, row.full_name, row.organization, row.email, row.phone, row.project_type, row.notes, row.budget, row.timeline, row.status], term),
      }));
    const mediaMatches = mediaResult.rows
      .filter((row) => matchesSearch(row, term))
      .slice(0, 8)
      .map((row) => ({
        id: `media-${String(row.id)}`,
        scope: 'media' as const,
        target: String(row.id),
        title: String(row.original_filename || row.public_id || 'Media asset'),
        subtitle: [row.folder, row.resource_type].filter(Boolean).join(' · ') || 'Uploaded asset',
        match: searchSnippet([row.id, row.original_filename, row.public_id, row.url, row.secure_url, row.folder, row.resource_type], term),
      }));

    res.json([...contentMatches, ...projectMatches, ...inquiryMatches, ...mediaMatches].slice(0, 30));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to search admin content.');
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    const result = await query<{ id: string; email: string; password_hash: string }>(
      'select id, email, password_hash from admin_users where lower(email) = $1 limit 1',
      [email]
    );

    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      sendError(res, 401, 'Incorrect email or password.');
      return;
    }

    const payload = { sub: user.id, email: user.email };
    signAdminCookie(res, payload);
    res.json({ user: payload });
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to sign in.');
  }
});

app.post('/api/admin/logout', (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

app.get('/api/admin/content', requireAdmin, async (_req, res) => {
  try {
    res.json(await loadContent());
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load content.');
  }
});

app.put('/api/admin/content', requireAdmin, async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      sendError(res, 400, 'Content must be a JSON object.');
      return;
    }

    res.json(await saveContent(req.body as SiteContent));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to save content.');
  }
});

app.get('/api/admin/case-studies', requireAdmin, async (_req, res) => {
  try {
    res.json(await listCaseStudies(true));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load projects.');
  }
});

app.post('/api/admin/case-studies', requireAdmin, async (req, res) => {
  try {
    res.status(201).json(await upsertCaseStudy(req.body));
  } catch (error) {
    sendError(res, 400, error instanceof Error ? error.message : 'Failed to save project.');
  }
});

app.put('/api/admin/case-studies/:id', requireAdmin, async (req, res) => {
  try {
    res.json(await upsertCaseStudy(req.body, req.params.id));
  } catch (error) {
    sendError(res, 400, error instanceof Error ? error.message : 'Failed to save project.');
  }
});

app.delete('/api/admin/case-studies/:id', requireAdmin, async (req, res) => {
  try {
    await query('delete from case_studies where id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to delete project.');
  }
});

app.get('/api/admin/inquiries', requireAdmin, async (_req, res) => {
  try {
    const result = await query('select * from inquiries order by created_at desc');
    res.json(result.rows.map(inquiryFromRow));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load inquiries.');
  }
});

app.patch('/api/admin/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    const status = String(req.body.status || '');
    if (!['new', 'read', 'archived'].includes(status)) {
      sendError(res, 400, 'Invalid inquiry status.');
      return;
    }

    const result = await query(
      'update inquiries set status = $2, updated_at = now() where id = $1 returning *',
      [req.params.id, status]
    );
    res.json(inquiryFromRow(result.rows[0]));
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to update inquiry.');
  }
});

app.delete('/api/admin/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    await query('delete from inquiries where id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to delete inquiry.');
  }
});

app.get('/api/admin/analytics/summary', requireAdmin, async (_req, res) => {
  try {
    const [totalResult, todayResult, weekResult, topPathsResult, dailyResult] = await Promise.all([
      query<{ count: string }>('select count(*)::text as count from page_views'),
      query<{ count: string }>("select count(*)::text as count from page_views where created_at >= now() - interval '1 day'"),
      query<{ count: string }>("select count(*)::text as count from page_views where created_at >= now() - interval '7 days'"),
      query<{ path: string; count: string }>(
        `select path, count(*)::text as count from page_views
         where created_at >= now() - interval '30 days'
         group by path order by count(*) desc limit 8`
      ),
      query<{ day: string; count: string }>(
        `select to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as day, count(*)::text as count
         from page_views
         where created_at >= now() - interval '14 days'
         group by 1 order by 1 asc`
      ),
    ]);

    res.json({
      total: Number(totalResult.rows[0]?.count || 0),
      last24h: Number(todayResult.rows[0]?.count || 0),
      last7d: Number(weekResult.rows[0]?.count || 0),
      topPaths: topPathsResult.rows.map((row) => ({ path: row.path, count: Number(row.count) })),
      daily: dailyResult.rows.map((row) => ({ day: row.day, count: Number(row.count) })),
    });
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load analytics summary.');
  }
});

app.get('/api/admin/media', requireAdmin, async (_req, res) => {
  try {
    const result = await query(
      'select * from media_assets order by created_at desc'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to load media assets.');
  }
});

app.post('/api/admin/media', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      sendError(res, 400, 'No file uploaded.');
      return;
    }

    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      sendError(res, 500, 'Cloudinary is not configured.');
      return;
    }

    const requestedFolder = String(req.body.folder || 'media').replace(/[^a-zA-Z0-9/_-]/g, '');
    const folder = `eckintosh/${requestedFolder || 'media'}`;
    const asset = await uploadToCloudinary(req.file, folder);

    const result = await query(
      `
        insert into media_assets (public_id, url, secure_url, resource_type, folder, original_filename, bytes, width, height)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *
      `,
      [
        asset.public_id,
        asset.url,
        asset.secure_url,
        asset.resource_type,
        folder,
        req.file.originalname,
        asset.bytes || null,
        asset.width || null,
        asset.height || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Failed to upload media.');
  }
});

const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Eckintosh API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
