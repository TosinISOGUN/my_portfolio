import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Rocket, Building2, Database, Zap } from "lucide-react";

const focusAreas = [
  {
    icon: Rocket,
    title: "Full-Loop Product Ownership",
    description: "Code, SEO, security questionnaires, Marketplace listings, and go-to-market. I ship products, not just components.",
  },
  {
    icon: Building2,
    title: "Enterprise-Scale Frontend",
    description: "Government and enterprise interfaces at AFT Solutions, built to stay reliable under real organizational load.",
  },
  {
    icon: Database,
    title: "Data-Dense Interfaces",
    description: "Analytics dashboards, booking systems, and CMS-driven marketplaces where the hard part is the data, not the styling.",
  },
  {
    icon: Zap,
    title: "Performance-First Engineering",
    description: "Lighthouse 90+ scores, sub-200ms filter queries, and code splitting that keeps large React apps fast.",
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
                Most frontend engineers write components. I shipped a commercial app to the
                Atlassian Marketplace as a team of one, from the React UI to the backend
                resolver logic, the SEO strategy, the security questionnaire, and the
                go-to-market plan.
              </p>
              <p>
                That's Isogun Labs, my independent software studio. Recap, the first product,
                is live on the Atlassian Marketplace right now. I wrote every line of its
                frontend, designed the Forge resolver architecture, built the marketing site
                with structured data that ranks organically, and cleared the Marketplace
                review process including the security questionnaire on the first pass.
              </p>
              <p>
                Alongside the studio, I work as a Frontend/Product Engineer at AFT Solutions,
                building enterprise and government software that has to stay reliable under
                real organizational weight. That means React and TypeScript at scale, build
                pipelines that don't break, and interfaces that handle more data than a design
                file ever shows. The combination of shipping my own products and building for
                enterprise clients is what I bring to a team: the craft of a product engineer
                with the discipline of someone who knows what happens when things break in
                production.
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
