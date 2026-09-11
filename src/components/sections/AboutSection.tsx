import { aboutParagraphs, experience, focusAreas, skills } from "@/data/portfolio";
import profilePhoto from "@/assets/profile-photo.png";
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
        <div className="grid gap-8 lg:gap-12 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:gap-20">
          <SectionLabel
            eyebrow="About"
            title="I am Oluwatomisin Isogun, a frontend developer."
          />

          <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(220px,0.55fr)] md:items-end xl:gap-8">
            <div className="space-y-5 font-sans text-base leading-7 text-charcoal/78">
              {aboutParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "text-lg font-black leading-7 text-charcoal sm:text-xl sm:leading-8" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <figure className="relative isolate mx-auto aspect-square w-full max-w-[400px] overflow-hidden rounded-full bg-navy shadow-[0_28px_90px_-64px_var(--color-charcoal)] sm:max-w-[480px] md:max-w-[540px]">
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-tangerine" aria-hidden />
              <img
                src={profilePhoto}
                alt="Oluwatomisin Isogun"
                className="relative z-10 h-full w-full translate-x-[4%] scale-[1.12] object-contain object-bottom"
                loading="lazy"
                decoding="async"
              />
            </figure>
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
              <p className="mt-5 max-w-sm font-sans text-base leading-7 opacity-75">{area.copy}</p>
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
                      <li key={point} className="font-sans text-base leading-7 text-charcoal/72">
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
