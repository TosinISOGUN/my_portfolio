import cHomesLogo from "@/assets/portfolio/c-homes.svg";
import infinitativeLogo from "@/assets/portfolio/infinitative.svg";
import learncityLogo from "@/assets/portfolio/LC_logo.png";
import nachieLogo from "@/assets/portfolio/nachie_maridadi_favicon.png";
import oyoLogo from "@/assets/portfolio/oyo-state-logo-card.png";
import { imageSizes } from "./image-sizes.generated";

type ScreenshotModule = Record<string, string>;
export type ImageSize = { width: number; height: number };

// Maps a built image URL to its pixel size, so components can reserve space before it loads.
const sizeByUrl = new Map<string, ImageSize>();

const registerSizes = (modules: ScreenshotModule) => {
  for (const [path, url] of Object.entries(modules)) {
    const size = imageSizes[path.replace("../assets/", "")];
    if (size) sizeByUrl.set(url, size);
  }
};

export const getImageSize = (src: string) => sizeByUrl.get(src);

const getScreens = (modules: ScreenshotModule) => {
  registerSizes(modules);

  return Object.entries(modules)
    .sort(([first], [second]) =>
      first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map(([, image]) => image);
};

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

const velouraScreens = getScreens(
  import.meta.glob("../assets/product_showcase/velora-beauty/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const hearthlineScreens = getScreens(
  import.meta.glob("../assets/product_showcase/hearthline-realty/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const juniperScreens = getScreens(
  import.meta.glob("../assets/product_showcase/juniper-ember/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const everwellScreens = getScreens(
  import.meta.glob("../assets/product_showcase/everwell/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

const gloriaScreens = getScreens(
  import.meta.glob("../assets/product_showcase/gloria-may-byron/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }) as ScreenshotModule,
);

// A tall capture of each older site's home page, in product_showcase/_tall/<slug>.webp. It is the
// cover and the first gallery picture, so every project is shown the same way.
const tallModules = import.meta.glob("../assets/product_showcase/_tall/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as ScreenshotModule;
registerSizes(tallModules);

const tallFor = (slug: string, fallback: string) =>
  Object.entries(tallModules).find(([path]) => path.endsWith(`/${slug}.webp`))?.[1] ?? fallback;

const withTall = (slug: string, screens: string[]) => {
  const tall = tallFor(slug, "");
  return tall ? [tall, ...screens] : screens;
};

const certificationFiles = import.meta.glob("../assets/certifications/*.{png,jpeg,jpg}", {
  eager: true,
  import: "default",
  query: "?url",
}) as ScreenshotModule;
registerSizes(certificationFiles);

const certificationModules = Object.entries(certificationFiles).sort(([first], [second]) =>
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
// The four concept sites: the cover is a tall capture of the home page (file 01-home).
const veloraHome = screenAt(velouraScreens, 0);
const hearthlineHome = screenAt(hearthlineScreens, 0);
const juniperHome = screenAt(juniperScreens, 0);
const everwellHome = screenAt(everwellScreens, 0);
const gloriaHome = screenAt(gloriaScreens, 0);

export const profile = {
  name: "Oluwatomisin Isogun",
  role: "Frontend Developer",
  email: "tomisin@isogunlabs.com",
  github: "https://github.com/TosinISOGUN",
  linkedin: "https://www.linkedin.com/in/oluwatomisin-isogun-a38740356/",
  upwork: "https://www.upwork.com/freelancers/~0136c2f689158ada21?mp_source=share",
  facebook: "https://www.facebook.com/profile.php?id=61595720432735",
};

/** Opens WhatsApp with a short starter message. Number is in international format, no plus or zeros. */
export const whatsappUrl = `https://wa.me/2348164376172?text=${encodeURIComponent("Hi Oluwatomisin, I'd like a website for my ")}`;

export const bookingUrl = "https://cal.com/oluwatomisin-isogun-disku5/20min";

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
      "My own software studio. I design, build, and launch focused, privacy-conscious tools for teams that use Jira.",
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
      "Built and launched three apps on the Atlassian Marketplace: Recap, Field Hygiene, and Passdown.",
      "Handled everything from finding the problem to design, building, testing, Marketplace review, and launch.",
      "Built the apps to work inside Jira and Jira Service Management.",
      "Kept each app focused on one job and limited to the access it needs, to avoid unnecessary external data sharing.",
      "Ran the SEO, marketing, and launch for each product website and Marketplace listing.",
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

// Repository links ("github" here, "githubUrl" on the case studies) are commented out on purpose;
// uncomment them, and the block in src/routes/projects/$slug.tsx, to show them again.
// The first four are concept sites built for fictional businesses. They lead the list so a
// business owner sees them first; each says "Concept project" so nobody mistakes them for clients.
export const featuredProjects = [
  {
    title: "Velora Beauty",
    slug: "velora-beauty",
    accent: "#243B7A",
    studio: "Beauty brand concept",
    tags: ["React 19", "TanStack Start", "Tailwind CSS", "Shop and bag flow"],
    labels: ["Concept project", "Online shop", "Mobile-friendly"],
    signals: ["Shop and collections", "Routine builder", "Bag and checkout"],
    link: "https://velorabeautyy.vercel.app",
    // github: "https://github.com/TosinISOGUN/velora_beauty",
    problem:
      "A concept brief for a fictional beauty label that needed to feel colour-forward and confident while keeping shopping simple.",
    result:
      "A demo storefront with collections, product pages, a routine builder, a bag and a checkout.",
  },
  {
    title: "Hearthline Realty",
    slug: "hearthline-realty",
    accent: "#2F5D4B",
    studio: "Real estate brokerage concept",
    tags: ["React 19", "TanStack Start", "Leaflet map", "Search in the page address"],
    labels: ["Concept project", "Home search and map", "Mobile-friendly"],
    signals: ["Home search", "Map view", "Showing requests"],
    link: "https://hearthlinerealty.vercel.app",
    // github: "https://github.com/TosinISOGUN/hearthline_realty",
    problem:
      "A concept brief for a fictional boutique brokerage where buyers find a home quickly and sellers see a clear way to get in touch.",
    result:
      "A demo site with home search, a list and map view, home pages with galleries, and showing, valuation and contact forms.",
  },
  {
    title: "Juniper & Ember",
    slug: "juniper-ember",
    accent: "#B4542F",
    studio: "Restaurant concept",
    tags: ["React 19", "TanStack Start", "Tailwind CSS", "Ordering demo"],
    labels: ["Concept project", "Menu and ordering", "Table reservations"],
    signals: ["Tabbed menu", "Pickup ordering", "Reservations"],
    link: "https://juniperandember.vercel.app/",
    // github: "https://github.com/TosinISOGUN/juniper_and_ember",
    problem:
      "A concept brief for a fictional wood-fired restaurant that needed to sell its mood on the first screen and still make the menu, ordering and booking easy to reach.",
    result:
      "A demo site with a tabbed menu, pickup ordering with a cart, reservations, a gallery and a light and dark theme.",
  },
  {
    title: "Everwell",
    slug: "everwell",
    accent: "#2F6F66",
    studio: "Clinic website concept",
    tags: ["React 19", "TanStack Start", "Tailwind CSS", "Accessible forms"],
    labels: ["Concept project", "Clear service pages", "Mobile-friendly"],
    signals: ["Service pages", "Plain language", "Contact form"],
    link: "https://everwelldental.vercel.app",
    // github: "https://github.com/TosinISOGUN/everwell_dental",
    problem:
      "A concept brief for a fictional clinic where people choosing a practice need plain language, clear services and an easy way to get in touch.",
    result:
      "A demo site with a services overview, a page for each service, a practice page and a contact form.",
  },
  {
    title: "Gloria May Byron",
    slug: "gloria-may-byron",
    accent: "#1F5C6B",
    studio: "Singer and songwriter website",
    tags: ["React 19", "TanStack Start", "Tailwind CSS", "Scroll-driven motion"],
    labels: ["Artist website", "Music and videos", "Mobile-friendly"],
    signals: ["Music and videos", "News and announcements", "Awards"],
    link: "https://gloriamaybyron.vercel.app",
    problem:
      "An independent artist needed one place that shows her music, news, photos and awards and makes it easy to get in touch.",
    result:
      "A photography-led artist website with music and video pages, news, a photo gallery, an awards page and a contact page.",
  },
  {
    title: "Samsoni",
    slug: "samsoni",
    accent: "#1769B5",
    studio: "Water delivery storefront",
    tags: ["React", "Local Commerce", "WhatsApp Ordering"],
    labels: ["WhatsApp ordering", "Delivery plans", "Mobile-friendly"],
    signals: ["Product browsing", "Recurring delivery plans", "WhatsApp conversion"],
    link: "https://samsoni.vercel.app/",
    problem:
      "The brand needed a direct commerce surface that could communicate quality, delivery coverage, and product options quickly.",
    result:
      "A fast local-business storefront that turns bottled and sachet water supply into a simple, conversion-oriented flow.",
  },
  {
    title: "OYOBOOKING",
    slug: "oyobooking",
    accent: "#8E2B3C",
    studio: "Oyo State booking platform",
    logo: oyoLogo,
    tags: ["React", "API Integration", "Accessibility"],
    labels: ["Online booking", "Easy to use", "Mobile-friendly"],
    signals: ["Public booking UX", "API-backed flows", "Responsive facility pages"],
    link: "https://oyobooking.ng",
    // github: "https://github.com/TosinISOGUN/oyo_booking.com",
    problem:
      "Public-facing booking flows need to handle real users, changing data, and high clarity without collapsing into form clutter.",
    result:
      "A fast, responsive booking experience with API-backed flows, accessible interface patterns, and production-oriented UX.",
  },
  {
    title: "Thomason",
    slug: "thomason",
    accent: "#6F4A2E",
    studio: "Coffee and hospitality website",
    tags: ["React", "Editorial Layout", "Hospitality UX"],
    labels: ["Menu discovery", "Full-screen photography", "Mobile-friendly"],
    signals: ["Full-bleed imagery", "Menu discovery", "Premium first impression"],
    link: "https://thomason.vercel.app/",
    problem:
      "Hospitality pages need to sell a feeling quickly while still making practical content like the menu easy to reach.",
    result:
      "An editorial-feeling restaurant interface with strong ambience, responsive composition, and direct menu exploration.",
  },
  {
    title: "Nachie Maridadi",
    slug: "nachie-maridadi",
    accent: "#B5651D",
    studio: "Commerce landing",
    logo: nachieLogo,
    tags: ["React", "Brand UI", "Commerce UX"],
    labels: ["Online storefront", "Product showcase", "Mobile-friendly"],
    signals: ["Product storytelling", "Responsive storefront", "Purchase confidence"],
    link: "https://nachiemaridadi.vercel.app/",
    // github: "https://github.com/TosinISOGUN/nachie_maridadi",
    problem:
      "The brand needed a polished commerce surface that presents products clearly and builds enough confidence to buy.",
    result:
      "A lightweight, brand-forward storefront experience with strong product presentation and a direct path toward purchase.",
  },
  {
    title: "C-HOMES",
    slug: "c-homes",
    accent: "#1F4E6B",
    studio: "CMS-driven property marketplace",
    logo: cHomesLogo,
    tags: ["React", "Sanity CMS", "Content Management"],
    labels: ["Editable listings", "Search-friendly pages", "Mobile-friendly"],
    signals: ["CMS content model", "Property listing UX", "Search-friendly frontend"],
    link: "https://c-homes.vercel.app/",
    // github: "https://github.com/TosinISOGUN/c-homes",
    problem:
      "Property platforms need structured content, search-friendly pages, and a management workflow that can keep listings current.",
    result:
      "A CMS-powered marketplace experience with editable property content, responsive presentation, and a maintainable frontend.",
  },
  {
    title: "Infinitative",
    slug: "infinitative",
    accent: "#1E2A4A",
    studio: "Multi-vendor commerce marketplace",
    logo: infinitativeLogo,
    tags: ["React", "Marketplace UX", "Cart Flow"],
    labels: ["Vendor pages", "Shopping cart", "Mobile-friendly"],
    signals: ["Premium commerce landing", "Vendor discovery", "Checkout-ready cart"],
    link: "https://infinitative-aft.vercel.app/",
    problem:
      "Multi-vendor commerce experiences need to present premium products, vendor trust, and shopping actions without making the storefront feel crowded.",
    result:
      "A polished marketplace interface with product discovery, vendor surfaces, cart management, checkout summary, and responsive commerce flows.",
  },
  {
    title: "Open School Field",
    slug: "open-school-field",
    accent: "#9B4A57",
    studio: "Oyo State school facility marketplace",
    logo: oyoLogo,
    tags: ["React 19", "TanStack Router", "TanStack Query", "PWA", "Yoruba i18n"],
    labels: ["Online booking", "English and Yoruba", "Works offline"],
    signals: ["Multi-role portals", "English/Yoruba switching", "Mock/live API layer"],
    link: "https://open-school-field-five.vercel.app",
    problem:
      "Schools, renters, agents, and admins need one clear interface for discovering, booking, managing, and reporting on school sports facilities.",
    result:
      "A frontend-only marketplace with renter, school, agent, and admin portals, mock/live API switching, offline support, realtime hooks, and English to Yoruba language switching.",
  },
  {
    title: "Learncity",
    slug: "learncity",
    accent: "#2E8B3E",
    studio: "Academy platform",
    logo: learncityLogo,
    tags: ["React", "Responsive UI", "Landing Systems"],
    labels: ["Program pages", "Easy navigation", "Mobile-friendly"],
    signals: ["Education UX", "Program discovery", "Conversion-focused layout"],
    link: "https://learncityacademy.com/",
    // github: "https://github.com/TosinISOGUN/learncity",
    problem:
      "Prospective learners need to understand program value quickly without getting lost in dense academy content.",
    result:
      "A polished education experience with clear hierarchy, responsive sections, and practical navigation across learning pages.",
  },
  {
    title: "Payflow",
    slug: "payflow",
    accent: "#2563EB",
    studio: "Payroll and compliance platform",
    tags: ["React", "Product Marketing UI", "Pricing Flow"],
    labels: ["Concept project", "Pricing page", "Mobile-friendly"],
    signals: ["Compliance messaging", "Platform storytelling", "Pricing clarity"],
    link: "https://payflow-rose-ten.vercel.app/",
    problem:
      "Payroll and compliance products can feel dense quickly, so the interface needed to communicate operational depth without overwhelming buyers.",
    result:
      "A polished HR/payroll product site with a premium landing page, platform storytelling, pricing surfaces, and responsive product presentation.",
  },
];

export const projectCaseStudies = [
  {
    slug: "velora-beauty",
    title: "Velora Beauty",
    eyebrow: "Beauty Brand Concept",
    role: "Design and development",
    liveUrl: "https://velorabeautyy.vercel.app",
    // githubUrl: "https://github.com/TosinISOGUN/velora_beauty",
    cover: veloraHome,
    summary: "Concept: online beauty shop with a routine builder and a bag.",
    challenge:
      "A concept project for a fictional beauty label aimed at adult women of many ages and skin tones. The site had to feel colour-forward and confident while keeping shopping simple. Velora is not a real brand.",
    approach:
      "I built fifteen pages: home, shop, three collections, six product pages, a routine builder, our story, a bag, checkout and contact. Every top-level page opens on a full-bleed photograph, and product packaging is drawn as shaded vector art that takes the colour of the selected shade.",
    outcome:
      "A complete demo storefront with a dark and a light theme. Prices, shades and policies are sample content: nothing is charged or shipped, and no form sends anything.",
    metrics: ["Concept project", "15 pages", "Shop and bag flow", "Dark and light themes"],
    decisions: [
      {
        label: "Photography First",
        value:
          "Each page opens on one large photograph and a short line of type, so the mood is clear before the visitor reads anything.",
      },
      {
        label: "Shade-aware Products",
        value:
          "Packaging is vector art that changes with the selected shade, so the product on screen matches the choice being made.",
      },
      {
        label: "Honest Demo",
        value:
          "The site says plainly that it is a concept: no reviews, no health claims, and no shade-matching promise.",
      },
    ],
    gallery: velouraScreens,
  },
  {
    slug: "hearthline-realty",
    title: "Hearthline Realty",
    eyebrow: "Real Estate Concept",
    role: "Design and development",
    liveUrl: "https://hearthlinerealty.vercel.app",
    // githubUrl: "https://github.com/TosinISOGUN/hearthline_realty",
    cover: hearthlineHome,
    summary: "Concept: real estate site with home search, a map and showing requests.",
    challenge:
      "A concept project for a fictional boutique brokerage in Raleigh. Buyers needed to find a home quickly, and sellers needed a clear way to get in touch. Hearthline is not a real brokerage.",
    approach:
      "I built eight pages plus a page for each sample home. Search filters by place, price, bedrooms, type and features, and keeps its state in the page address. Visitors can switch between a list and a map, open a photo gallery, save homes for the visit, and send a showing, valuation or contact request.",
    outcome:
      "A complete demo site. The homes, prices and agents are sample content, the map shows approximate areas only, and the forms send nothing.",
    metrics: ["Concept project", "Home search", "Map view", "Showing requests"],
    decisions: [
      {
        label: "Search You Can Share",
        value:
          "Filters apply instantly and live in the page address, so any search can be sent as a link and still work.",
      },
      {
        label: "Map On Request",
        value:
          "The map and its tiles load only when someone opens a map, which keeps the first load light.",
      },
      {
        label: "Honest Samples",
        value:
          "Every home is labelled as a sample listing, and the site invents no reviews, awards or statistics.",
      },
    ],
    gallery: hearthlineScreens,
  },
  {
    slug: "juniper-ember",
    title: "Juniper & Ember",
    eyebrow: "Restaurant Concept",
    role: "Design and development",
    liveUrl: "https://juniperandember.vercel.app/",
    // githubUrl: "https://github.com/TosinISOGUN/juniper_and_ember",
    cover: juniperHome,
    summary: "Concept: restaurant site with a menu, pickup ordering and reservations.",
    challenge:
      "A concept project for a fictional wood-fired restaurant in Austin. The site had to sell the mood on the first screen and still make the menu, ordering and booking easy to reach. Juniper & Ember is not a real restaurant.",
    approach:
      "I built nine pages: a tabbed menu, pickup ordering with a cart and a demo checkout, reservations, a gallery with a lightbox, and a dark and a cream theme. Every top-level page opens on a full-bleed photograph.",
    outcome:
      "A complete demo site. The address, hours, menu and prices are sample content, and nothing books a table or takes an order.",
    metrics: ["Concept project", "9 pages", "Pickup ordering", "Reservations"],
    decisions: [
      {
        label: "Mood First",
        value:
          "A large photograph and a short headline open each page, so visitors feel the place before they read the details.",
      },
      {
        label: "Booking That Follows The Hours",
        value:
          "Reservation times only offer what is served that day, so a visitor cannot pick a time the kitchen is closed.",
      },
      {
        label: "Light Motion",
        value:
          "Animation uses only movement and fade, and everything shows in its finished state for visitors who prefer reduced motion.",
      },
    ],
    gallery: juniperScreens,
  },
  {
    slug: "everwell",
    title: "Everwell",
    eyebrow: "Clinic Website Concept",
    role: "Design and development",
    liveUrl: "https://everwelldental.vercel.app",
    // githubUrl: "https://github.com/TosinISOGUN/everwell_dental",
    cover: everwellHome,
    summary: "Concept: clinic website with clear service pages and an easy contact form.",
    challenge:
      "A concept project for a fictional clinic in Charlotte. People choosing a practice need plain language, clear services and an easy way to get in touch. Everwell is not a real practice.",
    approach:
      "I built ten pages: home, a services overview with a page for each service, the practice, a page for new visitors, contact and a privacy notice. The wording avoids jargon, and the contact form is clearly marked as a demo.",
    outcome:
      "A complete demo site with sample details. The photographs are stock images, the team is fictional, and the form sends nothing.",
    metrics: ["Concept project", "10 pages", "Service pages", "Plain language"],
    decisions: [
      {
        label: "Plain Language",
        value:
          "Services are explained in short, everyday wording, so a visitor can understand each one without looking anything up.",
      },
      {
        label: "One Page Per Service",
        value:
          "Each service has its own page, so people can land on exactly what they searched for.",
      },
      {
        label: "Honest Demo",
        value:
          "No reviews, credentials, fees or compliance claims appear anywhere, and the site collects no health information.",
      },
    ],
    gallery: everwellScreens,
  },
  {
    slug: "gloria-may-byron",
    title: "Gloria May Byron",
    eyebrow: "Artist Website",
    role: "Design and development",
    liveUrl: "https://gloriamaybyron.vercel.app",
    cover: gloriaHome,
    summary: "Website for an independent singer and songwriter, with music, news and awards.",
    challenge:
      "An independent artist needed one place that shows her music, news, photos and awards, and makes it easy for people to book or contact her.",
    approach:
      "I rebuilt her site as seven pages: home, about, music, announcements, gallery, awards and contact. Every page opens on a full-bleed photograph, pages fade into each other, and the home page has a pinned statement whose words light up as you scroll.",
    outcome:
      "A fast, photography-led site with a light and a dark theme, built from her own words, credits and links. Platform and press logos keep their brand colours.",
    metrics: ["Artist website", "7 pages", "Light and dark themes", "Scroll-driven motion"],
    decisions: [
      {
        label: "Photography First",
        value:
          "Each page opens on a large photograph of her, so visitors meet the artist before they read a word.",
      },
      {
        label: "Her Own Content",
        value:
          "All copy, credits, awards, videos and links come from her own website, so nothing about her is invented.",
      },
      {
        label: "Motion That Respects Settings",
        value:
          "Scroll animation is done in CSS and shows its finished state for visitors who prefer reduced motion.",
      },
    ],
    gallery: gloriaScreens,
  },
  {
    slug: "open-school-field",
    title: "Open School Field",
    eyebrow: "Booking Platform",
    role: "Frontend Developer",
    liveUrl: "https://open-school-field-five.vercel.app",
    cover: tallFor("open-school-field", osf261),
    summary: "Facility booking platform for schools across Oyo State, in English and Yoruba.",
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
    gallery: withTall("open-school-field", openSchoolFieldScreens),
  },
  {
    slug: "oyobooking",
    title: "OYOBOOKING",
    eyebrow: "Public Booking",
    role: "Frontend Developer",
    liveUrl: "https://oyobooking.ng",
    // githubUrl: "https://github.com/TosinISOGUN/oyo_booking.com",
    cover: tallFor("oyobooking", oyo258),
    summary: "Public booking site where people find and reserve facilities online.",
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
    gallery: withTall("oyobooking", oyoBookingScreens),
  },
  {
    slug: "infinitative",
    title: "Infinitative",
    eyebrow: "Commerce Marketplace",
    role: "Frontend Developer",
    liveUrl: "https://infinitative-aft.vercel.app/",
    cover: tallFor("infinitative", infinitativeLanding),
    summary: "Multi-vendor marketplace with vendor pages and a cart.",
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
    gallery: withTall("infinitative", infinitativeScreens),
  },
  {
    slug: "payflow",
    title: "Payflow",
    eyebrow: "Payroll Platform",
    role: "Frontend Developer",
    liveUrl: "https://payflow-rose-ten.vercel.app/",
    cover: tallFor("payflow", payflowLanding),
    summary: "Concept: payroll platform website with a pricing flow.",
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
    gallery: withTall("payflow", payflowScreens),
  },
  {
    slug: "samsoni",
    title: "Samsoni",
    eyebrow: "Local Commerce",
    role: "Frontend Developer",
    liveUrl: "https://samsoni.vercel.app/",
    cover: tallFor("samsoni", samsoniLanding),
    summary: "Water delivery website for Lagos where customers order on WhatsApp.",
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
    gallery: withTall("samsoni", samsoniScreens),
  },
  {
    slug: "thomason",
    title: "Thomason",
    eyebrow: "Hospitality Website",
    role: "Frontend Developer",
    liveUrl: "https://thomason.vercel.app/",
    cover: tallFor("thomason", thomasonLanding),
    summary: "Hospitality website with full-bleed imagery and easy menu discovery.",
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
    gallery: withTall("thomason", thomasonScreens),
  },
  {
    slug: "c-homes",
    title: "C-HOMES",
    eyebrow: "CMS Marketplace",
    role: "Frontend Developer",
    liveUrl: "https://c-homes.vercel.app/",
    // githubUrl: "https://github.com/TosinISOGUN/c-homes",
    cover: tallFor("c-homes", cHomes274),
    summary: "Property listings site the owner can update without a developer.",
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
    gallery: withTall("c-homes", cHomesScreens),
  },
  {
    slug: "learncity",
    title: "Learncity",
    eyebrow: "Education Platform",
    role: "Frontend Developer",
    liveUrl: "https://learncityacademy.com/",
    // githubUrl: "https://github.com/TosinISOGUN/learncity",
    cover: tallFor("learncity", learncity278),
    summary: "Landing site for an education platform.",
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
    gallery: withTall("learncity", learncityScreens),
  },
  {
    slug: "nachie-maridadi",
    title: "Nachie Maridadi",
    eyebrow: "Commerce Landing",
    role: "Frontend Developer",
    liveUrl: "https://nachiemaridadi.vercel.app/",
    // githubUrl: "https://github.com/TosinISOGUN/nachie_maridadi",
    cover: tallFor("nachie-maridadi", nachie271),
    summary:
      "Online storefront for bespoke African fashion, with a clear book-a-consultation button.",
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
    gallery: withTall("nachie-maridadi", nachieScreens),
  },
];

// Hero sections: the first full-width landing screen of each project. The Work samples tab shows
// one hero per project first (in Case Studies order), then the extra hero variants, then the rest.
const showcaseFiles = import.meta.glob("../assets/product_showcase/*/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as ScreenshotModule;

const heroSources: Record<string, { folder: string; primary: string; extra?: string[] }> = {
  "velora-beauty": { folder: "velora-beauty", primary: "01-home.webp" },
  "hearthline-realty": { folder: "hearthline-realty", primary: "01-home.webp" },
  "juniper-ember": { folder: "juniper-ember", primary: "01-home.webp" },
  everwell: { folder: "everwell", primary: "01-home.webp" },
  "gloria-may-byron": { folder: "gloria-may-byron", primary: "01-home.webp" },
  "nachie-maridadi": { folder: "nachie maridadi", primary: "Screenshot (271).webp" },
  "open-school-field": {
    folder: "open school field",
    primary: "Screenshot (261).webp",
    extra: ["Screenshot (270).webp"],
  },
  infinitative: { folder: "infinitative", primary: "Screenshot 2026-09-11 121132.webp" },
  oyobooking: { folder: "oyobooking", primary: "Screenshot (258).webp" },
  payflow: { folder: "payflow", primary: "Screenshot (297).webp" },
  samsoni: {
    folder: "samsoni",
    primary: "Screenshot 2026-09-20 121521.webp",
    extra: ["Screenshot 2026-09-20 121514.webp", "Screenshot 2026-09-20 121550.webp"],
  },
  thomason: {
    folder: "thomason",
    primary: "Screenshot (306).webp",
    extra: ["Screenshot (307).webp", "Screenshot (308).webp"],
  },
  "c-homes": { folder: "c-homes", primary: "Screenshot (274).webp" },
  learncity: { folder: "learncity", primary: "Screenshot (278).webp" },
};

const heroRankByUrl = new Map<string, number>();
featuredProjects.forEach((project, order) => {
  const source = heroSources[project.slug];
  if (!source) return;

  const urlFor = (file: string) =>
    showcaseFiles[`../assets/product_showcase/${source.folder}/${file}`];

  const primary = urlFor(source.primary);
  if (primary) heroRankByUrl.set(primary, order);
  (source.extra ?? []).forEach((file, index) => {
    const url = urlFor(file);
    if (url) heroRankByUrl.set(url, 1000 + order * 10 + index);
  });
});

/** Lower rank = shown earlier. Undefined means the screenshot is not a hero section. */
export const getHeroRank = (src: string) => heroRankByUrl.get(src);
