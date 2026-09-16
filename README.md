# Eckintosh Technologies — Main Website

Marketing site and admin console for Eckintosh Technologies, built with React 19,
TypeScript, Vite and Tailwind CSS v4, backed by an Express + PostgreSQL API.

## Running it

```bash
npm install
npm run dev      # API on :3000 and the site on :5173
npm run build    # production bundle into dist/
```

Copy `.env.example` to `.env` and fill in the database, JWT and Cloudinary values
before running the API.

## How the site is put together

```
src/
  App.tsx              page composition and shared modal/palette state
  components/          marketing sections and modals
  systems/             the interactive product interfaces
    theme.ts           accent palette, one entry per system
    kit.tsx            shared app-shell and chart primitives
    screens/           one file per system: its real screens
    registry.ts        productId -> system definition
    SystemViewer.tsx   the scrubbable walkthrough player
  data/contentData.ts  all editable copy plus the nine system records
  data/contentMerge.ts merges saved content over the shipped defaults
  admin/               the admin console (hash route `#/admin`)
server/                Express API, migrations and the content store
```

### The system walkthroughs

Each of the nine systems renders its interface as **live DOM**, not screenshots
or video files. A `SystemViewer` plays the screens in sequence inside browser
chrome with a scene timeline, scripted cursor and captions, so it reads as a
product film while staying crisp at any size, weighing nothing extra in the
bundle, and remaining fully editable in code. The player pauses when scrolled
out of view and respects `prefers-reduced-motion`.

To add a system:

1. Add a `Product` record to `PRODUCTS` in `src/data/contentData.ts`, giving it
   an `accent` from `src/systems/theme.ts` and an `iconName` present in
   `src/lib/icons.ts`.
2. Create `src/systems/screens/<name>.tsx` exporting a `SystemDefinition` with
   two to four scenes, built from the primitives in `src/systems/kit.tsx`.
3. Register it in `src/systems/registry.ts`.

The showcase, index grid, navbar menu, command palette and spec modal all pick
it up automatically.

### Editable content

Everything users read comes from `SiteContent`. The API stores one JSON document
and `mergeSiteContent` deep-merges it over the shipped defaults, so newly
released fields and sections appear even for sites with an older saved record.
Arrays follow `CONTENT_VERSION`: bump it in `contentData.ts` when shipping new
list items (systems, sections, nav links) that should override a stale save.

Edit content at `#/admin` → **Website Content**, one section at a time.

### Interaction notes

- `⌘K` / `Ctrl+K` opens the command palette (jump to any system, section or action).
- Sections fade in on scroll via the `Reveal` component and `useInView`.
- Statistics count up when they enter the viewport (`useCountUp`).
