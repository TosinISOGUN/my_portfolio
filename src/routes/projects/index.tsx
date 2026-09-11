import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Store } from "lucide-react";
import { projectCaseStudies } from "@/data/portfolio";
import {
  prepareCaseStudyReturnRestore,
  rememberCaseStudyReturn,
} from "@/lib/navigation-memory";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Project Archive - Oluwatomisin Isogun" },
      {
        name: "description",
        content: "Editorial archive of frontend development case studies by Oluwatomisin Isogun.",
      },
    ],
  }),
  component: ProjectArchivePage,
});

function ProjectArchivePage() {
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      prepareCaseStudyReturnRestore();
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  const archiveProjects = [...projectCaseStudies].sort((first, second) => {
    if (first.slug === "recap") return 1;
    if (second.slug === "recap") return -1;
    return 0;
  });

  return (
    <main className="min-h-dvh bg-cream px-5 py-6 text-charcoal sm:px-8 sm:py-8 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </button>

        <section className="py-12 sm:py-16 lg:py-24">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
            Project Archive
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.4rem,10vw,6.8rem)] leading-[0.92] tracking-normal lg:text-[clamp(3rem,8vw,8rem)]">
            Frontend systems, told as case studies.
          </h1>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          {archiveProjects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-lg bg-[#fffaf0] transition-transform hover:-translate-y-1"
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                onClick={rememberCaseStudyReturn}
              >
                <img
                  src={project.cover}
                  alt=""
                  className="aspect-[16/9] w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="p-5 sm:p-7">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-tangerine">
                  <span>{project.eyebrow}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                    className="min-w-0"
                  >
                    <h2 className="font-display text-[clamp(1.9rem,8vw,3.4rem)] leading-[0.92] tracking-normal md:text-[clamp(2.2rem,5vw,4rem)]">
                      {project.title}
                    </h2>
                  </Link>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-cream transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-label={`Read ${project.title} case study`}
                  >
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </Link>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-charcoal/10 px-3 py-1 font-sans text-xs font-black text-charcoal/72"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-charcoal/70">
                  {project.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                    className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
                  >
                    Case Study
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-tangerine px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
                  >
                    Live
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-charcoal/8 px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-charcoal"
                    >
                      <Github className="h-4 w-4" aria-hidden />
                      Code
                    </a>
                  ) : null}
                  {project.marketplaceUrl ? (
                    <a
                      href={project.marketplaceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-charcoal/8 px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-charcoal"
                    >
                      <Store className="h-4 w-4" aria-hidden />
                      Marketplace
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
