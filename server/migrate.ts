import bcrypt from 'bcryptjs';
import { DEFAULT_SITE_CONTENT, CASE_STUDIES, type CaseStudy, type SiteContent } from '../src/data/contentData';
import { query } from './db';

export interface CaseStudyRow {
  id: string;
  title: string;
  client: string;
  industry: string;
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  technologies: string[];
  impact: { metric: string; detail: string }[];
  hero_image: string;
  ui_highlights: { title: string; desc: string }[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function caseStudyFromRow(row: CaseStudyRow): CaseStudy {
  return {
    id: row.id,
    title: row.title,
    client: row.client,
    industry: row.industry,
    tags: row.tags || [],
    summary: row.summary,
    challenge: row.challenge,
    solution: row.solution,
    architecture: row.architecture || [],
    technologies: row.technologies || [],
    impact: row.impact || [],
    heroImage: row.hero_image,
    uiHighlights: row.ui_highlights || [],
  };
}

export function normalizeCaseStudy(input: Partial<CaseStudy>): CaseStudy {
  return {
    id: input.id || crypto.randomUUID(),
    title: String(input.title || '').trim(),
    client: String(input.client || '').trim(),
    industry: String(input.industry || '').trim(),
    tags: Array.isArray(input.tags) ? input.tags.map(String).filter(Boolean) : [],
    summary: String(input.summary || '').trim(),
    challenge: String(input.challenge || '').trim(),
    solution: String(input.solution || '').trim(),
    architecture: Array.isArray(input.architecture) ? input.architecture.map(String).filter(Boolean) : [],
    technologies: Array.isArray(input.technologies) ? input.technologies.map(String).filter(Boolean) : [],
    impact: Array.isArray(input.impact)
      ? input.impact
          .map((item) => ({
            metric: String(item?.metric || '').trim(),
            detail: String(item?.detail || '').trim(),
          }))
          .filter((item) => item.metric || item.detail)
      : [],
    heroImage: String(input.heroImage || '').trim(),
    uiHighlights: Array.isArray(input.uiHighlights)
      ? input.uiHighlights
          .map((item) => ({
            title: String(item?.title || '').trim(),
            desc: String(item?.desc || '').trim(),
          }))
          .filter((item) => item.title || item.desc)
      : [],
  };
}

export async function initializeDatabase(): Promise<void> {
  await query('create extension if not exists pgcrypto');

  await query(`
    create table if not exists admin_users (
      id uuid primary key default gen_random_uuid(),
      email text not null unique,
      password_hash text not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await query(`
    create table if not exists site_content (
      key text primary key,
      value jsonb not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await query(`
    create table if not exists case_studies (
      id text primary key,
      title text not null,
      client text not null,
      industry text not null default '',
      tags jsonb not null default '[]'::jsonb,
      summary text not null,
      challenge text not null default '',
      solution text not null default '',
      architecture jsonb not null default '[]'::jsonb,
      technologies jsonb not null default '[]'::jsonb,
      impact jsonb not null default '[]'::jsonb,
      hero_image text not null default '',
      ui_highlights jsonb not null default '[]'::jsonb,
      sort_order integer not null default 0,
      is_published boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await query(`
    create table if not exists inquiries (
      id uuid primary key default gen_random_uuid(),
      project_type text not null,
      timeline text not null,
      budget text not null,
      full_name text not null,
      organization text not null default '',
      phone text not null,
      email text not null,
      notes text not null default '',
      status text not null default 'new' check (status in ('new', 'read', 'archived')),
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await query(`
    create table if not exists media_assets (
      id uuid primary key default gen_random_uuid(),
      public_id text not null,
      url text not null,
      secure_url text not null,
      resource_type text not null,
      folder text not null default '',
      original_filename text not null default '',
      bytes integer,
      width integer,
      height integer,
      created_at timestamptz not null default now()
    )
  `);

  await query(
    `
      insert into site_content (key, value)
      values ('default', $1::jsonb)
      on conflict (key) do nothing
    `,
    [JSON.stringify(DEFAULT_SITE_CONTENT satisfies SiteContent)]
  );

  for (const [index, caseStudy] of CASE_STUDIES.entries()) {
    const normalized = normalizeCaseStudy(caseStudy);
    await query(
      `
        insert into case_studies (
          id, title, client, industry, tags, summary, challenge, solution,
          architecture, technologies, impact, hero_image, ui_highlights, sort_order
        )
        values ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13::jsonb, $14)
        on conflict (id) do nothing
      `,
      [
        normalized.id,
        normalized.title,
        normalized.client,
        normalized.industry,
        JSON.stringify(normalized.tags),
        normalized.summary,
        normalized.challenge,
        normalized.solution,
        JSON.stringify(normalized.architecture),
        JSON.stringify(normalized.technologies),
        JSON.stringify(normalized.impact),
        normalized.heroImage,
        JSON.stringify(normalized.uiHighlights),
        index,
      ]
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@eckintosh.local';
  const adminPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD;

  if (adminPassword) {
    const existing = await query<{ id: string }>('select id from admin_users where email = $1 limit 1', [adminEmail]);
    if (existing.rowCount === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await query('insert into admin_users (email, password_hash) values ($1, $2)', [adminEmail, passwordHash]);
    }
  }
}
