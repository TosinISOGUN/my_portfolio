import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-16"
    >
      <p className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">{subtitle}</p>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
        {title}
      </h2>
      <div className="mt-4 w-16 h-0.5 bg-primary rounded" />
    </motion.div>
  );
};

export default SectionHeading;
