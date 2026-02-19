import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Briefcase } from "lucide-react";

const education = [
  {
    school: "Olusegun Agagu University of Science and Technology",
    period: "2018 - 2024",
    type: "B.Sc. Computer Science",
  },
  {
    school: "ALX Holberton School of Software Engineering",
    period: "2022",
    type: "Back-end focused Software Engineering",
  },
];

const experiences = [
  {
    title: "Frontend Web Developer",
    company: "AFT Solutions Limited",
    period: "July 2025 - Present",
    description:
      "Developing responsive, user-focused web interfaces using modern technologies like React, Tailwind, and TypeScript. • Collaborating with design teams to transform high-fidelity mockups into fluid, pixel-perfect user experiences. • Optimizing web applications for maximum performance, accessibility, and cross-browser compatibility.",
  },
  {
    title: "IT Support Intern",
    company: "Idea Konsult Limited",
    period: "June 2023 - December 2023",
    description:
      "Provided comprehensive technical support to 200+ clients, resolving complex software and OS issues with high efficiency. • Streamlined device deployment by installing and configuring standardized software environments across multiple platforms. • Leveraged remote diagnostic tools to troubleshoot network and system bottlenecks, significantly reducing average resolution time.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Work Experience" subtitle="Career" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md" />

                <div className="skill-card">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium flex items-center gap-2">
                        <Briefcase size={14} />
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.split(' • ').filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
