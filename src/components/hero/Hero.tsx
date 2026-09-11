import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroNavigation } from "./HeroNavigation";
import { HeroText } from "./HeroText";
import { HeroScrollScene } from "./HeroScrollScene";
import { parallax } from "./animationTimeline";

/** Walk-distance multiplier per breakpoint, so small screens travel less. */
function useTravelFactor() {
  const [travel, setTravel] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setTravel(w < 640 ? 0.5 : w < 1024 ? 0.7 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return travel;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const reducedMotion = prefersReduced === true;
  const travel = useTravelFactor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth, fully reversible scroll progress - no autoplay, no loop.
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 34,
    mass: 0.65,
    restDelta: 0.0005,
  });

  const textY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : [`${parallax.text[0]}%`, `${parallax.text[1]}%`],
  );

  return (
    <section ref={containerRef} className="relative h-[820svh] bg-cream xl:h-[900vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden xl:h-dvh">
        <HeroNavigation />

        <div className="relative mx-auto flex h-[100svh] max-w-[1600px] flex-col justify-between gap-3 px-5 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-28 md:gap-4 xl:grid xl:h-dvh xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-center xl:gap-0 xl:px-14 xl:pb-0 xl:pt-0">
          <motion.div style={{ y: textY }} className="relative z-[70] order-1 w-full xl:order-1">
            <HeroText />
          </motion.div>
          <div className="relative z-20 order-2 flex w-full flex-1 items-end xl:order-2 xl:block xl:flex-none">
            <HeroScrollScene
              progress={progress}
              travel={travel}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
