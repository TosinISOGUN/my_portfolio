import { useEffect, useLayoutEffect, type CSSProperties } from "react";
import { Link, createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SkeletonImage } from "@/components/SkeletonImage";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { featuredProjects, getImageSize, projectCaseStudies } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/seo";
import { prepareCaseStudyReturnRestore } from "@/lib/navigation-memory";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type CaseStudy = (typeof projectCaseStudies)[number];

/** A share picture that is roughly landscape, so link previews do not crop a tall capture. */
const getShareImage = (study: CaseStudy) =>
  study.gallery.find((image) => {
    const size = getImageSize(image);
    return size ? size.width / size.height >= 1.2 && size.width / size.height <= 2.2 : false;
  }) ?? study.cover;

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectCaseStudies.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const projectUrl = absoluteUrl(`/projects/${loaderData.slug}`);
    const projectImageUrl = absoluteUrl(getShareImage(loaderData));
    const title = `${loaderData.title}: website design and development | Oluwatomisin Isogun`;
    const description = `${loaderData.summary} Designed and built by Oluwatomisin Isogun.`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: projectUrl },
        { property: "og:image", content: projectImageUrl },
        { property: "og:image:secure_url", content: projectImageUrl },
        { property: "og:image:alt", content: `${loaderData.title} interface preview` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: projectImageUrl },
        { name: "twitter:image:alt", content: `${loaderData.title} interface preview` },
      ],
      links: [{ rel: "canonical", href: projectUrl }],
    };
  },
  component: ProjectCaseStudyPage,
});

/** A section heading with a coloured bar on its left, as on samwrks.in's case studies. */
function BarHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2
      id={id}
      className="border-l-[3px] border-[var(--accent)] pl-3 text-[1.3rem] font-semibold leading-tight tracking-[-0.045em]"
    >
      {children}
    </h2>
  );
}

function ProjectCaseStudyPage() {
  const project = Route.useLoaderData();
  const router = useRouter();

  // Neighbours follow the order of the Websites tab on the home page.
  const order = featuredProjects.map((item) => item.slug);
  const position = order.indexOf(project.slug);
  const previousSlug = position > 0 ? order[position - 1] : undefined;
  const nextSlug = position >= 0 && position < order.length - 1 ? order[position + 1] : undefined;
  const previousProject = featuredProjects.find((item) => item.slug === previousSlug);
  const nextProject = featuredProjects.find((item) => item.slug === nextSlug);
  const details = featuredProjects.find((item) => item.slug === project.slug);
  const concept = details?.labels.includes("Concept project") ?? false;
  const tint = { "--accent": details?.accent ?? "#1a1a1a" } as CSSProperties;
  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [project.slug]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      prepareCaseStudyReturnRestore();
      window.history.back();
      return;
    }

    void router.navigate({ to: "/" });
  };

  return (
    <main
      className="sam-page min-h-dvh bg-[color-mix(in_oklab,var(--accent)_4%,white)] text-[#111111]"
      style={tint}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-5 sm:px-8 sm:py-8">
        <section className="grid gap-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-[color-mix(in_oklab,var(--accent)_18%,white)] to-[color-mix(in_oklab,var(--accent)_5%,white)] p-6 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="min-w-0">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#111111]/55 transition-colors hover:text-[#111111]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </button>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <p className="text-[1rem] font-semibold tracking-[-0.035em] text-[var(--accent)]">
                {project.eyebrow}
              </p>
              {concept ? (
                <span className="rounded-full bg-white/80 px-3 py-1 text-[0.74rem] font-semibold tracking-[-0.01em] text-[var(--accent)]">
                  Concept project
                </span>
              ) : null}
            </div>
            <h1 className="mt-3 text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.08em] [overflow-wrap:anywhere]">
              {project.title}
            </h1>

            <div className="mt-9 grid gap-7">
              <div>
                <BarHeading>Project Overview</BarHeading>
                <p className="mt-3 max-w-xl text-[1rem] font-medium leading-7 tracking-[-0.03em] text-[#111111]/65">
                  {project.summary}
                </p>
              </div>
              <div>
                <BarHeading>Problem</BarHeading>
                <p className="mt-3 max-w-xl text-[1rem] font-medium leading-7 tracking-[-0.03em] text-[#111111]/65">
                  {project.challenge}
                </p>
              </div>
              <div>
                <BarHeading>Solution</BarHeading>
                <p className="mt-3 max-w-xl text-[1rem] font-medium leading-7 tracking-[-0.03em] text-[#111111]/65">
                  {project.approach}
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="sam-pill bg-[#1a1a1a] text-white hover:bg-black"
              >
                Live project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {/* Repository links are hidden for now. To show them again, restore the `githubUrl`
                  lines in src/data/portfolio.ts, import `Github` from lucide-react and uncomment:
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
              */}
            </div>
          </div>

          <div className="self-center">
            <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[30px] border-[8px] border-[#111111] bg-white shadow-[0_34px_70px_-34px_rgb(0_0_0/0.55)]">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={project.cover}
                  alt={`${project.title} website, top of the home page`}
                  className="h-full w-full object-cover object-top"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="screens-heading" className="pb-12 pt-10 sm:pb-16 sm:pt-12">
          <BarHeading id="screens-heading">Screens</BarHeading>
          <div className="mt-6 grid gap-5">
            {project.gallery.map((image, index) => (
              <SkeletonImage
                key={`${project.slug}-${index}`}
                src={image}
                alt={`${project.title} screenshot ${index + 1} of ${project.gallery.length}`}
                className="rounded-[24px] border border-[#111111]/8 bg-white"
              />
            ))}
          </div>
        </section>

        <nav
          aria-label="More case studies"
          className="grid gap-4 border-t border-[#111111]/10 py-8 sm:grid-cols-2 sm:py-10"
        >
          {previousProject ? (
            <Link
              to="/projects/$slug"
              params={{ slug: previousProject.slug }}
              className="group grid gap-2 rounded-[24px] border border-[color-mix(in_oklab,var(--accent)_20%,white)] bg-white/70 p-5 transition-colors hover:bg-white"
            >
              <span className="flex items-center gap-2 text-[0.92rem] font-semibold tracking-[-0.03em] text-[#111111]/42">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Previous case study
              </span>
              <span className="text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-none tracking-[-0.07em]">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" aria-hidden />
          )}
          {nextProject ? (
            <Link
              to="/projects/$slug"
              params={{ slug: nextProject.slug }}
              className="group grid gap-2 rounded-[24px] border border-[color-mix(in_oklab,var(--accent)_20%,white)] bg-white/70 p-5 transition-colors hover:bg-white sm:text-right"
            >
              <span className="flex items-center gap-2 text-[0.92rem] font-semibold tracking-[-0.03em] text-[#111111]/42 sm:justify-end">
                Next case study
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-none tracking-[-0.07em]">
                {nextProject.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
      <SiteFooter />
    </main>
  );
}
