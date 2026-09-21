/**
 * Vercel serverless entry point.
 *
 * The Express app is defined in server/index.ts, which skips listen() and the
 * SPA fallback when VERCEL is set. vercel.json rewrites every /api/* request
 * here, so Express routes them exactly as it does locally.
 *
 * Schema setup is deliberately NOT run here: migrations on every cold start
 * would add latency to each request. Run `npm run migrate` once per database.
 */
export { default } from '../server/index';
