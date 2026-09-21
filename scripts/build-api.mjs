/**
 * Bundles the Express app into a single ESM file for the Vercel function.
 *
 * This codebase uses bundler-style imports with no file extensions (see
 * moduleResolution in tsconfig.json). Node's ESM loader requires explicit
 * extensions, so Vercel compiling each .ts file on its own produced
 * ERR_MODULE_NOT_FOUND at runtime. Bundling resolves every relative import
 * ahead of time, which is what the frontend build already does.
 *
 * node_modules stay external: they are installed on the function and some
 * (pg, bcryptjs) do not survive bundling cleanly.
 */
import { build } from 'esbuild';

await build({
  entryPoints: ['server/index.ts'],
  outfile: 'api/_server.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  packages: 'external',
  logLevel: 'info',
});
