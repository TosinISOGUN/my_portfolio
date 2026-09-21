import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Store } from "lucide-react";
import { projectCaseStudies } from "@/data/portfolio";
import { absoluteUrl, ogImageUrl } from "@/lib/seo";
import {
  prepareCaseStudyReturnRestore,
  rememberCaseStudyReturn,
} from "@/lib/navigation-memory";

const archiveUrl = absoluteUrl("/projects");
const archiveDescription =
  "Project archive of frontend case studies by Oluwatomisin Isogun, covering booking platforms, dashboards, marketplaces, commerce sites, and product interfaces.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Project Archive - Oluwatomisin Isogun" },
      {
        name: "description",
        content: archiveDescription,
      },
      { property: "og:title", content: "Project Archive - Oluwatomisin Isogun" },
      { property: "og:description", content: archiveDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: archiveUrl },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:secure_url", content: ogImageUrl },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Oluwatomisin Isogun project archive" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Project Archive - Oluwatomisin Isogun" },
      { name: "twitter:description", content: archiveDescription },
      { name: "twitter:image", content: ogImageUrl },
      { name: "twitter:image:alt", content: "Oluwatomisin Isogun project archive" },
    ],
    links: [{ rel: "canonical", href: archiveUrl }],
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
    <main className="sam-page min-h-dvh bg-[#f7f7f5] px-5 py-6 text-[#111111] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-[1180px]">
        <header className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="sam-social-pill gap-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <Link to="/" className="text-[0.98rem] font-semibold tracking-[-0.035em] text-[#111111]/46 hover:text-[#111111]">
            Oluwatomisin
          </Link>
        </header>

        <section className="py-12 sm:py-16">
          <p className="text-[1rem] font-semibold tracking-[-0.035em] text-[#111111]/45">
            Project archive
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(3rem,9vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.09em]">
            Frontend work, collected.
          </h1>
        </section>

        <div className="grid gap-5">
          {archiveProjects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-[31px] bg-[#ededed]"
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                onClick={rememberCaseStudyReturn}
                className="block"
              >
                <img
                  src={project.cover}
                  alt=""
                  className="aspect-[2.25/1] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-semibold tracking-[-0.035em] text-[#111111]/42">
                    {project.eyebrow}
                  </p>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                  >
                    <h2 className="mt-2 text-[clamp(2rem,6vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.085em]">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="mt-4 max-w-3xl text-[1rem] font-medium leading-7 tracking-[-0.035em] text-[#111111]/56">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.metrics.slice(0, 3).map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full bg-white px-3 py-1.5 text-[0.82rem] font-semibold tracking-[-0.02em] text-[#111111]/54"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={rememberCaseStudyReturn}
                    className="sam-pill bg-[#1a1a1a] text-white hover:bg-black"
                  >
                    Case study
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sam-pill bg-white text-[#111111] hover:bg-[#f7f7f5]"
                  >
                    Live
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="sam-social-pill"
                      aria-label={`${project.title} source code`}
                    >
                      <Github className="h-4 w-4" aria-hidden />
                    </a>
                  ) : null}
                  {project.marketplaceUrl ? (
                    <a
                      href={project.marketplaceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="sam-social-pill"
                      aria-label={`${project.title} marketplace listing`}
                    >
                      <Store className="h-4 w-4" aria-hidden />
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
