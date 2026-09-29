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
  components/ui.tsx    shared Photo, BrowserFrame, pill buttons and section headings
  data/contentData.ts  all editable copy plus the eight system records
  data/contentMerge.ts merges saved content over the shipped defaults
  data/siteMedia.ts    which photo or screenshot each system and service shows
  admin/               the admin console (hash route `#/admin`)
server/                Express API, migrations and the content store
```

### The system walkthroughs

Each of the eight systems plays as a short product film: a `SystemViewer` walks
its screens in sequence inside browser chrome, with a scene timeline, a scripted
cursor and voice-over style captions. The player pauses when scrolled out of
view and respects `prefers-reduced-motion`.

A scene is one of two things:

- **Live DOM** (`render`) — the screen rebuilt from the primitives in
  `src/systems/kit.tsx`. Stays crisp at any size and is editable in code.
- **A real screenshot** (`image`) — a capture of the shipped product. Vite copies
  `public/` through untouched, so a screenshot is served as its own file and
  costs the single-file HTML bundle nothing.

To add a system:

1. Add a `Product` record to `PRODUCTS` in `src/data/contentData.ts`, giving it
   an `accent` from `src/systems/theme.ts` and an `iconName` present in
   `src/lib/icons.ts`.
2. Create `src/systems/screens/<name>.tsx` exporting a `SystemDefinition` with
   two to four scenes, built from the primitives in `src/systems/kit.tsx`.
3. Register it in `src/systems/registry.ts`.

The showcase, index grid, navbar menu, command palette and spec modal all pick
it up automatically.

#### Using real screenshots for a scene

Drop the captures in `public/systems/<system>/`, then give the scene an `image`
instead of a `render`:

```tsx
{
  id: 'dashboard',
  label: 'Dashboard',
  caption: 'Every branch, every till, one number.',
  duration: 6,
  image: {
    src: '/systems/pos/dashboard.webp',
    alt: 'MultiPOS dashboard',
    // Where the cursor rests, in order, as percentages of the screenshot.
    hotspots: [[22, 30], [55, 28], [78, 55], [30, 70]],
  },
},
```

Capture at desktop width, then normalise to **1600 x 940** (the frame's own
16:9.4 ratio) and save as WebP — at that ratio the player can use plain `cover`
and lose nothing off the sides, where sidebars and side panels live. A capture
that comes out shorter is best padded by continuing its bottom row rather than
letterboxed; one that comes out taller is cropped at the bottom, which reads
as a page that scrolls.

Wide screens show the whole capture; on phones the frame magnifies and pans so
that each hotspot lands under the cursor, which is what keeps desktop-width text
legible there. Hotspots therefore do double duty — pick points that are both
worth pointing at and worth zooming into. If a file is missing, the frame says
so in place rather than breaking the reel.

### Photography

The public page pairs each system and service with a photo or a real product
screenshot, mapped in `src/data/siteMedia.ts`. Photos sit in `public/images/`
as `<name>-800.webp` and `<name>-1600.webp`; the `Photo` component serves the
right one through `srcset`. A system with no entry falls back to its icon.

To swap a photo, export both widths as WebP under the same name, or add a new
entry to `PHOTOS` and point the system or service at it. They are stock images,
so replace them with photos of real clients and the team as those become
available.

| File | Photographer | Source |
| --- | --- | --- |
| engineers | X (@disruptxn) | https://unsplash.com/photos/kwzWjTnDPLk |
| phone-user | Francisco Venâncio | https://unsplash.com/photos/G_ov3T7WCZg |
| shopper | Vitaly Gariev | https://unsplash.com/photos/pzrDjRo-qGs |
| accra | Barnabas Lartey-Odoi Tetteh | https://unsplash.com/photos/5YdLNHzwux4 |
| business | The Jopwell Collection | https://unsplash.com/photos/LJL7wx7PM3Y |
| mobile-app | Tran Mau Tri Tam | https://unsplash.com/photos/QwAL909kTiY |
| web-design | Tran Mau Tri Tam | https://unsplash.com/photos/h7v_38e3iGE |
| coding | Arif Riyanto | https://unsplash.com/photos/G1N9kDHqBrQ |
| pharmacy | Ninthgrid | https://unsplash.com/photos/uNawp6qgpcE |
| classroom | Emmanuel Ikwuegbu | https://unsplash.com/photos/VC6MGt9ZoBA |
| shop-owner | Ali Mkumbwa | https://unsplash.com/photos/EOkN2pRjFsg |
| learner | Vitaly Gariev | https://unsplash.com/photos/4JFBqeP3VRQ |

All are free for commercial use under the [Unsplash License](https://unsplash.com/license);
attribution isn't required but is kept here.

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
