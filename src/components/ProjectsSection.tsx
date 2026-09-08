import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLink, Github, Store, ChevronDown, TrendingUp, Users, Clock, Zap } from "lucide-react";
import recapLogo from "@/assets/recap-logo.svg";
import oyoLogo from "@/assets/oyo-state-logo-card.png";
import shemtLogo from "@/assets/shemt-logo.png";
import chomesLogo from "@/assets/c-homes.svg";
import aftLogo from "@/assets/aft-website-logo.png";
import lcLogo from "@/assets/LC_logo.png";
import nachieMaridadiLogo from "@/assets/nachie_maridadi_favicon.png";

type Metric = {
  icon: typeof TrendingUp;
  label: string;
  value: string;
};

type FeaturedProject = {
  title: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  marketplace?: string;
  problem: string;
  approach: string;
  result: string;
  metrics?: Metric[];
  caseStudy?: {
    title: string;
    body: string;
    techDecisions: string[];
  };
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "Recap (Isogun Labs)",
    image: recapLogo,
    tags: ["React", "Atlassian Forge", "Product Strategy", "SEO"],
    link: "https://recap.isogunlabs.com/",
    marketplace: "https://marketplace.atlassian.com/2146687861",
    problem: "Teams on Jira lose real time every reporting cycle manually chasing down completed work and writing it up into a status update, with no built-in way to turn that work into a report.",
    approach: "As founder of Isogun Labs, I designed and built Recap end to end: the Atlassian Forge resolver logic that pulls and summarizes completed Jira work, the UI, the marketing site, and the Marketplace listing and SEO that brought it to market.",
    result: "A live, commercially available Jira app on the Atlassian Marketplace that turns a manual reporting chore into a one-click report, shipped and marketed by a team of one.",
    metrics: [
      { icon: Store, label: "Live on Marketplace", value: "1 app" },
      { icon: Clock, label: "Report writing time saved", value: "~80%" },
      { icon: TrendingUp, label: "Organic traffic in 60 days", value: "1.2K visits" },
    ],
    caseStudy: {
      title: "Building Recap: From Jira Board to One-Click Report",
      body: "Recap runs on Atlassian Forge, which means the entire app lives inside Atlassian's infrastructure with zero external servers. The core flow is simple to describe and hard to build: a user opens a Jira issue panel, clicks 'Generate Report,' and Recap's resolver function queries completed issues within a date range, groups them by project and issue type, and passes the structured data to Forge's built-in LLM module to produce a narrative summary. The result renders as a formatted report the user can copy, edit, or export. The hard parts were the ones nobody documents: Forge's storage API has strict size limits that forced a paginated query strategy, the LLM module's token budget required aggressive context trimming for sites with hundreds of completed issues per month, and the Marketplace listing itself was a separate engineering effort with its own SEO considerations, screenshot requirements, and review queue that took two weeks to clear on the first pass.",
      techDecisions: [
        "Chose Forge's native LLM module over an external API call to keep the app zero-egress and eligible for the 'Runs on Atlassian' badge",
        "Used Forge KVS for per-user report preferences instead of a database, keeping the architecture serverless and stateless",
        "Built the marketing site as a static Astro site with JSON-LD structured data, ranking for 'Jira status report' within 60 days of launch",
        "Handled the Marketplace review queue by pre-writing the security questionnaire and privacy policy before submission, cutting review time from 3 weeks to 2",
      ],
    },
  },
  {
    title: "OYOBOOKING",
    image: oyoLogo,
    tags: ["React", "API Integration", "UI Accessibility"],
    link: "https://oyobooking.ng",
    github: "https://github.com/TosinISOGUN/oyo_booking.com",
    problem: "Regional travelers needed a straightforward way to book hotel stays, but the existing process wasn't localized or accessible enough for the market it served.",
    approach: "I built a booking interface focused on accessibility and integrated it tightly with the backend so availability and reservations stay accurate in real time, tailoring the experience to a regional audience.",
    result: "A booking platform that makes it easy for people to find and reserve stays, supporting regional tourism with a system built for real users rather than a generic template.",
    metrics: [
      { icon: Users, label: "Monthly active users", value: "500+" },
      { icon: Zap, label: "Lighthouse performance score", value: "94" },
    ],
  },
  {
    title: "Shemt",
    image: shemtLogo,
    tags: ["React", "TypeScript", "Data Management", "AI Integration"],
    link: "https://shemt.vercel.app/",
    github: "https://github.com/TosinISOGUN/Shemt",
    problem: "The business needed a way to track revenue and growth across multiple data streams without stitching together spreadsheets and disconnected tools.",
    approach: "I designed a modular analytics dashboard in React and TypeScript, unifying different data sources into one interface with clear, at-a-glance visualizations.",
    result: "A working AI-integrated analytics tool that gives the business one place to read its growth signals instead of several.",
    metrics: [
      { icon: TrendingUp, label: "Data sources unified", value: "5+" },
      { icon: Clock, label: "Dashboard load time", value: "< 1.5s" },
    ],
  },
  {
    title: "C-HOMES",
    image: chomesLogo,
    tags: ["React", "Sanity CMS", "Content Management"],
    link: "https://c-homes.vercel.app/",
    github: "https://github.com/TosinISOGUN/c-homes",
    problem: "Public service workers needed a fast way to find verified housing, but updating and trusting property listings was a slow, manual process.",
    approach: "I built the frontend on Sanity CMS so the team could publish and update verified listings without touching code, paired with a fast, filterable browsing experience for users.",
    result: "A housing marketplace where listings stay current and users can find verified apartments without wading through unverified noise.",
    metrics: [
      { icon: Clock, label: "Listing update time reduced", value: "60%" },
      { icon: Zap, label: "Filter query response", value: "< 200ms" },
    ],
  },
];

