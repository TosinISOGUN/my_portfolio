# Scroll Studio

Build a single-page creative developer portfolio website.

IMPORTANT:

The attached screenshot is the primary visual reference for the hero section.

Recreate its visual composition, proportions, spacing, typography hierarchy,

color palette, and overall 3D workspace aesthetic as closely as possible,

but use placeholder text and original placeholder assets.

Do not create a generic portfolio template.

YOU DO NOT HAVE TO FINISH THE WEBSITE IN ONE GO BECAUSE THE CREDITS JUST WON'T BE ENOUGH, SO CREATE A ROADMAD.md FILE AND BREAK DOWN THE TASKS IN BITS, AND TAKE IT ONE AFTER THE OTHER, DON'T SKIP ANY STEP, MAKE SURE YOU BUILD ONE STEP COMPLETELY THEN MARK IT DONE AND MOVE TP THE NEXT ONE. I CAN ALSO USE THE TRIGGERING COMMAND "CONTINUE" FOR YOU TO CONTINUE FROM WHERE YOU STOPPED ANYTIME CREDITS RENEWS.

====================================================

TECH STACK

====================================================

Build using:

- React

- TypeScript

- Tailwind CSS

- Framer Motion

Keep the code modular and production quality.

====================================================

HERO SECTION

====================================================

Create a full-screen hero section with a scroll-driven

3D-style workspace scene.

Initial viewport composition:

LEFT SIDE:

- Large bold name:

  "Alex Morgan"

- Two-line typography

- Large heavy sans-serif font

- Dark charcoal color

- A dark navy rectangular developer label underneath:

  "FULLSTACK WEB AND IOS DEVELOPER"

TOP CENTER:

- Floating rounded pill navigation

- Links:

  ABOUT

  PROJECTS

  CONTACT

TOP RIGHT:

- Bright orange rounded CTA button

- Text:

  GET IN TOUCH

RIGHT SIDE:

Create a stylized 3D/isometric developer workspace scene.

The scene contains:

- A developer sitting in an office chair

- White desk

- Large monitor with colorful code

- Secondary monitor

- Keyboard

- Desk accessories

- Bookshelf

- Wall corkboard with pinned notes

- Decorative wall frame

- Small penguin figurine

- Speaker

- Large potted plant

- Yellow/orange geometric rug

The aesthetic should be:

- Soft 3D illustration

- Rounded objects

- Clay-like / stylized rendering

- Warm soft shadows

- Cream background

- Minimal and playful

- Premium portfolio design

====================================================

CRITICAL: SCROLL-DRIVEN PARALLAX ANIMATION

====================================================

This is the most important feature.

The hero should NOT simply fade away on scroll.

Create a scroll-driven animation sequence where the hero

scene transforms as the user scrolls.

The hero section should be approximately 250vh to 350vh tall.

Use a sticky/pinned viewport:

- Outer scroll container: approximately 300vh

- Inner hero scene: position: sticky

- Sticky scene remains fixed at 100vh height

As the user scrolls through the hero, map scroll progress from 0 to 1.

The animation should have these stages:

----------------------------------

STAGE 1 — PROGRESS 0.0 to 0.25

----------------------------------

Initial state:

- Character is sitting in the chair

- Character is facing the monitors

- Workspace is fully visible

- Large name remains on the left

- Navigation remains at the top

- Scene feels calm and static

Add subtle depth movement:

- Background moves slowly

- Desk moves at medium speed

- Foreground objects move slightly faster

----------------------------------

STAGE 2 — PROGRESS 0.25 to 0.50

----------------------------------

Transition:

The character begins standing up.

Animate:

- Character body rising upward

- Chair subtly moving backward

- Character rotating slightly

- Legs transitioning from sitting to standing

- Arms adjusting naturally

The animation should feel like a continuous sequence,

not a sudden visibility swap.

If a fully rigged character is too complex, use multiple

character pose states and crossfade/interpolate between them

while maintaining the illusion of continuous movement.

----------------------------------

STAGE 3 — PROGRESS 0.50 to 0.80

----------------------------------

Character walks away from the desk.

Animate:

- Character moving toward the right side of the viewport

- Alternating walk cycle

- Slight vertical body bounce

- Natural arm movement

The desk remains behind.

The chair should remain near the desk.

The workspace should remain visible while the character

moves away.

----------------------------------

STAGE 4 — PROGRESS 0.80 to 1.0

----------------------------------

Final transition:

- Character exits toward the right

- Workspace shifts slightly with parallax

- Hero text can begin transitioning out

- Prepare the page to transition smoothly into the About section

====================================================

PARALLAX DEPTH SYSTEM

====================================================

Do NOT move the entire hero scene as one image.

Separate the scene into independent depth layers.

Use different scroll transform speeds.

LAYER 1 — BACKGROUND

- Cream background

- Wall decorations

- Corkboard

- Shelf

Slowest movement.

