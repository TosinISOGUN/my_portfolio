import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Store } from "lucide-react";
import { projectCaseStudies } from "@/data/portfolio";
import { prepareCaseStudyReturnRestore } from "@/lib/navigation-memory";
import type { CSSProperties } from "react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectCaseStudies.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} - Case Study - Oluwatomisin Isogun` },
      {
        name: "description",
        content: loaderData.summary,
      },
      { property: "og:title", content: `${loaderData.title} - Case Study` },
      { property: "og:description", content: loaderData.summary },
    ],
  }),
  component: ProjectCaseStudyPage,
});

function ProjectCaseStudyPage() {
  const project = Route.useLoaderData();
  const router = useRouter();
  const carouselStyle = {
    "--gallery-duration": `${Math.max(28, project.gallery.length * 5)}s`,
  } as CSSProperties;

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      prepareCaseStudyReturnRestore();
      window.history.back();
      return;
    }

    void router.navigate({ to: "/projects" });
  };

  return (
    <main className="min-h-dvh bg-cream text-charcoal">
      <section className="px-5 py-6 sm:px-8 sm:py-8 lg:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-tangerine px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream sm:flex-none"
              >
                Live Project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-charcoal/8 px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-charcoal sm:flex-none"
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
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-charcoal/8 px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-charcoal sm:flex-none"
                >
                  <Store className="h-4 w-4" aria-hidden />
                  Marketplace
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid gap-8 py-12 lg:py-20 xl:grid-cols-[minmax(0,1fr)_minmax(240px,0.28fr)] xl:items-start xl:py-24">
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
                {project.eyebrow}
              </p>
              <h1 className="mt-5 max-w-full font-display text-[clamp(2.65rem,12vw,6.8rem)] leading-[0.9] tracking-normal [overflow-wrap:anywhere] xl:text-[clamp(3.2rem,8.5vw,8rem)]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl font-sans text-base leading-7 text-charcoal/74 sm:text-lg">
                {project.summary}
              </p>
            </div>

            <aside className="h-fit w-full max-w-[320px] rounded-lg bg-charcoal p-6 text-cream xl:justify-self-end">
              <dl className="space-y-5">
                <div>
                  <dt className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/45">
                    Role
                  </dt>
                  <dd className="mt-2 font-sans text-lg font-black">{project.role}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <img
            src={project.cover}
            alt=""
            className="aspect-[16/9] w-full rounded-lg object-cover object-top shadow-[0_30px_110px_-72px_var(--color-charcoal)]"
            decoding="async"
          />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-3 xl:gap-10">
          {[
            ["Challenge", project.challenge],
            ["Approach", project.approach],
            ["Outcome", project.outcome],
          ].map(([label, value]) => (
            <article key={label} className="rounded-lg bg-[#fffaf0] p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
                {label}
              </p>
              <p className="mt-5 font-sans text-base leading-7 text-charcoal/72">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-8 xl:grid-cols-[minmax(260px,0.42fr)_minmax(0,1fr)] xl:items-start xl:gap-10">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
              Technical Decisions
            </p>
            <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,8vw,4.2rem)] leading-[0.96] tracking-normal xl:text-[clamp(2.4rem,6vw,5rem)]">
              The judgment behind the interface.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {project.decisions.map((decision) => (
              <article key={decision.label} className="rounded-lg bg-cream p-5 shadow-[0_24px_70px_-58px_var(--color-charcoal)]">
                <h3 className="font-sans text-lg font-black text-charcoal">{decision.label}</h3>
                <p className="mt-4 font-sans text-sm leading-6 text-charcoal/70">{decision.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-charcoal px-5 py-16 text-cream sm:px-8 sm:py-20 lg:px-14 xl:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
                Proof
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,8vw,4.8rem)] leading-[0.96] tracking-normal xl:text-[clamp(2.4rem,7vw,6rem)]">
                Screens and signals from the build.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full bg-cream/10 px-3 py-2 font-sans text-sm font-black text-cream"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-tangerine px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
            >
              Live Project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-charcoal"
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
                className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 font-sans text-xs font-black uppercase tracking-[0.1em] text-cream"
              >
                <Store className="h-4 w-4" aria-hidden />
                Marketplace
              </a>
            ) : null}
          </div>

          <div
            className="case-study-carousel mt-12"
            style={carouselStyle}
            aria-label={`${project.title} interface screenshots`}
          >
            <div className="case-study-carousel__track">
              {[0, 1].map((groupIndex) => (
                <div
                  key={`${project.slug}-group-${groupIndex}`}
                  className="case-study-carousel__group"
                  aria-hidden={groupIndex > 0}
                >
                  {project.gallery.map((image, imageIndex) => (
                    <img
                      key={`${project.slug}-${groupIndex}-${imageIndex}`}
                      src={image}
                      alt=""
                      className="case-study-carousel__image"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
