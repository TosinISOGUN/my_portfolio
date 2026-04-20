import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLink, Github, Globe } from "lucide-react";
import bPlanLogo from "@/assets/b-plan.png";
import oyoLogo from "@/assets/oyo-state-logo.png";
import aftLogo from "@/assets/aft-website-logo.png";
import lcLogo from "@/assets/LC_logo.png";
import chomesLogo from "@/assets/c-homes.svg";
import infinitativeLogo from "@/assets/infinitative.svg";
import shemtLogo from "@/assets/shemt-logo.png";
import cleanHomesLogo from "@/assets/clean-homes-logo.png";
import samsoniLogo from "@/assets/samsoni-logo.png";

const projects = [
  {
    title: "Shemt",
    description: "An AI analytics dashboard for tracking business revenue and growth. I built a modular system using React and TypeScript to handle various data streams and display them in a clear, unified dashboard.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Data Management", "AI Integration"],
    image: shemtLogo,
    link: "https://shemt.vercel.app/",
    github: "https://github.com/TosinISOGUN/Shemt",
    color: "from-neutral-900 to-neutral-800",
  },
  {
    title: "Adaptive Future Tech",
    description: "Digital operating systems for government and enterprise transformation. I built a frontend that works reliably across different browsers and handles large datasets efficiently for complex business software.",
    tags: ["React", "Vite", "Tailwind CSS", "Enterprise Software"],
    image: aftLogo,
    link: "https://www.adaptive-future.com/",
    github: "https://github.com/TosinISOGUN/adaptive_future_technologies",
    color: "from-neutral-950 to-neutral-900",
  },
  {
    title: "Learncity",
    description: "An education platform for engineering and design students. I created a fast, interactive learning interface using Shadcn UI and Framer Motion, making it easy for students to track their progress.",
    tags: ["React", "TypeScript", "UI Design", "State Management"],
    image: lcLogo,
    link: "https://learncityacademy.com/",
    github: "https://github.com/TosinISOGUN/learncity",
    color: "from-neutral-800 to-neutral-700",
  },
  {
    title: "CleanHomes",
    description: "A professional service booking platform. I built an easy-to-use scheduling system and a fast checkout process to improve the booking experience and reliability for customers.",
    tags: ["React", "TypeScript", "Booking Logic", "Performance"],
    image: cleanHomesLogo,
    link: "https://cleanhomes-iota.vercel.app/",
    github: "https://github.com/TosinISOGUN/cleanhomes",
    color: "from-neutral-700 to-neutral-600",
  },
  {
    title: "Samsoni",
    description: "An e-commerce store with a subscription model for hydration products. I built a secure billing system and a dynamic inventory manager to help the business run smoothly and keep customers coming back.",
    tags: ["React", "Subscription Model", "E-commerce"],
    image: samsoniLogo,
    link: "https://samsoni.vercel.app/",
    github: "https://github.com/TosinISOGUN/samsoni",
    color: "from-neutral-600 to-neutral-500",
  },
  {
    title: "C-HOMES",
    description: "A verified housing marketplace for public service workers. I used Sanity CMS to build a fast system for updating property listings and helping users find verified apartments quickly.",
    tags: ["React", "Sanity CMS", "Content Management", "UI Layout"],
    image: chomesLogo,
    link: "https://c-homes.vercel.app/",
    github: "https://github.com/TosinISOGUN/c-homes",
    color: "from-neutral-500 to-neutral-400",
  },
  {
    title: "Infinitative",
    description: "A global e-commerce marketplace for electronics and fashion. I built a high-performance search and filtering engine so customers can easily find products in large vendor catalogs.",
    tags: ["React", "TypeScript", "Performance", "E-commerce"],
    image: infinitativeLogo,
    link: "https://infinitative-aft.vercel.app/",
    github: "https://github.com/TosinISOGUN/infinitative",
    color: "from-neutral-400 to-neutral-300",
  },
  {
    title: "B-PLAN Consulting",
    description: "A strategic business platform for consultants. I created a professional digital presence with smooth animations to help build brand authority and showcase the firm's consulting services.",
    tags: ["React", "Brand Design", "Animations"],
    image: bPlanLogo,
    link: "https://b-plan-consulting.vercel.app/",
    github: "https://github.com/TosinISOGUN/B-PLAN-Consulting",
    color: "from-neutral-300 to-neutral-200",
  },
  {
    title: "OYOBOOKING",
    description: "A regional hotel booking platform. I built a localized system that is easy to use and integrates effectively with the backend to help people book stays and support regional tourism.",
    tags: ["React", "API Integration", "UI Accessibility"],
    image: oyoLogo,
    link: "https://oyo-booking-black.vercel.app/",
    github: "https://github.com/TosinISOGUN/oyo_booking.com",
    color: "from-neutral-200 to-neutral-100",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding section-alt" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Featured Projects" subtitle="My Work" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
                className="group skill-card overflow-hidden h-full flex flex-col"
              >
                {/* Project Image Header */}
                <div className="relative h-48 overflow-hidden bg-secondary/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-10 transition-opacity`} />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all transform hover:-rotate-12"
                          title="View Repository"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all transform hover:rotate-12"
                        title="View Project"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
