# Portfolio | Oluwatomisin Isogun

Personal portfolio for Oluwatomisin Isogun, a frontend developer and the founder of Isogun Labs.
Live at [portfolio.isogunlabs.com](https://portfolio.isogunlabs.com).

## What the site is

One home page with four tabs, plus a case-study page per project:

| Tab | What it shows |
| --- | --- |
| Case studies | Every project, newest design first. Each card links to its case-study page. |
| Work history | Roles at Isogun Labs and AFT Solutions, including the Atlassian Marketplace apps shipped. |
| Work samples | A shuffled stream of every project screenshot. |
| Certifications | Certificates, ordered by relevance. |

Routes (file-based, TanStack Router):

- `/` is the home page (`src/components/sections/ReferencePortfolioHome.tsx`).
- `/projects/$slug` is a case study (`src/routes/projects/$slug.tsx`).
- `/projects` redirects to `/`. The old Project Archive page was merged into the Case studies tab.

## Stack

React 19, TypeScript, TanStack Start / Router / Query, Tailwind CSS v4, Framer Motion, Vite.
Prerendered at build time and deployed to Cloudflare via Nitro.

## Develop

```bash
npm install
npm run dev          # local dev server
npm run build        # production build + prerender
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # vitest (data integrity checks)
```

## Content lives in one file

Almost everything you would edit is in `src/data/portfolio.ts`:

- `featuredProjects` sets the **order** of the Case studies tab and the next/previous links.
- `projectCaseStudies` holds the case-study copy, metrics and screenshot galleries.
- `workHistory` feeds the Work history tab.
- `certifications` is built from the files in `src/assets/certifications/`.

`npm test` fails if a project is missing a case study, a gallery or a live link.

## Adding or updating screenshots

1. Drop the PNG screenshots into `src/assets/product_showcase/<project>/`.
2. Run `npm run optimize:images`. It writes web-sized WebP files next to them and moves the
   originals to `assets-originals/` (git-ignored, kept locally).
3. Galleries pick up every `.webp` in the folder automatically. Covers are chosen by file name in
   `src/data/portfolio.ts` so adding files never shuffles them.

## Adding a project

1. Add a screenshot folder under `src/assets/product_showcase/` and glob it in `portfolio.ts`.
2. Add an entry to `featuredProjects` (position = order on the site) and `projectCaseStudies`.
3. Add its `/projects/<slug>` path to `tanstackStart.pages` in `vite.config.ts` and to
   `public/sitemap.xml` so it is prerendered and indexed.

## Notes

- `public/sw.js` is a small offline service worker. Bump `CACHE_NAME` when you remove or rename
  cached routes.
- Line endings: Prettier is set to `endOfLine: "auto"` so Windows checkouts lint cleanly.
