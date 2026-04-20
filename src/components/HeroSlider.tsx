import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import profilePic from "@/assets/profile-pic.jpg";
import { ArrowRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "./ui/button";
import resumePdf from "@/assets/Resume_Oluwatomisin_Isogun.pdf";

const HeroSlider = () => {
  return (
    <section id="home" className="relative min-h-screen lg:h-screen lg:min-h-[600px] w-full flex items-center justify-center bg-background pt-24 lg:pt-0 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[5%] -left-[5%] w-[40%] h-[40%] rounded-full bg-foreground/5 blur-[100px]" />
        <div className="absolute -bottom-[5%] -right-[5%] w-[40%] h-[40%] rounded-full bg-foreground/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8">
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
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/30 text-muted-foreground text-[10px] font-mono tracking-wider uppercase w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for New Projects
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              Building <span className="text-muted-foreground/50 text-stroke-sm">scalable</span> web applications that are <span className="italic">clean and reliable.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              I build high-performance frontend systems that connect complex data with easy-to-use interfaces.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-bold px-7 h-11 transition-all hover:translate-y-[-2px] active:translate-y-0"
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
                <a href={resumePdf} download="Oluwatomisin_Isogun_Resume.pdf">
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

          {/* Profile Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-[340px] md:max-w-[380px] lg:max-w-[420px] aspect-square">
              {/* Abstract decorative frame */}
              <div className="absolute -inset-4 border border-foreground/10 rounded-2xl rotate-3 pointer-events-none transition-transform duration-700 group-hover:rotate-6" />
              <div className="absolute -inset-4 border border-foreground/5 rounded-2xl -rotate-3 pointer-events-none transition-transform duration-700 group-hover:-rotate-6" />
              
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-border shadow-2xl bg-secondary/20 group cursor-pointer">
                <img
                  src={profilePic}
                  alt="Oluwatomisin Isogun"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              {/* Accent elements */}
              <div className="absolute -bottom-2 -left-2 md:-bottom-6 md:-left-6 bg-card border border-border p-3 rounded-xl shadow-xl z-20 -rotate-6 -skew-x-3 transition-transform duration-500 hover:rotate-0 hover:skew-x-0 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center text-foreground font-bold text-sm">
                    2+
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-extrabold">Years of</p>
                    <p className="text-xs font-bold font-mono">Expertise</p>
                  </div>
                </div>
              </div>
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
