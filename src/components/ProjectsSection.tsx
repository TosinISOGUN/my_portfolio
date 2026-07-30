import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLink, Github, Store } from "lucide-react";
import recapLogo from "@/assets/recap-logo.svg";
import bPlanLogo from "@/assets/b-plan.png";
import oyoLogo from "@/assets/oyo-state-logo-card.png";
import aftLogo from "@/assets/aft-website-logo.png";
import lcLogo from "@/assets/LC_logo.png";
import chomesLogo from "@/assets/c-homes.svg";
import infinitativeLogo from "@/assets/infinitative.svg";
import shemtLogo from "@/assets/shemt-logo.png";
import cleanHomesLogo from "@/assets/clean-homes-logo.png";
import samsoniLogo from "@/assets/samsoni-logo.png";
import nachieMaridadiLogo from "@/assets/nachie_maridadi_favicon.png";

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
  },
];

const moreProjects = [
  {
    title: "Nachie Maridadi",
    description: "A bespoke African fashion atelier's digital storefront, showcasing tailored collections through interactive portfolio galleries with WhatsApp-integrated client consultations.",
    tags: ["React", "TypeScript", "Portfolio Gallery"],
    image: nachieMaridadiLogo,
    link: "https://nachiemaridadi.vercel.app/",
    github: "https://github.com/TosinISOGUN/nachie_maridadi",
  },
  {
    title: "Adaptive Future Tech",
    description: "Digital operating systems for government and enterprise transformation, built to run reliably across browsers under large datasets.",
    tags: ["React", "Vite", "Enterprise Software"],
    image: aftLogo,
    link: "https://www.adaptive-future.com/",
    github: "https://github.com/TosinISOGUN/adaptive_future_technologies",
  },
  {
    title: "Learncity",
    description: "An education platform for engineering and design students, built with Shadcn UI and Framer Motion for a fast, interactive learning experience.",
    tags: ["React", "TypeScript", "UI Design"],
    image: lcLogo,
    link: "https://learncityacademy.com/",
    github: "https://github.com/TosinISOGUN/learncity",
  },
  {
    title: "CleanHomes",
    description: "A professional service booking platform with an easy-to-use scheduling system and a fast checkout flow.",
    tags: ["React", "TypeScript", "Booking Logic"],
    image: cleanHomesLogo,
    link: "https://cleanhomes-iota.vercel.app/",
    github: "https://github.com/TosinISOGUN/cleanhomes",
  },
  {
    title: "Samsoni",
    description: "A subscription e-commerce store for hydration products, with a secure billing system and dynamic inventory management.",
    tags: ["React", "Subscription Model", "E-commerce"],
    image: samsoniLogo,
    link: "https://samsoni.vercel.app/",
    github: "https://github.com/TosinISOGUN/samsoni",
  },
  {
    title: "Infinitative",
    description: "A global e-commerce marketplace for electronics and fashion, with a high-performance search and filtering engine for large vendor catalogs.",
    tags: ["React", "TypeScript", "E-commerce"],
    image: infinitativeLogo,
    link: "https://infinitative-aft.vercel.app/",
    github: "https://github.com/TosinISOGUN/infinitative",
  },
  {
    title: "B-PLAN Consulting",
    description: "A strategic business platform for consultants, built to establish brand authority through a polished digital presence.",
    tags: ["React", "Brand Design", "Animations"],
    image: bPlanLogo,
    link: "https://b-plan-consulting.vercel.app/",
    github: "https://github.com/TosinISOGUN/B-PLAN-Consulting",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
              className="group skill-card overflow-hidden grid md:grid-cols-[300px_1fr]"
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

        {/* More Projects — compact grid */}
        <h3 className="text-sm font-mono tracking-wider uppercase text-muted-foreground mb-6">More Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
