import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import profilePic from "@/assets/profile-pic.png";
import { ArrowRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "./ui/button";
import resumePdf from "@/assets/Oluwatomisin_Isogun_CV.pdf";

const HeroSlider = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const scrollDrift = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const driftX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const driftY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen lg:min-h-screen w-full flex items-center justify-center bg-background pt-24 lg:pt-0 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[5%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-[5%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-10 items-center py-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col gap-1 mb-6"
            >
              <span className="text-sm md:text-base font-bold tracking-tight text-foreground/80 uppercase">Oluwatomisin Isogun</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://isogunlabs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono tracking-wider uppercase w-fit hover:bg-primary/20 transition-colors"
                >
                  Founder, Isogun Labs
                </a>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/30 text-muted-foreground text-[10px] font-mono tracking-wider uppercase w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Available for New Projects
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              I build <span className="text-primary">frontend systems</span>, and ship real products that people actually <span className="italic">use.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Founder of Isogun Labs, where I shipped Recap, a status-report app now live on the Atlassian Marketplace. As a Frontend/Product Engineer, I turn dense data and demanding requirements into interfaces that feel effortless to use, from enterprise dashboards to AI-driven tools.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-7 h-11 transition-all hover:translate-y-[-2px] active:translate-y-0"
              >
                View Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background text-foreground font-bold px-7 h-11 transition-all hover:translate-y-[-2px] active:translate-y-0 shadow-sm"
              >
                <a href={resumePdf} download="Oluwatomisin_Isogun_CV.pdf">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Professional Links */}
            <div className="flex items-center gap-5">
              {[
                { icon: Github, href: "https://github.com/TosinISOGUN", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/oluwatomisin-isogun-a38740356/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:oluwatomisinisogun@gmail.com", label: "Email" }
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-muted-foreground/70 hover:text-foreground transition-all duration-300 transform hover:scale-110"
                  title={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Profile Image — floating parallax cutout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: scrollDrift }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[460px] md:max-w-[600px] lg:max-w-[720px] aspect-square [perspective:1000px]"
            >
              {/* Ambient glow grounding the figure */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[45%] rounded-full bg-primary/30 blur-[70px]" />

              <motion.div
                style={{ rotateX, rotateY, x: driftX, y: driftY }}
                className="relative w-full h-full [transform-style:preserve-3d]"
              >
                <img
                  src={profilePic}
                  alt="Oluwatomisin Isogun"
                  className="relative z-10 w-full h-full object-cover rounded-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                style={{ x: driftX, y: driftY }}
                className="absolute bottom-4 -left-2 md:bottom-8 md:-left-6 bg-card/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl z-20 -rotate-6 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    4+
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-extrabold">Years of</p>
                    <p className="text-xs font-bold font-mono">Expertise</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/20 hidden lg:block"
      >
        <div className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSlider;
