import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    title: "Frameworks & Build Tools",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Vite", level: 90 },
      { name: "npm/pnpm/bun", level: 85 },
    ],
  },
  {
    title: "UI & Styling",
    skills: [
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 90 },
      { name: "Responsive Design", level: 95 },
      { name: "CSS-in-JS", level: 85 },
    ],
  },
  {
    title: "State & API",
    skills: [
      { name: "TanStack React Query", level: 90 },
      { name: "Context API", level: 90 },
      { name: "REST API Integration", level: 90 },
    ],
  },
  {
    title: "Quality & Testing",
    skills: [
      { name: "Vitest", level: 85 },
      { name: "Playwright", level: 80 },
      { name: "Component-Driven Dev", level: 90 },
    ],
  },
  {
    title: "Platform & Tools",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "Vercel", level: 90 },
      { name: "Figma-to-Code", level: 85 },
    ],
  },
];

const SkillTag = ({ name, delay }: { name: string; delay: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
      className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-secondary/30 text-foreground text-sm font-medium transition-colors hover:border-primary/50"
    >
      {name}
    </motion.span>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Skills & Technologies" subtitle="My Toolbox" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="skill-card p-6"
            >
              <h3 className="text-sm font-mono tracking-[0.15em] uppercase text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <SkillTag
                    key={skill.name}
                    name={skill.name}
                    delay={0.2 + i * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
