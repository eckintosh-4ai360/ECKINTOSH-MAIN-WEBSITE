import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Missing DATABASE_URL. Add your Neon pooled connection string to .env.');
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  enableChannelBinding: true,
} as pg.PoolConfig & { enableChannelBinding: boolean });

export async function query<T = unknown>(text: string, params: unknown[] = []): Promise<pg.QueryResult<T>> {
  return pool.query(text, params);
}
