import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealSectionProps = {
  id?: string;
  className: string;
  children: ReactNode;
};

export function RevealSection({ id, className, children }: RevealSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.04, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.section>
  );
}
