/**
 * Creates or resets an admin login against whatever DATABASE_URL is configured.
 *
 * initializeDatabase() only seeds an admin when none exists, so changing
 * ADMIN_PASSWORD never updates an account that is already there. This script
 * upserts instead, which is what you need to recover a deployed environment or
 * rotate a password that has been exposed.
 *
 *   npm run admin:set-password -- <email> <password>
 *
 * With no arguments it falls back to ADMIN_EMAIL / ADMIN_PASSWORD. It reports
 * the database host it connected to, so a mismatch between local and
 * production credentials is visible rather than guessed at.
 */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool, query } from './db';

function describeTarget(): string {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
  try {
    const parsed = new URL(url);
    // Host and database only — never the password in the connection string.
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return '(unparseable DATABASE_URL)';
  }
}

async function main() {
  const [emailArg, passwordArg] = process.argv.slice(2);
  const email = (emailArg || process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = passwordArg || process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || '';

  if (!email || !password) {
    throw new Error(
      'Usage: npm run admin:set-password -- <email> <password>\n' +
        '(or set ADMIN_EMAIL and ADMIN_PASSWORD in the environment)'
    );
  }

  console.log(`Database : ${describeTarget()}`);
  console.log(`Admin    : ${email}`);

  const passwordHash = await bcrypt.hash(password, 12);
  const result = await query<{ id: string; created: boolean }>(
    `
      insert into admin_users (email, password_hash)
      values ($1, $2)
      on conflict (email)
      do update set password_hash = excluded.password_hash, updated_at = now()
      returning id, (xmax = 0) as created
    `,
    [email, passwordHash]
  );

  const { created } = result.rows[0];
  console.log(created ? 'Created the admin user.' : 'Updated the existing password.');

  const total = await query<{ count: string }>('select count(*)::text as count from admin_users');
  console.log(`admin_users rows in this database: ${total.rows[0].count}`);
}

main()
  .then(() => pool.end())
  .catch(async (error) => {
    console.error(error instanceof Error ? error.message : error);
    await pool.end().catch(() => {});
    process.exit(1);
  });
