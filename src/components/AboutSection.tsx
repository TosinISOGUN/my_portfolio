import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Database, Layout, ShieldCheck, Zap } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Professional Background" subtitle="About" />

        <div className="grid lg:grid-cols-1 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p className="text-foreground font-medium text-xl leading-snug">
                I am a results-oriented Frontend Engineer who builds reliable web applications that are fast and easy to maintain.
              </p>
              <p>
                I enjoy solving technical challenges that involve data and user experience. I build reliable systems that turn business requirements into high-quality digital products, ensuring that every interaction is purposeful and every component works well at scale.
              </p>
              <p>
                I value technical excellence and efficiency. I use my experience with React and TypeScript to build interfaces that look professional and work perfectly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
