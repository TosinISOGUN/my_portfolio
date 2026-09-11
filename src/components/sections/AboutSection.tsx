import { aboutParagraphs, experience, focusAreas, skills } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

export function AboutSection() {
  const focusStyles = [
    "md:col-span-2 xl:col-span-1 xl:row-span-2 bg-charcoal text-cream",
    "bg-[#fffaf0] text-charcoal",
    "bg-navy text-cream",
    "bg-tangerine text-cream",
  ];

  return (
    <RevealSection id="about" className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-20">
          <SectionLabel
            eyebrow="About"
            title="Frontend engineering for products people actually use."
            copy="The studio work proves ownership, but the core signal is frontend craft: fast interfaces, clear product flows, and React systems that can scale."
          />

          <div className="space-y-5 font-sans text-sm leading-7 text-charcoal/78 sm:text-base">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(170px,auto)] gap-4 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((area, index) => (
            <article
              key={area.title}
              className={`group relative isolate overflow-hidden rounded-lg p-5 shadow-[0_24px_70px_-52px_var(--color-charcoal)] sm:p-6 ${focusStyles[index]}`}
            >
              <span className="absolute right-5 top-3 -z-10 font-display text-8xl leading-none opacity-10">
                0{index + 1}
              </span>
              <div className="mb-8 h-1.5 w-16 rounded-full bg-current opacity-35 transition-all duration-300 group-hover:w-24" />
              <h3 className="max-w-[13rem] font-sans text-xl font-black leading-tight">{area.title}</h3>
              <p className="mt-5 max-w-sm font-sans text-sm leading-6 opacity-75">{area.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 xl:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.62fr)] xl:items-start">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-navy">
              Current Work
            </h3>
            <div className="mt-5 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="grid gap-5 py-7 md:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="font-sans text-xl font-black text-charcoal">{item.role}</p>
                    <p className="mt-1 font-sans text-sm font-bold uppercase tracking-[0.12em] text-tangerine">
                      {item.company}
                    </p>
                    <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
                      {item.period}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="font-sans text-sm leading-6 text-charcoal/72">
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg bg-navy p-5 text-cream sm:p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream/65">
              Technical Range
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-cream/10 px-3 py-1.5 font-sans text-xs font-bold text-cream"
                >
                  {skill}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </RevealSection>
  );
}