LAYER 2 — MIDGROUND

- Desk

- Monitors

- Chair

Medium movement.

LAYER 3 — CHARACTER

- Developer

Independent movement and animation.

LAYER 4 — FOREGROUND

- Plant

- Speaker

- Rug foreground

Fastest/subtle movement.

Example depth feeling:

background:

translateY(scrollProgress * -20px)

midground:

translateY(scrollProgress * -50px)

foreground:

translateY(scrollProgress * -90px)

Do not use these exact numbers if the visual result needs

adjustment. Prioritize natural depth.

====================================================

ANIMATION IMPLEMENTATION

====================================================

Use Framer Motion.

Prefer:

useScroll()

useTransform()

useSpring()

Create scroll progress from the hero scroll container.

Example architecture:

<HeroScrollScene>

  <StickyViewport>

    <HeroText />

    <BackgroundLayer />

    <WorkspaceLayer />

    <CharacterLayer />

    <ForegroundLayer />

  </StickyViewport>

</HeroScrollScene>

The character animation must be driven by scroll progress,

not by a looping timer.

Scrolling down advances the animation.

Scrolling up reverses the animation smoothly.

This is essential.

====================================================

PERFORMANCE

====================================================

Do not create an expensive WebGL experience unless necessary.

Prioritize:

- CSS transforms

- opacity

- translate

- scale

- Framer Motion motion values

Avoid:

- Animating layout properties continuously

- Heavy canvas rendering

- Excessive JavaScript calculations on every frame

The animation must remain smooth.

====================================================

RESPONSIVE BEHAVIOR

====================================================

Desktop:

- Full cinematic parallax experience

Tablet:

- Simplify the scene slightly

- Maintain the scroll transformation

Mobile:

- Preserve the core visual concept

- Reduce the complexity of the workspace

- Stack or reposition hero text where necessary

- The character standing/walking sequence should still work,

  but can use fewer animation details

====================================================

ACCESSIBILITY

====================================================

Respect prefers-reduced-motion.

When reduced motion is enabled:

- Disable complex scroll-driven movement

- Show a simplified static hero scene

- Keep all content accessible

====================================================

CODE ORGANIZATION

====================================================

Create reusable components:

src/components/hero/

  Hero.tsx

  HeroNavigation.tsx

  HeroText.tsx

  HeroScrollScene.tsx

  BackgroundLayer.tsx

  WorkspaceLayer.tsx

  CharacterLayer.tsx

  ForegroundLayer.tsx

Separate animation logic from content where practical.

====================================================

IMPORTANT DESIGN RULE

====================================================

Do not replace the custom 3D workspace with generic cards,

stock photography, gradients, SaaS illustrations, or

standard portfolio layouts.

The hero must feel like a carefully designed illustrated

workspace scene with a cinematic scroll-driven transition.

The primary experience is:

USER ARRIVES

↓

Sees developer sitting at desk

↓

Scrolls

↓

Developer stands up

↓

Developer walks away

↓

Page transitions naturally to the next section

The best approach is to use layered assets.

I recommend telling Lovable to structure the animation like this:

HeroScene

│

├── Background

│   ├── Wall

│   ├── Shelf

│   └── Corkboard

│

├── Workspace

│   ├── Desk

│   ├── Monitors

│   ├── Chair

│   └── Accessories

│

├── Character

│   ├── Sitting pose

│   ├── Standing transition pose

│   ├── Walking pose 1

│   ├── Walking pose 2

│   └── Walking pose 3

│

└── Foreground

    ├── Rug

    └── Plant

The BEST way to build the character transition

I would actually have Lovable build it in three passes.

Prompt 1 — Build the static site

First:

Build the entire portfolio and reproduce the hero layout exactly, but keep the character and workspace static. Do not add the complex scroll animation yet.

This ensures the visual design is correct first.

Prompt 2 — Add the sticky scroll scene

Then:

Now convert the hero into a scroll-controlled sticky scene.

Create a 300vh scroll container with a 100vh sticky viewport.

Do not change the visual design.

The scroll position should control a Framer Motion scrollProgress

value from 0 to 1.

Add independent parallax movement to:

1. Background wall elements

2. Desk and monitors

3. Foreground plant and rug

4. Character

Scrolling upward must reverse every animation smoothly.

Prompt 3 — Add the cinematic character sequence

Finally:

Now implement the character sequence.

The animation timeline must be directly tied to scroll progress.

0%–25%:

Character sitting.

25%–50%:

Character stands up.

50%–85%:

Character walks toward and exits the right side.

85%–100%:

Scene settles and transitions into the next page section.

Do not use a looping animation.

Do not trigger the animation once.

The user's scroll position must act like a timeline scrubber:

scroll down = animation moves forward

scroll up = animation reverses.

Use multiple character pose layers if necessary to create

the stand-up and walk sequence.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fe363d05-d22a-4e30-8fb3-8baeeb342d66).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
