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

app.get('/api/admin/session', requireAdmin, (_req, res) => {
  res.json({ user: res.locals.admin });
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
