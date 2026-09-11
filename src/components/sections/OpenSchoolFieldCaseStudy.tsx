import { ArrowUpRight, Languages } from "lucide-react";
import { openSchoolFieldCaseStudy } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";

export function OpenSchoolFieldCaseStudy() {
  return (
    <RevealSection className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-center">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
              Flagship Case Study
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,8vw,4.6rem)] leading-[0.95] tracking-normal text-charcoal sm:text-[clamp(2.6rem,6vw,6rem)]">
              {openSchoolFieldCaseStudy.title}
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-charcoal/75">
              {openSchoolFieldCaseStudy.subtitle}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {openSchoolFieldCaseStudy.facts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-lg border border-charcoal/10 bg-[#fffaf0] p-4 font-sans text-sm font-bold leading-6 text-charcoal"
                >
                  {fact}
                </div>
              ))}
            </div>

            <a
              href={openSchoolFieldCaseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-tangerine px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-cream transition-transform hover:-translate-y-1"
            >
              View Live Project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg bg-charcoal p-3 shadow-[0_30px_100px_-70px_var(--color-charcoal)]">
              <img
                src={openSchoolFieldCaseStudy.image}
                alt="Open School Field admin operations dashboard"
                className="aspect-[16/10] w-full rounded-md object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mt-5 grid gap-3">
              {openSchoolFieldCaseStudy.decisions.map((decision) => (
                <article key={decision.label} className="grid gap-3 rounded-lg bg-[#fffaf0] p-4 sm:grid-cols-[9rem_1fr]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-tangerine">
                    {decision.label === "Localization" ? <Languages className="h-4 w-4" aria-hidden /> : null}
                    {decision.label}
                  </div>
                  <p className="font-sans text-base leading-7 text-charcoal/72">{decision.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
