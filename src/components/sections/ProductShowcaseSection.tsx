import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { showcaseScreens } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

const categories = ["All", "Landing", "Dashboard", "Booking", "Admin"] as const;

export function ProductShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [activeTitle, setActiveTitle] = useState(showcaseScreens[0].title);

  const filteredScreens = useMemo(
    () =>
      activeCategory === "All"
        ? showcaseScreens
        : showcaseScreens.filter((screen) => screen.category === activeCategory),
    [activeCategory],
  );
  const activeScreen =
    filteredScreens.find((screen) => screen.title === activeTitle) ?? filteredScreens[0];
  const carouselScreens = [...filteredScreens, ...filteredScreens];

  return (
    <RevealSection className="overflow-hidden bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionLabel
            eyebrow="Interface Showcase"
            title="A closer look at the product surfaces behind the case studies."
            copy="Landing pages, dashboards, booking flows, portals, and operational interfaces from major builds."
          />

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Interface showcase filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  const next =
                    category === "All"
                      ? showcaseScreens[0]
                      : showcaseScreens.find((screen) => screen.category === category);
                  if (next) setActiveTitle(next.title);
                }}
                className={`rounded-full px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] transition-colors ${
                  activeCategory === category
                    ? "bg-charcoal text-cream"
                    : "bg-charcoal/8 text-charcoal hover:bg-charcoal/12"
                }`}
                role="tab"
                aria-selected={activeCategory === category}
                aria-controls="interface-showcase-panel"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div id="interface-showcase-panel" className="mt-10 grid gap-5 sm:mt-14 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <article className="relative overflow-hidden rounded-lg bg-charcoal p-3 shadow-[0_30px_110px_-72px_var(--color-charcoal)]">
            <img
              src={activeScreen.image}
              alt={`${activeScreen.project} ${activeScreen.kind}`}
              className="aspect-[16/9] w-full rounded-md object-cover object-top"
              decoding="async"
            />
            <div className="mt-3 flex flex-col gap-3 rounded-lg bg-cream p-4 text-charcoal sm:absolute sm:inset-x-5 sm:bottom-5 sm:mt-0 sm:bg-cream/94 sm:backdrop-blur-sm md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-sans text-lg font-black">{activeScreen.project}</p>
                <p className="mt-1 font-sans text-base leading-7 text-charcoal/70">
                  {activeScreen.insight}
                </p>
              </div>
              <a
                href={activeScreen.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-tangerine px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
              >
                View
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </article>

          <div className="grid max-h-[520px] gap-3 overflow-y-auto pr-1 xl:max-h-[640px]">
            {filteredScreens.map((screen) => (
              <button
                key={screen.title}
                type="button"
                onClick={() => setActiveTitle(screen.title)}
                className={`grid grid-cols-[5.5rem_1fr] gap-3 rounded-lg p-2 text-left transition-colors sm:grid-cols-[6.5rem_1fr] ${
                  activeScreen.title === screen.title
                    ? "bg-charcoal text-cream"
                    : "bg-[#fffaf0] text-charcoal hover:bg-white"
                }`}
                aria-pressed={activeScreen.title === screen.title}
              >
                <img
                  src={screen.image}
                  alt=""
                  className="aspect-[16/10] w-full rounded-md object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <span className="min-w-0 self-center">
                  <span className="block font-sans text-sm font-black">{screen.project}</span>
                  <span className="mt-1 block font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] opacity-65">
                    {screen.kind}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 flex w-max gap-5 [animation:showcase-marquee_70s_linear_infinite] motion-reduce:[animation:none]">
        {carouselScreens.map((screen, index) => (
          <figure
            key={`${screen.title}-${index}`}
            className="w-[84vw] max-w-[560px] shrink-0 overflow-hidden rounded-lg bg-white p-3 shadow-[0_22px_90px_-68px_var(--color-charcoal)] sm:w-[58vw] lg:w-[46vw] xl:w-[34vw]"
          >
            <img
              src={screen.image}
              alt={`${screen.project} ${screen.kind}`}
              className="aspect-[16/10] w-full rounded-md object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="flex items-center justify-between gap-4 px-1 pt-3">
              <span className="font-sans text-sm font-black text-charcoal">{screen.project}</span>
              <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-charcoal/48">
                {screen.kind}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </RevealSection>
  );
}
