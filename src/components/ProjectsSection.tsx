import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLink, Github, Globe } from "lucide-react";
import bPlanLogo from "@/assets/b-plan.png";
import oyoLogo from "@/assets/oyo-state-logo.png";
import aftLogo from "@/assets/aft-website-logo.png";
import lcLogo from "@/assets/LC_logo.png";

const projects = [
  {
    title: "Learncity",
    description: "A premium tech education platform offering career-focused programs in Software Engineering, Product Design, and Data Science, designed to empower the next generation of tech talent.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI", "Vite"],
    image: lcLogo,
    link: "https://learncity-aft.vercel.app/",
    github: "https://github.com/TosinISOGUN/learncity",
    color: "from-[hsl(180,70%,45%)] to-[hsl(200,80%,50%)]",
  },
  {
    title: "B-PLAN Consulting",
    description: "A strategic consulting firm delivering transformative business solutions and operational excellence to help organizations reach their full potential.",
    tags: ["React", "Vite", "Framer Motion", "TypeScript"],
    image: bPlanLogo,
    link: "https://b-plan-consulting.vercel.app/",
    github: "https://github.com/TosinISOGUN/B-PLAN-Consulting",
    color: "from-[hsl(180,70%,45%)] to-[hsl(200,80%,50%)]",
  },
  {
    title: "OYOBOOKING.COM",
    description: "A digital hospitality platform designed for Oyo State, providing a seamless hotel booking experience with local accessibility and efficiency.",
    tags: ["React", "Vite", "Tailwind CSS", "Vercel"],
    image: oyoLogo,
    link: "https://oyo-booking-black.vercel.app/",
    github: "https://github.com/TosinISOGUN/oyo_booking.com",
    color: "from-[hsl(25,90%,55%)] to-[hsl(45,80%,60%)]",
  },
  {
    title: "Adaptive Future Technology",
    description: "Engineering Digital Operating Systems for governments and enterprises across emerging African markets to drive digital transformation.",
    tags: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    image: aftLogo,
    link: "https://www.adaptive-future.com/",
    github: "https://github.com/TosinISOGUN/adaptive_future_technologies",
    color: "from-[hsl(210,90%,55%)] to-[hsl(250,80%,60%)]",
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
