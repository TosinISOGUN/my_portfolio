import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Code2, Sparkles, Zap, GraduationCap } from "lucide-react";
import myPhoto from "@/assets/my-photo.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Code2, label: "Clean Code", desc: "TypeScript-first architecture" },
    { icon: Sparkles, label: "Fluid UX", desc: "Framer Motion animations" },
    { icon: Zap, label: "Performance", desc: "Optimized React patterns" },
  ];

  return (
    <section id="about" className="section-padding section-alt" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-[hsl(300,70%,60%)] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={myPhoto}
                alt="Oluwatomisin Isogun"
                loading="lazy"
                className="relative rounded-full w-full aspect-square object-cover shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <p className="text-secondary-foreground leading-relaxed mb-6 text-xl">
              I'm <span className="text-primary font-bold">Oluwatomisin Isogun</span>, a Computer Science graduate and Frontend Engineer.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                My journey started with a curiosity for how websites work, which led me to study Computer Science. Today, I focus on creating digital experiences that aren't just functional, but feel "alive" through smooth interactions and thoughtful design.
              </p>
              <p>
                I don't just write code; I solve problems. Whether it's making a site faster, ensuring it works perfectly on your phone, or bringing a complex idea to life with React and TypeScript, I'm always up for the challenge.
              </p>
              <p>
                When I'm not at my desk, I'm likely exploring new tools or thinking about how to make my next project even better than the last one.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid sm:grid-cols-3 gap-6 mt-16"
        >
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="skill-card flex flex-col items-center text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