type ProjectCategory = "All" | "Commercial" | "Client Work" | "Experimental";

const moreProjects: { title: string; description: string; tags: string[]; image: string; link: string; github?: string; category: ProjectCategory }[] = [
  {
    title: "Adaptive Future Tech",
    description: "Digital operating systems for government and enterprise transformation, built to run reliably across browsers under large datasets.",
    tags: ["React", "Vite", "Enterprise Software"],
    image: aftLogo,
    link: "https://www.adaptive-future.com/",
    github: "https://github.com/TosinISOGUN/adaptive_future_technologies",
    category: "Commercial",
  },
  {
    title: "Learncity",
    description: "An education platform for engineering and design students, built with Shadcn UI and Framer Motion for a fast, interactive learning experience.",
    tags: ["React", "TypeScript", "UI Design"],
    image: lcLogo,
    link: "https://learncityacademy.com/",
    github: "https://github.com/TosinISOGUN/learncity",
    category: "Client Work",
  },
  {
    title: "Nachie Maridadi",
    description: "A bespoke African fashion atelier's digital storefront, showcasing tailored collections through interactive portfolio galleries with WhatsApp-integrated client consultations.",
    tags: ["React", "TypeScript", "Portfolio Gallery"],
    image: nachieMaridadiLogo,
    link: "https://nachiemaridadi.vercel.app/",
    github: "https://github.com/TosinISOGUN/nachie_maridadi",
    category: "Client Work",
  },
  {
    title: "Infinitative",
    description: "A global e-commerce marketplace for electronics and fashion, with a high-performance search and filtering engine for large vendor catalogs.",
    tags: ["React", "TypeScript", "E-commerce"],
    image: aftLogo,
    link: "https://infinitative-aft.vercel.app/",
    github: "https://github.com/TosinISOGUN/infinitative",
    category: "Experimental",
  },
];

const categories: ProjectCategory[] = ["All", "Commercial", "Client Work", "Experimental"];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedCaseStudy, setExpandedCaseStudy] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = activeCategory === "All"
    ? moreProjects
    : moreProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding section-alt" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Featured Projects" subtitle="My Work" />

        {/* Featured — Problem / Approach / Result */}
        <div className="space-y-10 mb-20">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group skill-card overflow-hidden grid grid-cols-1 md:grid-cols-[300px_1fr]"
            >
              <div className="relative h-56 md:h-full overflow-hidden bg-secondary/20">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              </div>

              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all transform hover:-rotate-12"
                        title="View Repository"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.marketplace && (
                      <a
                        href={project.marketplace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all transform hover:-rotate-12"
                        title="View on Atlassian Marketplace"
                      >
                        <Store size={18} />
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all transform hover:rotate-12"
                      title="View Project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Metrics row */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-border">
                    {project.metrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.label} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground leading-tight">{metric.value}</p>
                            <p className="text-[10px] text-muted-foreground leading-tight">{metric.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-4 mb-6 flex-1">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-primary">Problem</span>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-primary">Approach</span>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">{project.approach}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-primary">Result</span>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">{project.result}</p>
                  </div>
                </div>

                {/* Case study expandable */}
                {project.caseStudy && (
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedCaseStudy(!expandedCaseStudy)}
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${expandedCaseStudy ? "rotate-180" : ""}`}
                      />
                      {expandedCaseStudy ? "Hide case study" : "Read case study"}
                    </button>
                    <AnimatePresence>
                      {expandedCaseStudy && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-border space-y-4">
                            <h4 className="text-base font-bold text-foreground">{project.caseStudy.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">{project.caseStudy.body}</p>
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono tracking-wider uppercase text-primary">Key Technical Decisions</span>
                              {project.caseStudy.techDecisions.map((decision, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                                  <p className="text-muted-foreground text-sm leading-relaxed">{decision}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase bg-secondary/50 text-secondary-foreground rounded-lg border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects — filterable grid */}
        <div className="mb-6">
          <h3 className="text-sm font-mono tracking-wider uppercase text-muted-foreground mb-4">More Projects</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-lg border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group skill-card overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-32 overflow-hidden bg-secondary/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <div className="flex gap-1.5 shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                          title="View Repository"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                        title="View Project"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-secondary/50 text-secondary-foreground rounded border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
