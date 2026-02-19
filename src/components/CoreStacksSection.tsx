import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const coreStacks = [
  { category: "Main Frontend Stack", items: ["React.js (v18/v19)", "TypeScript", "Vite"] },
  { category: "Modular UI System", items: ["Tailwind CSS", "Shadcn UI", "Radix UI"] },
  { category: "Dynamic UX Layer", items: ["Framer Motion", "Embla Carousel", "Swiper.js"] },
  { category: "Robust Data Architecture", items: ["TanStack React Query", "React Hook Form", "Zod"] },
  { category: "Engineering Excellence", items: ["Vitest", "React Testing Library", "ESLint", "Prettier"] },
  { category: "Full-Cycle DevOps", items: ["Vercel", "GitHub Pages", "GitHub Actions (CI/CD)"] },
];

const CoreStacksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stacks" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Signature Technologies" subtitle="Core Stacks" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreStacks.map((stack, i) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="skill-card group"
            >
              <h3 className="font-semibold text-primary text-sm font-mono tracking-wide mb-4 uppercase">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md border border-border transition-colors duration-200 group-hover:border-primary/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreStacksSection;
