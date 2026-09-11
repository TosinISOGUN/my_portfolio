import { ArrowUpRight } from "lucide-react";
import { projectCaseStudies } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

export function ProjectArchiveSection() {
  return (
    <RevealSection className="bg-charcoal px-5 py-16 text-cream sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionLabel
            eyebrow="Project Archive"
            title="Editorial case studies built for deeper review."
            copy="A horizontal project index for recruiters who want more than a thumbnail and a tech stack."
            tone="light"
          />
          <a
            href="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cream px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-charcoal transition-transform hover:-translate-y-1"
          >
            Open Archive
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-5">
          {projectCaseStudies.map((project, index) => (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid min-h-[460px] w-[84vw] max-w-[520px] shrink-0 snap-start content-between overflow-hidden rounded-lg bg-cream text-charcoal transition-transform hover:-translate-y-1 sm:min-h-[500px] sm:w-[62vw] lg:w-[46vw] xl:w-[36vw]"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
                    {project.eyebrow}
                  </p>
                  <p className="font-display text-4xl leading-none text-charcoal/10">
                    0{index + 1}
                  </p>
                </div>
                <h3 className="mt-8 font-display text-[clamp(2.2rem,8vw,4.4rem)] leading-[0.92] tracking-normal sm:text-[clamp(2.6rem,6vw,4.8rem)]">
                  {project.title}
                </h3>
                <p className="mt-5 font-sans text-base leading-7 text-charcoal/70">
                  {project.summary}
                </p>
              </div>

              <div>
                <img
                  src={project.cover}
                  alt=""
                  className="aspect-[16/10] w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex items-center justify-between gap-4 p-5 font-sans text-sm font-black uppercase tracking-[0.1em] sm:p-6">
                  <span>{project.role}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
