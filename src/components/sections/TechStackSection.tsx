import { Layers, MonitorSmartphone, ShieldCheck, Workflow } from "lucide-react";
import { techStackGroups } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

const icons = [MonitorSmartphone, Layers, Workflow, ShieldCheck];

export function TechStackSection() {
  return (
    <RevealSection id="tech-stack" className="bg-[#fffaf0] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start xl:gap-14">
          <SectionLabel
            eyebrow="Tech Stack"
            title="The tools I use to turn product ideas into stable interfaces."
            copy="A practical stack for React products, landing systems, dashboards, booking flows, and API-backed interfaces."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {techStackGroups.map((group, index) => {
              const Icon = icons[index] ?? Layers;

              return (
                <article
                  key={group.title}
                  className="group relative isolate overflow-hidden rounded-lg bg-cream p-5 shadow-[0_24px_80px_-64px_var(--color-charcoal)] sm:p-6"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-tangerine" aria-hidden />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-charcoal text-cream transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-black leading-tight text-charcoal">
                        {group.title}
                      </h3>
                      <p className="mt-3 font-sans text-base leading-7 text-charcoal/72">
                        {group.copy}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-charcoal/10 bg-white px-3 py-1.5 font-sans text-xs font-black text-charcoal/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
