import { ArrowRight, FileText } from "lucide-react";
import resumePdf from "@/assets/OLUWATOMISIN_ISOGUN_RESUME.pdf";
import { profile } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";

export function RecruiterCtaSection() {
  return (
    <RevealSection className="bg-[#fffaf0] px-5 py-16 sm:px-8 lg:px-14 xl:py-20">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 rounded-lg bg-charcoal p-6 text-cream sm:p-8 xl:flex-row xl:items-center xl:justify-between xl:p-10">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
            For Recruiters
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,4.3rem)] leading-[0.98] tracking-normal">
            Frontend developer for serious product surfaces.
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-cream/70">
            I am strongest where React, product judgment, performance, and implementation ownership meet.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-charcoal transition-transform hover:-translate-y-1"
          >
            <FileText className="h-4 w-4" aria-hidden />
            View Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-tangerine px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-cream transition-transform hover:-translate-y-1"
          >
            Contact Me
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </RevealSection>
  );
}
