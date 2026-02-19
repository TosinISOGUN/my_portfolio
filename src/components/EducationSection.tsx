import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { GraduationCap } from "lucide-react";

const education = [
  {
    school: "Olusegun Agagu University of Science and Technology",
    period: "2018 - 2024",
    type: "Computer Science",
  },
  {
    school: "ALX Holberton School of Software Engineering",
    period: "2022",
    type: "Software Engineering",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding section-alt" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Education" subtitle="Learning" />

        <div className="grid sm:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="skill-card text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">{edu.school}</h3>
              <p className="text-primary font-medium text-sm mb-1">{edu.type}</p>
              <p className="text-muted-foreground text-sm font-mono">{edu.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
