import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Store } from "lucide-react";
import { featuredProjects, moreProjects, projectCaseStudies } from "@/data/portfolio";
import { rememberCaseStudyReturn } from "@/lib/navigation-memory";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

export function ProjectsSection() {
  return (
    <RevealSection id="projects" className="bg-[#fffaf0] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
          <SectionLabel
            eyebrow="Projects"
            title="Frontend case studies across booking flows, dashboards, and marketplace systems."
            copy="Selected work from shipped products and client projects, with the studio work serving as proof of ownership."
          />
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              onClick={rememberCaseStudyReturn}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-tangerine px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-cream transition-transform hover:-translate-y-1"
            >
              View Archive
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href="https://github.com/TosinISOGUN"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-charcoal px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-cream transition-transform hover:-translate-y-1"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 xl:grid-cols-2">
          {featuredProjects.map((project) => {
            const caseStudy = projectCaseStudies.find((item) => item.slug === project.slug);
            const previewImage = caseStudy?.cover;

            return (
              <article
                key={project.title}
                className="group overflow-hidden rounded-lg border border-charcoal/10 bg-cream shadow-[0_20px_70px_-55px_var(--color-charcoal)] transition-transform hover:-translate-y-1"
              >
                {previewImage ? (
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                    className="block overflow-hidden bg-charcoal/5"
                  >
                    <img
                      src={previewImage}
                      alt=""
                      className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                ) : null}

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-[inset_0_0_0_1px_rgba(42,40,37,0.08)]">
                        <img src={project.logo} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-2xl leading-none tracking-normal text-charcoal sm:text-3xl">
                          {project.title}
                        </h3>
                        <p className="mt-2 font-sans text-sm font-bold uppercase tracking-[0.12em] text-tangerine">
                          {project.studio}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      onClick={rememberCaseStudyReturn}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-cream transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-label={`Read ${project.title} case study`}
                    >
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-charcoal/10 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-charcoal/68"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-2 md:grid-cols-3">
                    {project.signals.map((signal) => (
                      <div
                        key={signal}
                        className="rounded-lg bg-charcoal/[0.035] px-3 py-3 font-sans text-xs font-black leading-5 text-charcoal"
                      >
                        {signal}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-navy">
                        Problem
                      </p>
                      <p className="mt-2 font-sans text-base leading-7 text-charcoal/72">{project.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-navy">
                        Result
                      </p>
                      <p className="mt-2 font-sans text-base leading-7 text-charcoal/72">{project.result}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      onClick={rememberCaseStudyReturn}
                      className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
                    >
                      Case Study
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                    {project.marketplace ? (
                      <a
                        href={project.marketplace}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-tangerine px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
                      >
                        <Store className="h-4 w-4" aria-hidden />
                        Marketplace
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-charcoal/8 px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-charcoal"
                      >
                        Code
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="rounded-lg bg-charcoal p-5 text-cream sm:p-7 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-3xl leading-none tracking-normal sm:text-4xl">
                  More Work
                </h3>
                <p className="mt-3 max-w-xl font-sans text-base leading-7 text-cream/68">
                  Additional shipped interfaces across company sites, academy platforms, commerce surfaces, and exploratory product work.
                </p>
              </div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
                Selected Builds
              </p>
            </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {moreProjects.map((project) => {
              const content = (
                <>
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-cream p-3 shadow-[inset_0_0_0_1px_rgba(42,40,37,0.08)]">
                    <img src={project.logo} alt="" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans text-sm font-black text-cream">{project.title}</span>
                    <span className="mt-1 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-cream/48">
                      {project.type}
                    </span>
                  </span>
                  {project.link ? <ArrowUpRight className="ml-auto h-4 w-4 text-cream/55" aria-hidden /> : null}
                </>
              );

              if (project.slug) {
                return (
                  <Link
                    key={project.title}
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                    className="flex min-h-24 items-center gap-3 rounded-lg border border-cream/12 bg-cream/8 p-4 transition-transform hover:-translate-y-1 hover:bg-cream/12"
                  >
                    {content}
                  </Link>
                );
              }

              return project.link ? (
                <a
                  key={project.title}
                  href={project.link}
                  className="flex min-h-24 items-center gap-3 rounded-lg border border-cream/12 bg-cream/8 p-4 transition-transform hover:-translate-y-1 hover:bg-cream/12"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={project.title}
                  className="flex min-h-24 items-center gap-3 rounded-lg border border-cream/12 bg-cream/8 p-4"
                >
                  {content}
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
