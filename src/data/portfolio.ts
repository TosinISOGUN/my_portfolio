import cHomesLogo from "@/assets/portfolio/c-homes.svg";
import infinitativeLogo from "@/assets/portfolio/infinitative.svg";
import learncityLogo from "@/assets/portfolio/LC_logo.png";
import nachieLogo from "@/assets/portfolio/nachie_maridadi_favicon.png";
import oyoLogo from "@/assets/portfolio/oyo-state-logo-card.png";

type ScreenshotModule = Record<string, string>;

const getScreens = (modules: ScreenshotModule) =>
  Object.entries(modules)
    .sort(([first], [second]) =>
      first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map(([, image]) => image);

const openSchoolFieldModules = import.meta.glob(
  "../assets/product_showcase/open school field/*.webp",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as ScreenshotModule;
const openSchoolFieldScreens = getScreens(openSchoolFieldModules);

// Pick a specific screenshot by file name so hand-picked covers don't shift when new files are added.
const pickScreen = (modules: ScreenshotModule, fileName: string) =>
  Object.entries(modules).find(([path]) => path.endsWith(`/${fileName}`))?.[1] ??
  Object.values(modules)[0] ??
  "";

const oyoBookingScreens = getScreens(
  import.meta.glob("../assets/product_showcase/oyobooking/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const cHomesScreens = getScreens(
  import.meta.glob("../assets/product_showcase/c-homes/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const infinitativeScreens = getScreens(
  import.meta.glob("../assets/product_showcase/infinitative/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const learncityScreens = getScreens(
  import.meta.glob("../assets/product_showcase/learncity/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const nachieScreens = getScreens(
  import.meta.glob("../assets/product_showcase/nachie maridadi/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const payflowScreens = getScreens(
  import.meta.glob("../assets/product_showcase/payflow/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const samsoniScreens = getScreens(
  import.meta.glob("../assets/product_showcase/samsoni/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const thomasonScreens = getScreens(
  import.meta.glob("../assets/product_showcase/thomason/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const certificationModules = Object.entries(
  import.meta.glob("../assets/certifications/*.{png,jpeg,jpg}", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
).sort(([first], [second]) =>
  first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }),
);

const getCertificateTitle = (path: string) => {
  const fileName = path.split("/").pop() ?? "Certificate";
  return fileName
    .replace(/\.(png|jpe?g)$/i, "")
    .replace(/^Certificate\s*\(/, "")
    .replace(/\)$/, "")
    .replace(/-/g, " ");
};

const getCertificationMeta = (title: string) => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("deloitte")) {
    return {
      issuer: "Deloitte",
      theme: "Data & Analytics",
      signal: "Data analysis and forensic technology",
      proof:
        "Strengthens the way I reason about data-heavy interfaces, reporting flows, and operational dashboards.",
    };
  }

  if (lowerTitle.includes("tata")) {
    return {
      issuer: "Tata",
      theme: "Data & Analytics",
      signal: "Data visualisation for business decisions",
      proof:
        "Supports clearer charting, visual hierarchy, and executive-facing product communication.",
    };
  }

  if (lowerTitle.includes("scrum")) {
    return {
      issuer: "SCRUMstudy",
      theme: "Agile & Operations",
      signal: "Scrum fundamentals",
      proof:
        "Adds process discipline for teams shipping iterative product work under changing requirements.",
    };
  }

  if (lowerTitle.includes("six sigma")) {
    return {
      issuer: "Six Sigma",
      theme: "Agile & Operations",
      signal: "Process improvement and quality thinking",
      proof:
        "Improves how I think about waste, consistency, and repeatable delivery in product workflows.",
    };
  }

  if (lowerTitle.includes("project management")) {
    return {
      issuer: "Project Management",
      theme: "Product & Delivery",
      signal: "Planning, execution, and delivery control",
      proof:
        "Supports stronger ownership across scope, timelines, stakeholder needs, and launch readiness.",
    };
  }

  if (lowerTitle.includes("aspire")) {
    return {
      issuer: "Aspire Leaders Program",
      theme: "Product & Delivery",
      signal: "Leadership and business communication",
      proof:
        "Builds the communication side of product work: tradeoffs, clarity, ownership, and decision-making.",
    };
  }

  if (lowerTitle.includes("aptech")) {
    return {
      issuer: "Aptech",
      theme: "Technical Foundation",
      signal: "Network and systems fundamentals",
      proof:
        "Gives me better context for performance, connectivity, deployment, and system-level constraints.",
    };
  }

  if (lowerTitle.includes("micro1")) {
    return {
      issuer: "Micro1",
      theme: "Technical Foundation",
      signal: "Technical assessment and software readiness",
      proof:
        "Adds a practical validation point for engineering judgment and professional software delivery.",
    };
  }

  if (lowerTitle.includes("ai")) {
    return {
      issuer: "AI Certs",
      theme: "AI & Technical Growth",
      signal: "Applied AI literacy",
      proof:
        "Keeps my product thinking current as AI becomes part of modern frontend and workflow design.",
    };
  }

  return {
    issuer: title.includes(" - ") ? title.split(" - ")[0] : title.split(" ")[0],
    theme: "Technical Growth",
    signal: "Professional development",
    proof:
      "Adds another practical learning signal to the way I approach product and interface work.",
  };
};

const osf261 = pickScreen(openSchoolFieldModules, "Screenshot (261).webp");
// Hand-picked screens (cover + highlights). Falls back to the first screen if the folder is short.
const screenAt = (screens: string[], index: number) => screens[index] ?? screens[0] ?? "";

const oyo258 = screenAt(oyoBookingScreens, 0);
const cHomes274 = screenAt(cHomesScreens, 0);
const infinitativeLanding = screenAt(infinitativeScreens, 0);
const learncity278 = screenAt(learncityScreens, 0);
const nachie271 = screenAt(nachieScreens, 0);
const payflowLanding = screenAt(payflowScreens, 0);
const samsoniLanding = screenAt(samsoniScreens, 1);
const thomasonLanding = screenAt(thomasonScreens, 0);

export const profile = {
  name: "Oluwatomisin Isogun",
  role: "Frontend Developer",
  email: "oluwatomisinisogun@gmail.com",
  github: "https://github.com/TosinISOGUN",
  linkedin: "https://www.linkedin.com/in/oluwatomisin-isogun-a38740356/",
  upwork: "https://www.upwork.com/freelancers/~0136c2f689158ada21?mp_source=share",
};

export type WorkHistoryEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
  points: string[];
  products?: { name: string; description: string; href: string }[];
};

export const workHistory: WorkHistoryEntry[] = [
  {
    role: "Founder & Product Engineer",
    company: "Isogun Labs",
    period: "Jul 2026 - Present",
    location: "Nigeria · Hybrid",
    summary:
      "An independent software studio focused on practical, privacy-conscious tools for the Atlassian ecosystem.",
    stack: [
      "Atlassian Forge",
      "Node.js",
      "React",
      "JavaScript",
      "Jira REST API",
      "Forge Storage",
      "Forge LLM",
    ],
    points: [
      "Built and launched three production apps on the Atlassian Marketplace: Recap, Field Hygiene, and Passdown.",
      "Led the full product lifecycle from problem discovery and architecture to development, testing, Marketplace review, and release.",
      "Developed Forge apps that integrate directly with Jira and Jira Service Management.",
      "Designed products around focused use cases, minimal permissions, and platform-native data handling to reduce unnecessary external data exposure.",
      "Owned SEO, technical marketing, and go-to-market execution across product websites and Marketplace listings.",
    ],
    products: [
      {
        name: "Field Hygiene for Jira",
        description: "Finds duplicate, unused, and undocumented custom fields on a Jira site.",
        href: "https://marketplace.atlassian.com/apps/2905942594",
      },
      {
        name: "Passdown",
        description: "Writes shift-handoff briefs for Jira Service Management teams.",
        href: "https://passdown.isogunlabs.com/",
      },
    ],
  },
  {
    role: "Frontend Web Development Instructor",
    company: "Learncity",
    period: "Mar 2026 - Present",
    location: "Ibadan, Oyo State · Hybrid",
    summary:
      "Teaching frontend web development through a structured 24-week program covering the fundamentals of modern, responsive websites and web applications.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive design", "Accessibility"],
    points: [
      "Deliver practical lessons on HTML, CSS, JavaScript, responsive design, and frontend development principles.",
      "Prepare lesson materials, exercises, projects, and hands-on coding activities.",
      "Guide students through building real-world interfaces and debugging frontend issues.",
      "Teach accessibility, clean code practices, and modern development workflows.",
      "Give technical feedback and mentorship to help students improve their problem-solving and development skills.",
    ],
  },
  {
    role: "Frontend Web Developer",
    company: "AFT Solutions Limited",
    period: "Oct 2025 - Present",
    location: "Ibadan, Oyo State · On-site",
    summary: "Enterprise and government web applications in React and TypeScript.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "REST APIs",
      "PWAs",
      "Responsive design",
    ],
    points: [
      "Engineered and deployed production frontend features using React, TypeScript, and Tailwind CSS within an Agile/Scrum delivery model.",
      "Reduced web application load times by 40% through strategic bundle splitting, lazy loading, and core component refactoring.",
      "Implemented reusable UI component libraries and enforced accessibility standards to keep client-facing interfaces consistent.",
    ],
  },
  {
    role: "Data Entry Specialist",
    company: "AFT Solutions Limited",
    period: "Jun 2025 - Jan 2026",
    location: "Hybrid",
    summary: "Data entry and analysis role at AFT Solutions Limited.",
    stack: ["Data Analysis", "Web Development"],
    points: [],
  },
  {
    role: "Research Assistant",
    company: "Ondo State University of Science and Technology",
    period: "Jan 2025 - Mar 2025",
    location: "Okitipupa, Ondo State · Hybrid",
    summary: "Part-time research on AI-driven weather prediction.",
    stack: ["LSTM networks", "Time-series modeling", "Model validation"],
    points: [
      "Conducted time-series modeling using LSTM networks to improve accuracy in AI-driven weather prediction.",
      "Preprocessed and engineered features from incomplete meteorological datasets, and validated models using cross-validation and error analysis.",
      "Compared traditional regression methods with deep learning approaches and documented experimental results for internal research reports.",
    ],
  },
];

export const skills = [
  "React 18+",
  "Next.js",
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

export const certifications = certificationModules.map(([path, image], index) => {
  const title = getCertificateTitle(path);
  const meta = getCertificationMeta(title);

  return {
    title,
    image,
    order: index + 1,
    ...meta,
  };
});

export const featuredProjects = [
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
    title: "Payflow",
    slug: "payflow",
    studio: "Payroll and compliance platform",
    tags: ["React", "Product Marketing UI", "Pricing Flow"],
    signals: ["Compliance messaging", "Platform storytelling", "Pricing clarity"],
    link: "https://payflow-rose-ten.vercel.app/",
    problem:
      "Payroll and compliance products can feel dense quickly, so the interface needed to communicate operational depth without overwhelming buyers.",
    result:
      "A polished HR/payroll product site with a premium landing page, platform storytelling, pricing surfaces, and responsive product presentation.",
  },
  {
    title: "Samsoni",
    slug: "samsoni",
    studio: "Water delivery storefront",
    tags: ["React", "Local Commerce", "WhatsApp Ordering"],
    signals: ["Product browsing", "Recurring delivery plans", "WhatsApp conversion"],
    link: "https://samsoni.vercel.app/",
    problem:
      "The brand needed a direct commerce surface that could communicate quality, delivery coverage, and product options quickly.",
    result:
      "A fast local-business storefront that turns bottled and sachet water supply into a simple, conversion-oriented flow.",
  },
  {
    title: "Thomason",
    slug: "thomason",
    studio: "Coffee and hospitality website",
    tags: ["React", "Editorial Layout", "Hospitality UX"],
    signals: ["Full-bleed imagery", "Menu discovery", "Premium first impression"],
    link: "https://thomason.vercel.app/",
    problem:
      "Hospitality pages need to sell a feeling quickly while still making practical content like the menu easy to reach.",
    result:
      "An editorial-feeling restaurant interface with strong ambience, responsive composition, and direct menu exploration.",
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
];

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
    slug: "payflow",
    title: "Payflow",
    eyebrow: "Payroll Platform",
    year: "2026",
    role: "Frontend Developer",
    liveUrl: "https://payflow-rose-ten.vercel.app/",
    cover: payflowLanding,
    summary:
      "A people, payroll, and compliance platform concept designed to make HR operations feel calm, trustworthy, and easy to scan.",
    challenge:
      "Payroll and compliance products can feel dense quickly, so the interface needed to communicate operational depth without overwhelming buyers.",
    approach:
      "I shaped the experience around strong product positioning, clean navigation, proof-driven sections, pricing clarity, and dashboard-style surfaces.",
    outcome:
      "The result is a polished HR/payroll product site with a premium landing page, platform storytelling, pricing surfaces, and responsive product presentation.",
    metrics: ["Payroll UX", "Compliance messaging", "Pricing flow", "Responsive product site"],
    decisions: [
      {
        label: "Trust First",
        value:
          "The page leads with reliability, compliance, and people operations so the product feels credible before asking for action.",
      },
      {
        label: "Product Narrative",
        value:
          "Sections move from positioning to platform capabilities and pricing, matching how business buyers evaluate payroll tools.",
      },
      {
        label: "Visual Restraint",
        value:
          "The interface uses generous space, calm color, and clear CTAs to keep an operational product from feeling heavy.",
      },
    ],
    gallery: payflowScreens,
  },
  {
    slug: "samsoni",
    title: "Samsoni",
    eyebrow: "Local Commerce",
    year: "2026",
    role: "Frontend Developer",
    liveUrl: "https://samsoni.vercel.app/",
    cover: samsoniLanding,
    summary:
      "A water delivery website for product browsing, trust-building, recurring delivery, and WhatsApp-led ordering across Lagos.",
    challenge:
      "The brand needed a direct commerce surface that could communicate quality, delivery coverage, and product options quickly.",
    approach:
      "I built the page around product cards, quality assurance content, recurring delivery plans, testimonials, and a clear WhatsApp order path.",
    outcome:
      "The result is a fast local-business storefront that turns bottled and sachet water supply into a simple, conversion-oriented flow.",
    metrics: ["Commerce landing", "WhatsApp conversion", "Delivery UX", "Responsive storefront"],
    decisions: [
      {
        label: "Immediate Ordering",
        value:
          "The primary path keeps ordering close to WhatsApp because that matches how local customers naturally complete purchases.",
      },
      {
        label: "Quality Proof",
        value:
          "Certification, filtration, purification, packaging, and distribution details give the brand more trust than a simple product list.",
      },
      {
        label: "Repeat Supply",
        value:
          "Recurring plans make the site useful for homes, offices, and events that need predictable delivery instead of one-off orders.",
      },
    ],
    gallery: samsoniScreens,
  },
  {
    slug: "thomason",
    title: "Thomason",
    eyebrow: "Hospitality Website",
    year: "2026",
    role: "Frontend Developer",
    liveUrl: "https://thomason.vercel.app/",
    cover: thomasonLanding,
    summary:
      "An atmospheric coffee and hospitality website focused on mood, menu discovery, and a premium first impression.",
    challenge:
      "Hospitality pages need to sell a feeling quickly while still making practical content like the menu easy to reach.",
    approach:
      "I leaned into full-bleed imagery, minimal navigation, quiet typography, and focused content sections that keep the brand experience immersive.",
    outcome:
      "The result is an editorial-feeling restaurant interface with strong ambience, responsive composition, and direct menu exploration.",
    metrics: ["Hospitality UX", "Full-bleed imagery", "Menu discovery", "Editorial layout"],
    decisions: [
      {
        label: "Atmosphere",
        value:
          "Photography and spacious type carry the first impression so visitors understand the brand mood before reading details.",
      },
      {
        label: "Minimal Navigation",
        value:
          "The interface keeps navigation sparse to preserve the immersive feel while still making the menu easy to access.",
      },
      {
        label: "Responsive Mood",
        value:
          "The layout keeps the same premium tone across devices instead of collapsing into a generic restaurant template.",
      },
    ],
    gallery: thomasonScreens,
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
