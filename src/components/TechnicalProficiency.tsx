import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const technicalProficiency = [
  {
    category: "Core Technologies",
    description: "Building scalable systems that run quickly and efficiently.",
    items: ["React.js (v18+)", "TypeScript (Strict mode)", "JavaScript (ES6+)", "Vite"],
  },
  {
    category: "Frontend and UI",
    description: "Creating smooth, accessible, and high-quality user interfaces.",
    items: ["Tailwind CSS", "Shadcn UI", "Framer Motion", "Radix UI", "Responsive Design"],
  },
  {
    category: "Data and State",
    description: "Managing complex data and asynchronous application logic.",
    items: ["TanStack React Query", "Context API", "RESTful API Integration", "Middleware Architecture"],
  },
  {
    category: "Tools and Testing",
    description: "Ensuring software quality through testing and performance checks.",
    items: ["Vitest", "Playwright", "Git / GitHub", "Performance Auditing", "Vercel"],
  },
];

const TechnicalProficiency = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="section-padding bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Technical Proficiency" subtitle="The Stack" />

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {technicalProficiency.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 group"
            >
              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border group-hover:bg-foreground transition-colors duration-500" />
              <div className="absolute left-0 top-0 w-[4px] h-8 bg-foreground -translate-x-[1.5px] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:tracking-wide transition-all duration-300">
                  {group.category}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors cursor-default flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalProficiency;
