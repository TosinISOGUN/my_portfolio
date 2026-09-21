import { useEffect, useLayoutEffect } from "react";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Store } from "lucide-react";
import { projectCaseStudies } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/seo";
import { prepareCaseStudyReturnRestore } from "@/lib/navigation-memory";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectCaseStudies.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const projectUrl = absoluteUrl(`/projects/${loaderData.slug}`);
    const projectImageUrl = absoluteUrl(loaderData.cover);
    const title = `${loaderData.title} - Case Study - Oluwatomisin Isogun`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: loaderData.summary,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: projectUrl },
        { property: "og:image", content: projectImageUrl },
        { property: "og:image:secure_url", content: projectImageUrl },
        { property: "og:image:alt", content: `${loaderData.title} interface preview` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: loaderData.summary },
        { name: "twitter:image", content: projectImageUrl },
        { name: "twitter:image:alt", content: `${loaderData.title} interface preview` },
      ],
      links: [{ rel: "canonical", href: projectUrl }],
    };
  },
  component: ProjectCaseStudyPage,
});

function ProjectCaseStudyPage() {
  const project = Route.useLoaderData();
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [project.slug]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      prepareCaseStudyReturnRestore();
      window.history.back();
      return;
    }

    void router.navigate({ to: "/projects" });
  };

  return (
    <main className="sam-page min-h-dvh bg-[#f7f7f5] px-5 py-6 text-[#111111] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-[1180px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="sam-social-pill w-fit gap-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <div className="flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="sam-pill bg-[#1a1a1a] text-white hover:bg-black"
            >
              Live project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="sam-social-pill"
                aria-label="Open source code"
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
                aria-label="Open marketplace listing"
              >
                <Store className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </header>

        <section className="py-12 sm:py-16">
          <p className="text-[1rem] font-semibold tracking-[-0.035em] text-[#111111]/45">
            {project.eyebrow}
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-5xl text-[clamp(3.2rem,10vw,8.6rem)] font-semibold leading-[0.86] tracking-[-0.1em] [overflow-wrap:anywhere]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-[1.12rem] font-medium leading-8 tracking-[-0.04em] text-[#111111]/58">
                {project.summary}
              </p>
            </div>
            <aside className="rounded-[31px] bg-[#ededed] p-5">
              <p className="text-[0.92rem] font-semibold tracking-[-0.03em] text-[#111111]/42">
                Role
              </p>
              <p className="mt-2 text-[1.2rem] font-semibold tracking-[-0.045em]">
                {project.role}
              </p>
            </aside>
          </div>
        </section>

        <img
          src={project.cover}
          alt=""
          className="aspect-[2.28/1] w-full rounded-[31px] object-cover object-top"
          decoding="async"
        />

        <section className="grid gap-4 py-8 sm:py-10 lg:grid-cols-3">
          {[
            ["Challenge", project.challenge],
            ["Approach", project.approach],
            ["Outcome", project.outcome],
          ].map(([label, value]) => (
            <article key={label} className="rounded-[31px] bg-[#ededed] p-5">
              <h2 className="text-[1.2rem] font-semibold tracking-[-0.05em]">{label}</h2>
              <p className="mt-4 text-[1rem] font-medium leading-7 tracking-[-0.035em] text-[#111111]/56">
                {value}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-[31px] bg-[#ededed] p-5 sm:p-6">
          <div className="grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <p className="text-[0.95rem] font-semibold tracking-[-0.035em] text-[#111111]/42">
                Technical decisions
              </p>
              <h2 className="mt-3 text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[0.9] tracking-[-0.09em]">
                The judgment behind the interface.
              </h2>
            </div>
            <div className="grid gap-3">
              {project.decisions.map((decision) => (
                <article key={decision.label} className="rounded-[24px] bg-white p-5">
                  <h3 className="text-[1.08rem] font-semibold tracking-[-0.045em]">
                    {decision.label}
                  </h3>
                  <p className="mt-3 text-[1rem] font-medium leading-7 tracking-[-0.035em] text-[#111111]/56">
                    {decision.value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.95rem] font-semibold tracking-[-0.035em] text-[#111111]/42">
                Screens
              </p>
              <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.09em]">
                Interface signals.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full bg-[#ededed] px-3 py-1.5 text-[0.82rem] font-semibold tracking-[-0.02em] text-[#111111]/54"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {project.gallery.map((image, index) => (
              <img
                key={`${project.slug}-${index}`}
                src={image}
                alt=""
                className="aspect-[16/10] w-full rounded-[31px] bg-[#ededed] object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
