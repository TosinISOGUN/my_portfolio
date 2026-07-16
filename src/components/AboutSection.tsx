import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Building2, Database, Layout, Zap } from "lucide-react";

const focusAreas = [
  {
    icon: Building2,
    title: "Enterprise & Government-Scale Systems",
    description: "Frontends built to stay reliable under real organizational weight, not just a demo.",
  },
  {
    icon: Database,
    title: "Data-Dense Dashboards & AI Interfaces",
    description: "Turning complex, fast-changing data into views people can read at a glance.",
  },
  {
    icon: Layout,
    title: "CMS & Content-Driven Platforms",
    description: "Structuring content models so non-technical teams can update sites without breaking them.",
  },
  {
    icon: Zap,
    title: "Performance-First React Engineering",
    description: "Interfaces that stay fast and maintainable as the codebase and the team grow.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Professional Background" subtitle="About" />

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p className="text-foreground font-medium text-xl leading-snug">
                I'm a Frontend Engineer who spends most of my time turning dense, business-critical
                data into interfaces people can actually use — from government transformation
                platforms to AI-powered dashboards.
              </p>
              <p>
                My work spans enterprise and government software at AFT Solutions, CMS-driven
                property marketplaces, subscription e-commerce, and regional booking platforms —
                each with its own constraints around data volume, reliability, and edge cases that
                don't show up in a design file.
              </p>
              <p>
                I build with React and TypeScript, favor systems that stay maintainable as they
                grow, and care as much about how an interface performs under real data as how it
                looks in a mockup.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="space-y-4"
          >
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                className="skill-card flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <area.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{area.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
