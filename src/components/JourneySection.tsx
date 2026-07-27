import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Briefcase, GraduationCap } from "lucide-react";

const journey = [
  {
    type: "work" as const,
    title: "Founder & Product Engineer",
    org: "Isogun Labs",
    period: "2026 - Present",
    description:
      "Founded an independent software studio building small, focused apps for Atlassian and Jira. • Designed, built, and shipped Recap, a one-click Jira status-report app, from backend resolver logic to UI, now live on the Atlassian Marketplace. • Owned SEO, technical marketing, and go-to-market execution across the product's website and Marketplace listing.",
  },
  {
    type: "work" as const,
    title: "Frontend Web Developer",
    org: "AFT Solutions Limited",
    period: "July 2025 - Present",
    description:
      "Built and deployed responsive web interfaces for enterprise systems using React and TypeScript. • Developed scalable frontend features that improved critical path performance by 30%. • Optimized build pipelines and state management to ensure reliable deployments across government-scale projects.",
  },
  {
    type: "work" as const,
    title: "IT Support Intern",
    org: "Idea Konsult Limited",
    period: "June 2023 - December 2023",
    description:
      "Standardized software deployment for over 200 devices, reducing setup time by 40%. • Used remote tools to identify and fix network issues, reducing ticket resolution time by 25%. • Created internal documentation and protocols to improve system maintenance and efficiency.",
  },
  {
    type: "education" as const,
    title: "Back-end Focused Software Engineering",
    org: "ALX Holberton School of Software Engineering",
    period: "2022",
  },
  {
    type: "education" as const,
    title: "B.Sc. Computer Science",
    org: "Olusegun Agagu University of Science and Technology",
    period: "2018 - 2024",
  },
];

const JourneySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="My Journey" subtitle="Career & Education" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-10">
            {journey.map((entry, i) => {
              const Icon = entry.type === "work" ? Briefcase : GraduationCap;
              return (
                <motion.div
                  key={entry.org}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-6 top-1 w-5 h-5 rounded-full border-4 border-background shadow-md flex items-center justify-center ${
                      entry.type === "work" ? "bg-primary" : "bg-secondary"
                    }`}
                  />

                  <div className="skill-card">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{entry.title}</h3>
                        <p className="text-primary font-medium flex items-center gap-2">
                          <Icon size={14} />
                          {entry.org}
                        </p>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full whitespace-nowrap">
                        {entry.period}
                      </span>
                    </div>
                    {entry.description && (
                      <ul className="space-y-3">
                        {entry.description.split(" • ").filter(Boolean).map((bullet, idx) => (
                          <li key={idx} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
