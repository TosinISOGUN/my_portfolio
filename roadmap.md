# Portfolio Roadmap

The original scroll-driven hero build (Steps 1-4 of the first roadmap) was replaced by the
current tabbed home page. This file now tracks what is left.

## Done

- [x] Tabbed home page: Case studies, Work history, Work samples, Certifications
- [x] Per-project case-study pages with next/previous navigation
- [x] Archive page merged into Case studies; `/projects` redirects to `/`
- [x] Screenshots converted to WebP (64.7 MB to 4.5 MB)
- [x] Alt text, tab semantics, focus rings, reduced-motion handling
- [x] Data integrity tests (`npm test`)

- [x] Unreachable code and 41 unused dependencies removed
- [x] Cloudflare Web Analytics wired in (production builds; token default in `__root.tsx`)
- [x] Open School Field metrics confirmed accurate

## Open

- [ ] Deploy, then confirm the first visits appear in Cloudflare Web Analytics
- [ ] Cross-device visual QA
