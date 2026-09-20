import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

export function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeCertificate = certifications[activeIndex] ?? certifications[0];

  if (!activeCertificate) return null;

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? certifications.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % certifications.length);
  };

  return (
    <RevealSection id="certifications" className="overflow-hidden bg-charcoal px-5 py-16 text-cream sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel eyebrow="Certifications" title="Certifications." tone="light" />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-charcoal transition-transform hover:-translate-x-1"
              aria-label="Show previous certificate"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-tangerine text-cream transition-transform hover:translate-x-1"
              aria-label="Show next certificate"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(220px,0.28fr)] xl:items-end">
          <div className="relative overflow-hidden rounded-lg bg-cream p-2 shadow-[0_36px_130px_-72px_rgba(0,0,0,0.9)] sm:p-3">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCertificate.title}
                src={activeCertificate.image}
                alt={`${activeCertificate.title} certificate`}
                className="aspect-[1.42/1] w-full rounded-md object-cover object-left-top"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 80, scale: 0.98 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -80, scale: 0.98 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
          </div>

          <div className="rounded-lg bg-cream/8 p-4">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tangerine">
              {String(activeIndex + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-sans text-xl font-black leading-tight text-cream">
              {activeCertificate.title}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications.map((certificate, index) => (
                <button
                  key={certificate.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index ? "w-10 bg-tangerine" : "w-2.5 bg-cream/28 hover:bg-cream/55"
                  }`}
                  aria-label={`Show ${certificate.title}`}
                  aria-pressed={activeIndex === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
