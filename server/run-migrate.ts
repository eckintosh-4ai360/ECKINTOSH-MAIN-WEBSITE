/**
 * One-off schema setup: creates tables and seeds defaults against DATABASE_URL.
 * Safe to re-run — every statement is `if not exists` / `on conflict do nothing`.
 *
 * Local dev migrates automatically on boot; serverless deployments do not, so
 * run this once against the production database before the first deploy.
 */
import { initializeDatabase } from './migrate';
import { pool } from './db';

initializeDatabase()
  .then(() => {
    console.log('Database ready.');
    return pool.end();
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
