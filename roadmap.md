# Portfolio Build Roadmap

## Step 1 - Design system + assets (DONE)
- [x] Cream/charcoal/orange/navy tokens + production-safe font stacks in src/styles.css
- [x] Removed external Google Fonts links from __root head
- [x] Generate 3D clay workspace assets (wall decor, desk+monitors+chair, plant/speaker, rug)
- [x] Generate character sitting pose
- [x] Generate transparent sitting character cutout for the hero scene

## Step 2 - Static hero layout (DONE)
- [x] src/components/hero/: Hero, HeroNavigation, HeroText, HeroScrollScene, BackgroundLayer, WorkspaceLayer, CharacterLayer, ForegroundLayer
- [x] Exact composition match to reference; static, no scroll animation
- [x] Responsive desktop/tablet/mobile structure

## Step 3 - Sticky scroll scene + parallax (DONE)
- [x] 450vh container, 100dvh sticky viewport, useScroll + useSpring progress 0..1
- [x] Chair, character, and hero text remain scroll-driven; background/workspace/foreground locked
- [x] prefers-reduced-motion static fallback

## Step 4 - Cinematic character sequence (DONE)
- [x] Chair separated from desk asset; standing + 3 walk poses generated
- [x] Shared CharacterStage, crossfaded poses, scroll-scrubbed walk-out and exit
- [x] Timeline config in src/components/hero/animationTimeline.ts
- [x] Mobile and tablet hero responsiveness pass

## Step 5 - Remaining sections
- [x] About, Projects, Contact sections + footer
- [x] Smooth transition from hero into About

## Step 6 - Polish
- [x] SEO head metadata, local font hosting, structured data, sitemap, robots
- [x] Premium pass: project case-study pages, recruiter CTA, richer More Work
- [ ] A11y pass, performance check, final cross-device visual QA
