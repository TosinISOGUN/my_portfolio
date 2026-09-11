import aftLogo from "@/assets/portfolio/aft-website-logo.png";
import cHomesLogo from "@/assets/portfolio/c-homes.svg";
import infinitativeLogo from "@/assets/portfolio/infinitative.svg";
import learncityLogo from "@/assets/portfolio/LC_logo.png";
import nachieLogo from "@/assets/portfolio/nachie_maridadi_favicon.png";
import oyoLogo from "@/assets/portfolio/oyo-state-logo-card.png";
import recapLogo from "@/assets/portfolio/recap-logo.svg";
import shemtLogo from "@/assets/portfolio/shemt-logo.png";

type ScreenshotModule = Record<string, string>;

const getScreens = (modules: ScreenshotModule) =>
  Object.entries(modules)
    .sort(([first], [second]) =>
      first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map(([, image]) => image);

const openSchoolFieldScreens = getScreens(
  import.meta.glob("../assets/product_showcase/open school field/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const oyoBookingScreens = getScreens(
  import.meta.glob("../assets/product_showcase/oyobooking/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const cHomesScreens = getScreens(
  import.meta.glob("../assets/product_showcase/c-homes/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const infinitativeScreens = getScreens(
  import.meta.glob("../assets/product_showcase/infinitative/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const learncityScreens = getScreens(
  import.meta.glob("../assets/product_showcase/learncity/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const nachieScreens = getScreens(
  import.meta.glob("../assets/product_showcase/nachie maridadi/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const recapScreens = getScreens(
  import.meta.glob("../assets/product_showcase/recap/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const [osf261, osf263, osf266, osf268, osf270] = [
  openSchoolFieldScreens[0],
  openSchoolFieldScreens[2],
  openSchoolFieldScreens[5],
  openSchoolFieldScreens[7],
  openSchoolFieldScreens[9],
];
const [oyo258, oyo260] = [oyoBookingScreens[0], oyoBookingScreens[2]];
const [cHomes274, cHomes276] = [cHomesScreens[0], cHomesScreens[2]];
const [infinitativeLanding, infinitativeProducts, , , infinitativeCart] = [
  infinitativeScreens[0],
  infinitativeScreens[1],
  infinitativeScreens[2],
  infinitativeScreens[4],
];
const [learncity278, learncity281] = [learncityScreens[0], learncityScreens[3]];
const [nachie271] = nachieScreens;

export const profile = {
  name: "Oluwatomisin Isogun",
  role: "Frontend Developer",
  email: "oluwatomisinisogun@gmail.com",
  github: "https://github.com/TosinISOGUN",
  linkedin: "https://www.linkedin.com/in/oluwatomisin-isogun-a38740356/",
};

export const focusAreas = [
  {
    title: "Full-Loop Product Ownership",
    copy: "Code, SEO, security questionnaires, Marketplace listings, and go-to-market. I ship products, not just components.",
  },
  {
    title: "Enterprise-Scale Frontend",
    copy: "Government and enterprise interfaces at AFT Solutions, built to stay reliable under real organizational load.",
  },
  {
    title: "Data-Dense Interfaces",
    copy: "Analytics dashboards, booking systems, and CMS-driven marketplaces where the hard part is the data, not the styling.",
  },
  {
    title: "Performance-First Engineering",
    copy: "Lighthouse 90+ scores, sub-200ms filter queries, and code splitting that keeps large React apps fast.",
  },
];

export const aboutParagraphs = [
  "My work spans booking platforms, admin consoles, marketplaces, dashboards, and conversion-focused landing pages, with a focus on interfaces that stay clear when the data gets dense.",
  "In my current frontend role, I build enterprise and government software that has to stay reliable under real organizational weight. I am also open to frontend roles, contract builds, and product teams that need polished React and TypeScript execution.",
];

export const experience = [
  {
    role: "Frontend Web Developer",
    company: "AFT Solutions Limited",
    period: "July 2025 - Present",
    points: [
      "Building enterprise and government web applications in React and TypeScript.",
      "Led frontend optimization that cut critical path load time by 30% on data-heavy dashboards.",
      "Built reusable component systems across internal projects and strengthened CI practices.",
    ],
  },
  {
    role: "Founder & Product Engineer",
    company: "Isogun Labs",
    period: "2026 - Present",
    points: [
      "Founded an independent software studio building focused apps for Atlassian and Jira.",
      "Designed, built, and shipped Recap, Field Hygiene, and Passdown to the Atlassian Marketplace.",
      "Owned SEO, technical marketing, and go-to-market execution across product websites and Marketplace listings.",
    ],
  },
];

export const skills = [
  "React 18+",
  "TypeScript",
  "TanStack Query",
  "Tailwind CSS",
  "Shadcn UI",
  "Framer Motion",
  "Radix UI",
  "Vite",
  "Vitest",
  "Playwright",
  "REST APIs",
  "CI/CD",
];

export const featuredProjects = [
  {
    title: "Open School Field",
    slug: "open-school-field",
    studio: "Oyo State school facility marketplace",
    logo: oyoLogo,
    tags: ["React 19", "TanStack Router", "TanStack Query", "PWA", "Yoruba i18n"],
    signals: ["Multi-role portals", "English/Yoruba switching", "Mock/live API layer"],
    link: "https://open-school-field-five.vercel.app",
    problem:
      "Schools, renters, agents, and admins need one clear interface for discovering, booking, managing, and reporting on school sports facilities.",
    result:
      "A frontend-only marketplace with renter, school, agent, and admin portals, mock/live API switching, offline support, realtime hooks, and English to Yoruba language switching.",
  },
  {
    title: "OYOBOOKING",
    slug: "oyobooking",
    studio: "Oyo State booking platform",
    logo: oyoLogo,
    tags: ["React", "API Integration", "Accessibility"],
    signals: ["Public booking UX", "API-backed flows", "Responsive facility pages"],
    link: "https://oyobooking.ng",
    github: "https://github.com/TosinISOGUN/oyo_booking.com",
    problem:
      "Public-facing booking flows need to handle real users, changing data, and high clarity without collapsing into form clutter.",
    result:
      "A fast, responsive booking experience with API-backed flows, accessible interface patterns, and production-oriented UX.",
  },
  {
    title: "Infinitative",
    slug: "infinitative",
    studio: "Multi-vendor commerce marketplace",
    logo: infinitativeLogo,
    tags: ["React", "Marketplace UX", "Cart Flow"],
    signals: ["Premium commerce landing", "Vendor discovery", "Checkout-ready cart"],
    link: "https://infinitative-aft.vercel.app/",
    problem:
      "Multi-vendor commerce experiences need to present premium products, vendor trust, and shopping actions without making the storefront feel crowded.",
    result:
      "A polished marketplace interface with product discovery, vendor surfaces, cart management, checkout summary, and responsive commerce flows.",
  },
  {
    title: "C-HOMES",
    slug: "c-homes",
    studio: "CMS-driven property marketplace",
    logo: cHomesLogo,
    tags: ["React", "Sanity CMS", "Content Management"],
    signals: ["CMS content model", "Property listing UX", "Search-friendly frontend"],
    link: "https://c-homes.vercel.app/",
    github: "https://github.com/TosinISOGUN/c-homes",
    problem:
      "Property platforms need structured content, search-friendly pages, and a management workflow that can keep listings current.",
    result:
      "A CMS-powered marketplace experience with editable property content, responsive presentation, and a maintainable frontend.",
  },
  {
    title: "Learncity",
    slug: "learncity",
    studio: "Academy platform",
    logo: learncityLogo,
    tags: ["React", "Responsive UI", "Landing Systems"],
    signals: ["Education UX", "Program discovery", "Conversion-focused layout"],
    link: "https://learncityacademy.com/",
    github: "https://github.com/TosinISOGUN/learncity",
    problem:
      "Prospective learners need to understand program value quickly without getting lost in dense academy content.",
    result:
      "A polished education experience with clear hierarchy, responsive sections, and practical navigation across learning pages.",
  },
  {
    title: "Nachie Maridadi",
    slug: "nachie-maridadi",
    studio: "Commerce landing",
    logo: nachieLogo,
    tags: ["React", "Brand UI", "Commerce UX"],
    signals: ["Product storytelling", "Responsive storefront", "Purchase confidence"],
    link: "https://nachiemaridadi.vercel.app/",
    github: "https://github.com/TosinISOGUN/nachie_maridadi",
    problem:
      "The brand needed a polished commerce surface that presents products clearly and builds enough confidence to buy.",
    result:
      "A lightweight, brand-forward storefront experience with strong product presentation and a direct path toward purchase.",
  },
];

export const moreProjects = [
  {
    title: "Shemt",
    logo: shemtLogo,
    link: "https://shemt.vercel.app/",
    type: "AI-assisted data interface",
  },
  {
    title: "Adaptive Future Tech",
    logo: aftLogo,
    link: "https://www.adaptive-future.com/",
    type: "Company website",
  },
  {
    title: "Recap",
    logo: recapLogo,
    link: "https://recap.isogunlabs.com/",
    type: "Atlassian Marketplace app",
  },
];

export const showcaseScreens = [
  {
    title: "Open School Field landing",
    project: "Open School Field",
    image: osf261,
    kind: "Marketplace landing",
    category: "Landing",
    insight: "Positioned idle school fields as bookable public infrastructure with clear search entry points.",
    link: "https://open-school-field-five.vercel.app",
  },
  {
    title: "Admin operations",
    project: "Open School Field",
    image: osf266,
    kind: "Admin dashboard",
    category: "Dashboard",
    insight: "Aggregates school, booking, facility, and dispute health into a single operations console.",
    link: "https://open-school-field-five.vercel.app",
  },
  {
    title: "Facility discovery",
    project: "Open School Field",
    image: osf263,
    kind: "Search flow",
    category: "Booking",
    insight: "Search and facility detail flows balance public simplicity with availability and pricing depth.",
    link: "https://open-school-field-five.vercel.app",
  },
  {
    title: "School operations",
    project: "Open School Field",
    image: osf268,
    kind: "School portal",
    category: "Admin",
    insight: "Gives schools facility, booking, staff, verification, revenue, and check-in workflows.",
    link: "https://open-school-field-five.vercel.app",
  },
  {
    title: "Localized booking",
    project: "Open School Field",
    image: osf270,
    kind: "Yoruba-ready UI",
    category: "Booking",
    insight: "English and Yoruba switching improves access for local users who are more comfortable outside English.",
    link: "https://open-school-field-five.vercel.app",
  },
  {
    title: "OYOBOOKING search",
    project: "OYOBOOKING",
    image: oyo258,
    kind: "Booking flow",
    category: "Booking",
    insight: "A public-sector booking interface tuned for clarity, trust, and fast facility discovery.",
    link: "https://oyobooking.ng",
  },
  {
    title: "OYOBOOKING detail",
    project: "OYOBOOKING",
    image: oyo260,
    kind: "Facility detail",
    category: "Booking",
    insight: "Turns facility data into a decision-ready page with clear actions and responsive presentation.",
    link: "https://oyobooking.ng",
  },
  {
    title: "Infinitative landing",
    project: "Infinitative",
    image: infinitativeLanding,
    kind: "Commerce landing",
    category: "Landing",
    insight: "A premium marketplace home page built around search, product categories, and vendor trust.",
    link: "https://infinitative-aft.vercel.app/",
  },
  {
    title: "Infinitative products",
    project: "Infinitative",
    image: infinitativeProducts,
    kind: "Product discovery",
    category: "Landing",
    insight: "Product cards, filtering, and shopping actions make the catalog easy to scan and buy from.",
    link: "https://infinitative-aft.vercel.app/",
  },
  {
    title: "Infinitative cart",
    project: "Infinitative",
    image: infinitativeCart,
    kind: "Cart flow",
    category: "Booking",
    insight: "Cart quantity controls and order summary patterns support a checkout-ready commerce path.",
    link: "https://infinitative-aft.vercel.app/",
  },
  {
    title: "Learncity landing",
    project: "Learncity",
    image: learncity278,
    kind: "Education landing",
    category: "Landing",
    insight: "A structured education landing page built for scanning, conversion, and program discovery.",
    link: "https://learncityacademy.com/",
  },
  {
    title: "Learncity interface",
    project: "Learncity",
    image: learncity281,
    kind: "Learning platform",
    category: "Dashboard",
    insight: "Learning surfaces organized around practical navigation and repeat user workflows.",
    link: "https://learncityacademy.com/",
  },
  {
    title: "C-HOMES marketplace",
    project: "C-HOMES",
    image: cHomes274,
    kind: "Property interface",
    category: "Landing",
    insight: "A property marketplace surface with CMS-backed content and clear listing hierarchy.",
    link: "https://c-homes.vercel.app/",
  },
  {
    title: "C-HOMES content",
    project: "C-HOMES",
    image: cHomes276,
    kind: "CMS surface",
    category: "Admin",
    insight: "Editable property content keeps the marketplace maintainable beyond the first launch.",
    link: "https://c-homes.vercel.app/",
  },
  {
    title: "Nachie Maridadi",
    project: "Nachie Maridadi",
    image: nachie271,
    kind: "Commerce landing",
    category: "Landing",
    insight: "A brand-forward commerce page using strong product presentation and direct conversion paths.",
    link: "https://nachiemaridadi.vercel.app/",
  },
];

export const openSchoolFieldCaseStudy = {
  title: "Open School Field",
  subtitle: "A role-based frontend for booking school sports and event facilities across Oyo State.",
  liveUrl: "https://open-school-field-five.vercel.app",
  image: osf266,
  facts: [
    "Renter, school, agent, super-agent, and admin workflows",
    "TanStack Router, TanStack Query, React 19, TypeScript, Tailwind v4",
    "Mock API and live API abstraction for backend handoff",
    "English and Yoruba localization for local access",
    "PWA/offline support, monitoring wrapper, and realtime event contract",
  ],
  decisions: [
    {
      label: "Routing",
      value: "File-based TanStack Router routes keep renter, school, agent, and admin areas separated without hiding shared patterns.",
    },
    {
      label: "Data Layer",
      value: "A service contract lets the UI run fully against mock data while remaining ready for an ASP.NET Core backend.",
    },
    {
      label: "Localization",
      value: "The language switcher changes English to Yoruba in one interaction, widening access for local users.",
    },
  ],
};

export const projectCaseStudies = [
  {
    slug: "open-school-field",
    title: "Open School Field",
    eyebrow: "Booking Platform",
    year: "2026",
    role: "Frontend Developer",
    liveUrl: "https://open-school-field-five.vercel.app",
    cover: osf261,
    summary:
      "A role-based frontend for booking school sports and event facilities across Oyo State, built for renters, schools, agents, super-agents, and admins.",
    challenge:
      "The product needed to feel simple for public renters while supporting deep operational workflows for schools, agents, finance, disputes, reports, and platform admins.",
    approach:
      "I structured the frontend around TanStack Router route groups, a contract-first service layer, TanStack Query cache boundaries, and reusable portal patterns. The mock API keeps the UI fully usable without a backend, while the service contract keeps the handoff ready for ASP.NET Core endpoints.",
    outcome:
      "The result is a full product frontend with public discovery, authenticated booking flows, multi-role dashboards, offline/PWA support, realtime hooks, monitoring abstraction, and English to Yoruba language switching.",
    metrics: ["5 role families", "47 UI primitives", "English/Yoruba", "Mock/live API ready"],
    decisions: [
      {
        label: "Routing",
        value:
          "File-based TanStack Router routes separate renter, school, agent, and admin areas while keeping shared UI patterns reusable.",
      },
      {
        label: "Data Layer",
        value:
          "A service contract lets the frontend run fully on mock data while staying ready for an ASP.NET Core API handoff.",
      },
      {
        label: "Localization",
        value:
          "English and Yoruba language switching makes the booking flow more useful for local users who may not prefer English.",
      },
    ],
    gallery: openSchoolFieldScreens,
  },
  {
    slug: "recap",
    title: "Recap",
    eyebrow: "Atlassian Marketplace",
    year: "2026",
    role: "Founder and Frontend/Product Engineer",
    liveUrl: "https://recap.isogunlabs.com/",
    marketplaceUrl: "https://marketplace.atlassian.com/2146687861",
    cover: recapScreens[0] ?? recapLogo,
    summary:
      "A Jira app that turns completed work into reporting output, reducing the manual status-update loop for teams.",
    challenge:
      "Teams lose time every reporting cycle collecting finished Jira work and turning it into readable updates.",
    approach:
      "I owned the Forge app experience, resolver architecture, marketing site, structured content, Marketplace listing, and review process.",
    outcome:
      "Recap shipped as a live commercial Atlassian Marketplace app and became part of a three-product Isogun Labs suite.",
    metrics: ["Live Marketplace app", "Forge architecture", "SEO site", "Security review"],
    decisions: [
      {
        label: "Forge Surface",
        value:
          "The app experience is shaped around Jira context, so users can create reporting output without leaving their workflow.",
      },
      {
        label: "Product Packaging",
        value:
          "The marketing site, Marketplace listing, and security review were treated as part of the product, not separate chores.",
      },
      {
        label: "Narrow Scope",
        value:
          "The core action stays focused on replacing a repeated reporting task instead of becoming a broad project management suite.",
      },
    ],
    gallery: recapScreens.length ? recapScreens : [recapLogo],
  },
  {
    slug: "oyobooking",
    title: "OYOBOOKING",
    eyebrow: "Public Booking",
    year: "2025",
    role: "Frontend Developer",
    liveUrl: "https://oyobooking.ng",
    githubUrl: "https://github.com/TosinISOGUN/oyo_booking.com",
    cover: oyo258,
    summary:
      "A booking interface for public facility discovery, comparison, and reservation flows.",
    challenge:
      "The experience had to keep public-sector booking flows clear while handling changing facility data and user actions.",
    approach:
      "I focused on responsive search, accessible UI patterns, API-backed flows, and clear conversion paths across facility pages.",
    outcome:
      "A production-oriented booking experience that helps users move from discovery to action with less friction.",
    metrics: ["API-backed flows", "Responsive UI", "Accessible patterns", "Booking UX"],
    decisions: [
      {
        label: "Booking Clarity",
        value:
          "The interface keeps discovery, facility details, and action paths clear so public users can move without form fatigue.",
      },
      {
        label: "Responsive Priority",
        value:
          "The layout favors quick scanning on mobile and desktop because booking journeys often start from mixed device contexts.",
      },
      {
        label: "Trust Cues",
        value:
          "Facility presentation, labels, and calls to action are designed to make public-sector booking feel clear and reliable.",
      },
    ],
    gallery: oyoBookingScreens,
  },
  {
    slug: "infinitative",
    title: "Infinitative",
    eyebrow: "Commerce Marketplace",
    year: "2026",
    role: "Frontend Developer",
    liveUrl: "https://infinitative-aft.vercel.app/",
    cover: infinitativeLanding,
    summary:
      "A premium multi-vendor marketplace interface for product discovery, vendor browsing, cart management, and checkout-oriented shopping flows.",
    challenge:
      "The marketplace needed to feel premium and trustworthy while keeping products, vendors, search, cart actions, and checkout information easy to understand.",
    approach:
      "I built a commerce frontend around strong visual hierarchy, reusable product surfaces, clear navigation, and familiar shopping patterns for cart and vendor journeys.",
    outcome:
      "The result is a polished marketplace experience with a premium landing page, product discovery, vendor-facing surfaces, cart management, and responsive checkout-ready flows.",
    metrics: ["Commerce UX", "Vendor surfaces", "Cart flow", "Responsive storefront"],
    decisions: [
      {
        label: "Product Discovery",
        value:
          "Search, category navigation, and product cards work together so shoppers can move from browsing to action quickly.",
      },
      {
        label: "Vendor Trust",
        value:
          "Vendor pages and marketplace messaging make the storefront feel like a platform rather than a single-product landing page.",
      },
      {
        label: "Checkout Flow",
        value:
          "Cart controls, order summary, and secure checkout cues keep the purchase path familiar and low-friction.",
      },
    ],
    gallery: infinitativeScreens,
  },
  {
    slug: "c-homes",
    title: "C-HOMES",
    eyebrow: "CMS Marketplace",
    year: "2025",
    role: "Frontend Developer",
    liveUrl: "https://c-homes.vercel.app/",
    githubUrl: "https://github.com/TosinISOGUN/c-homes",
    cover: cHomes274,
    summary:
      "A CMS-driven property marketplace designed for editable listings, search-friendly content, and clean property presentation.",
    challenge:
      "Property content changes constantly, so the frontend needed to support structured content without becoming brittle.",
    approach:
      "I built a React frontend backed by Sanity CMS, with listing-oriented layouts and reusable presentation patterns.",
    outcome:
      "A maintainable property marketplace surface that can be updated without rebuilding the UI around every content change.",
    metrics: ["Sanity CMS", "Editable listings", "Responsive cards", "Search-friendly pages"],
    decisions: [
      {
        label: "Content Model",
        value:
          "Sanity CMS gives listings a structured source of truth, keeping property pages editable without frontend rewrites.",
      },
      {
        label: "Listing Hierarchy",
        value:
          "Cards, detail pages, and image presentation are arranged around comparison, trust, and quick property scanning.",
      },
      {
        label: "Maintainability",
        value:
          "Reusable layout patterns keep the marketplace flexible as property categories and listing content change.",
      },
    ],
    gallery: cHomesScreens,
  },
  {
    slug: "learncity",
    title: "Learncity",
    eyebrow: "Education Platform",
    year: "2025",
    role: "Frontend Developer",
    liveUrl: "https://learncityacademy.com/",
    githubUrl: "https://github.com/TosinISOGUN/learncity",
    cover: learncity278,
    summary:
      "An education platform surface built to help learners discover programs, understand offers, and move through the academy experience clearly.",
    challenge:
      "The interface needed to communicate learning value quickly while keeping navigation and program discovery simple for prospective students.",
    approach:
      "I built responsive landing and learning surfaces with clear hierarchy, reusable sections, and conversion-focused content structure.",
    outcome:
      "The result is a polished academy experience that supports discovery, trust-building, and repeat navigation across key learning pages.",
    metrics: ["Education UX", "Responsive frontend", "Landing systems", "Learning surfaces"],
    decisions: [
      {
        label: "Program Discovery",
        value:
          "The page structure helps prospective learners understand offers quickly before moving deeper into the academy experience.",
      },
      {
        label: "Content Hierarchy",
        value:
          "Section order, headings, and repeated patterns are tuned for scanning rather than long-form reading.",
      },
      {
        label: "Learning Surface",
        value:
          "The interface keeps navigation practical for repeat use instead of treating the product as only a landing page.",
      },
    ],
    gallery: learncityScreens,
  },
  {
    slug: "nachie-maridadi",
    title: "Nachie Maridadi",
    eyebrow: "Commerce Landing",
    year: "2025",
    role: "Frontend Developer",
    liveUrl: "https://nachiemaridadi.vercel.app/",
    githubUrl: "https://github.com/TosinISOGUN/nachie_maridadi",
    cover: nachie271,
    summary:
      "A brand-forward commerce interface designed to present products clearly and move visitors toward confident purchase decisions.",
    challenge:
      "The page needed enough visual polish to support the brand while staying lightweight, direct, and easy to browse.",
    approach:
      "I focused on strong product presentation, responsive page composition, and clear action paths across the landing experience.",
    outcome:
      "The result is a clean commerce landing page with stronger product visibility and a simpler path from interest to action.",
    metrics: ["Commerce UI", "Responsive layout", "Product presentation", "Conversion flow"],
    decisions: [
      {
        label: "Product Focus",
        value:
          "The landing experience keeps visual attention on products and brand trust instead of burying the offer in decoration.",
      },
      {
        label: "Conversion Path",
        value:
          "Calls to action and page sections are organized to move visitors from interest to confident next steps.",
      },
      {
        label: "Lightweight Build",
        value:
          "The interface stays visually polished while keeping the frontend direct, responsive, and easy to maintain.",
      },
    ],
    gallery: nachieScreens,
  },
];
