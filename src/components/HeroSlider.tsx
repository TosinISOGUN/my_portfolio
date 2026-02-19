import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import { ChevronDown, Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2070",
    subtitle: "Hello, I'm",
    title: "Oluwatomisin Isogun",
    role: "Frontend Web Developer",
  },
  {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2069",
    subtitle: "I Craft",
    title: "Fluid & Interactive UX",
    role: "React · TypeScript · Framer Motion",
  },
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
    subtitle: "Building",
    title: "Scalable Web Apps",
    role: "Vite · Tailwind · TanStack Query",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <p className="mb-4 text-sm md:text-base font-mono tracking-[0.4em] uppercase text-primary font-bold">
              {slides[current].subtitle}
            </p>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-black mb-6 text-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] leading-[1]">
              {slides[current].title}
            </h1>
            <p className="text-xl md:text-3xl lg:text-4xl text-white/90 font-medium tracking-wide drop-shadow-md mb-10">
              {slides[current].role}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 h-11 text-base rounded-lg shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                View my Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="bg-background/20 backdrop-blur-md border-white/20 hover:bg-white/10 text-white font-bold px-6 h-11 text-base rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                Get in Touch
              </Button>
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 font-bold px-6 h-11 text-base rounded-lg transition-all"
              >
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://github.com/TosinISOGUN"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-white/60 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={28} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/oluwatomisin-isogun-a38740356/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-white/60 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={28} />
              </motion.a>
              <motion.a
                href="mailto:oluwatomisinisogun@gmail.com"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-white/60 hover:text-white transition-colors"
                title="Email"
              >
                <Mail size={28} />
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current
              ? "bg-primary glow-dot scale-110"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
          />
        ))}
      </div>

      {/* Scroll down indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
};

export default HeroSlider;
