/**
 * Vercel serverless entry point.
 *
 * Plain JS on purpose: Vercel detects this file as the function from source,
 * while _server.js (underscore-prefixed, so never its own route) is generated
 * during the build by scripts/build-api.mjs.
 *
 * vercel.json rewrites every /api/* request here, and server/index.ts skips
 * listen() and the SPA fallback when VERCEL is set.
 */
export { default } from './_server.js';
