import { useMemo, useRef, useState, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Calendar, Github, Send } from "lucide-react";
import resumePdf from "@/assets/OLUWATOMISIN_ISOGUN_RESUME.pdf";
import profilePhoto from "@/assets/profile-photo.png";
import {
  certifications,
  featuredProjects,
  profile,
  projectCaseStudies,
  skills,
} from "@/data/portfolio";
import { rememberCaseStudyReturn } from "@/lib/navigation-memory";

type ViewMode = "samples" | "case-studies" | "certifications";

const bookingUrl = "https://cal.com/oluwatomisin-isogun-disku5/30min?overlayCalendar=true";

export function ReferencePortfolioHome() {
  const [view, setView] = useState<ViewMode>("samples");
  const contentScrollRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const workSamples = useMemo(
    () =>
      featuredProjects.map((project) => ({
        ...project,
        caseStudy: projectCaseStudies.find((item) => item.slug === project.slug),
      })),
    [],
  );

  const sampleScreens = useMemo(() => {
    const screens = projectCaseStudies
      .filter((project) => project.slug !== "recap")
      .flatMap((project) =>
        project.gallery.map((image, index) => ({
          image,
          title: `${project.title} interface ${index + 1}`,
        })),
      );

    return screens.sort((first, second) => getShuffleRank(first.image) - getShuffleRank(second.image));
  }, []);

  const orderedCertifications = useMemo(
    () =>
      [...certifications].sort(
        (first, second) => getCertificationPriority(first.title) - getCertificationPriority(second.title),
      ),
    [],
  );

  return (
    <main className="sam-page min-h-screen bg-[#f7f7f5] text-[#111111] lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-[22vw_minmax(0,1fr)] xl:grid-cols-[460px_minmax(0,1fr)]">
        <IdentityPanel contentScrollRef={contentScrollRef} />

        <section ref={contentScrollRef} className="min-w-0 border-[#111111]/10 lg:h-screen lg:overflow-y-auto lg:border-l">
          <div className="sticky top-0 z-20 border-b border-[#111111]/10 bg-[#f7f7f5]/92 px-3 py-4 backdrop-blur-md sm:px-8 sm:py-5 lg:px-8">
            <ViewSwitcher value={view} onChange={setView} />
          </div>

          <div className="px-3 py-4 sm:px-8 sm:py-5 lg:px-8">
            <AnimatePresence mode="wait">
              {view === "samples" ? (
                <motion.div
                  key="samples"
                  className="grid gap-8"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {sampleScreens.map((sample) => (
                    <WorkSampleCard key={`${sample.title}-${sample.image}`} sample={sample} />
                  ))}
                </motion.div>
              ) : view === "case-studies" ? (
                <motion.div
                  key="case-studies"
                  className="grid gap-8"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {workSamples.map((project, index) => (
                    <CaseStudyCard key={project.title} project={project} index={index} />
                  ))}
                  <Link
                    to="/projects"
                    onClick={rememberCaseStudyReturn}
                    className="group grid min-h-[220px] overflow-hidden rounded-[26px] bg-[#1a1a1a] p-5 text-white sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.8rem] font-semibold tracking-[-0.02em] text-white/55">
                        Archive
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-white/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </div>
                    <div className="mt-auto max-w-3xl pt-16">
                      <p className="text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.085em]">
                        View the full project archive.
                      </p>
                      <p className="mt-4 max-w-xl text-[1rem] font-medium leading-7 tracking-[-0.035em] text-white/48">
                        A broader library of product builds, landing pages, dashboards, and case study notes.
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="certifications"
                  className="grid gap-8"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {orderedCertifications.map((certificate) => (
                    <motion.article
                      key={certificate.image}
                      className="overflow-hidden rounded-[26px] bg-[#ededed] p-2 sm:p-3"
                      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 38 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.68, type: "spring", bounce: 0.1 }}
                    >
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="h-auto w-full rounded-[20px] bg-white object-contain object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}

function IdentityPanel({
  contentScrollRef,
}: {
  contentScrollRef: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      className="flex min-h-0 flex-col gap-12 px-8 py-8 sm:px-10 sm:py-10 lg:h-screen lg:min-h-0 lg:justify-between lg:gap-0 lg:overflow-hidden lg:px-8 lg:py-5 xl:px-8"
      onWheel={(event) => {
        if (typeof window === "undefined" || window.innerWidth < 1024) return;

        contentScrollRef.current?.scrollBy({
          top: event.deltaY,
          left: event.deltaX,
          behavior: "auto",
        });
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, type: "spring", bounce: 0, stiffness: 90 }}
    >
      <div>
        <div className="flex justify-end">
          <StatusBadge />
        </div>

        <div className="mt-7 sm:mt-10 lg:mt-5">
          <figure className="h-[106px] w-[106px] overflow-hidden rounded-full bg-[#ededed] lg:h-[84px] lg:w-[84px] xl:h-[92px] xl:w-[92px]">
            <img
              src={profilePhoto}
              alt="Oluwatomisin Isogun"
              className="h-full w-full translate-x-[3%] scale-[1.18] object-contain object-bottom"
            />
          </figure>

          <h1 className="mt-5 text-[1.45rem] font-semibold leading-none tracking-[-0.06em] text-[#050505] lg:mt-3 lg:text-[1.18rem] xl:text-[1.28rem]">
            {profile.name}
          </h1>

          <h2 className="mt-8 max-w-[455px] text-[clamp(1.75rem,8vw,2.35rem)] font-semibold leading-[1.16] tracking-[-0.075em] text-[#050505] lg:mt-5 lg:max-w-[360px] lg:text-[1.72rem] xl:max-w-[390px] xl:text-[1.95rem]">
            <span className="text-[#111111]/48">Hey, I'm Oluwatomisin, a </span>
            frontend developer for product teams.
          </h2>

          <p className="mt-7 max-w-[445px] text-[1.06rem] font-medium leading-[1.42] tracking-[-0.045em] text-[#111111]/58 lg:mt-5 lg:max-w-[350px] lg:text-[0.88rem] lg:leading-[1.34] xl:max-w-[390px] xl:text-[0.95rem]">
            I build React and TypeScript interfaces that feel premium and turn complex workflows into actual product momentum. I care about the small stuff, spacing, states, performance, and the one extra click that should not be there.
          </p>

          <div className="mt-6 max-w-[390px] lg:mt-4">
            <p className="text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/38">
              Core stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.slice(0, 8).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#ededed] px-3 py-1.5 text-[0.78rem] font-semibold tracking-[-0.025em] text-[#111111]/56 lg:px-2.5 lg:py-1 lg:text-[0.72rem] xl:text-[0.76rem]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3 lg:mt-5 lg:gap-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="sam-pill sam-tilt-button bg-[#1a1a1a] text-white hover:bg-black"
            >
              <Calendar className="h-[18px] w-[18px]" aria-hidden />
              Book a call
            </a>
            <a href={`mailto:${profile.email}`} className="sam-pill sam-tilt-button bg-[#ededed] text-[#1a1a1a] hover:bg-white">
              <Send className="h-[18px] w-[18px]" aria-hidden />
              Message me
            </a>
          </div>

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold tracking-[-0.035em] text-[#111111]/54 transition-colors hover:text-[#111111] lg:mt-3 lg:text-[0.84rem] xl:text-[0.9rem]"
          >
            <ArrowDownToLine className="h-4 w-4" aria-hidden />
            View resume
          </a>
        </div>
      </div>

      <div className="mt-12 pb-1 lg:mt-5">
        <p className="text-[1.35rem] font-semibold leading-tight tracking-[-0.065em] lg:text-[1rem] xl:text-[1.12rem]">
          got a project in mind? let's chat :)
        </p>
        <div className="mt-6 flex flex-wrap gap-3 lg:mt-3 lg:gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className="sam-social-pill" aria-label="GitHub">
            <Github className="h-4 w-4" aria-hidden />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="sam-social-pill">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="sam-social-pill">
            Email
          </a>
          <Link to="/projects" onClick={rememberCaseStudyReturn} className="sam-social-pill">
            Archive
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}

function StatusBadge() {
  return (
    <div className="sam-handwritten inline-flex w-fit items-center gap-2 text-[1.12rem] text-[#111111]/68 lg:text-[1rem]">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-35" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
      </span>
      Available for projects
    </div>
  );
}

function ViewSwitcher({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div className="relative flex h-[32px] w-fit min-w-[370px] max-w-full items-center rounded-full bg-[#ededed] p-0 sm:h-[34px] max-[520px]:min-w-0 max-[520px]:w-full">
      {(["samples", "case-studies", "certifications"] as const).map((item) => {
        const active = value === item;
        const label =
          item === "samples"
            ? "Work samples"
            : item === "case-studies"
              ? "Case studies"
              : "Certifications";

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`relative z-10 h-full flex-1 rounded-full px-2 text-[0.7rem] font-medium tracking-[-0.035em] transition-colors sm:px-4 sm:text-[0.78rem] ${
              active ? "text-white" : "text-[#111111]/34 hover:text-[#111111]/70"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="sam-active-tab"
                className="absolute inset-0 -z-10 rounded-full bg-[#1a1a1a]"
                transition={{ type: "spring", stiffness: 420, damping: 35 }}
              />
            ) : null}
            {label}
          </button>
        );
      })}
    </div>
  );
}

function WorkSampleCard({
  sample,
}: {
  sample: {
    image: string;
    title: string;
  };
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="overflow-hidden rounded-[26px] bg-[#ededed] p-2 sm:p-3"
      initial={reduce ? false : { opacity: 0, scale: 0.92, y: 46 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.34 }}
      transition={{ duration: 0.72, type: "spring", bounce: 0.12 }}
    >
      <img
        src={sample.image}
        alt={sample.title}
        className="h-auto w-full rounded-[20px] bg-white object-contain object-center"
        loading="lazy"
        decoding="async"
      />
    </motion.article>
  );
}

function CaseStudyCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number] & {
    caseStudy?: (typeof projectCaseStudies)[number];
  };
  index: number;
}) {
  const reduce = useReducedMotion();
  const caseStudy = project.caseStudy;
  const previewImages = caseStudy?.gallery.filter(Boolean).slice(0, 3) ?? [];
  const cover = caseStudy?.cover ?? previewImages[0];

  return (
    <motion.article
      className="group overflow-hidden rounded-[26px] bg-[#ededed] p-3 text-[#111111]"
      initial={reduce ? false : { opacity: 0, y: 42, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.68, type: "spring", bounce: 0.1 }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        onClick={rememberCaseStudyReturn}
        className="block overflow-hidden rounded-[20px] bg-white"
      >
        {cover ? (
          <img
            src={cover}
            alt=""
            className="aspect-[1.55/1] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015] md:aspect-[2.15/1]"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </Link>

      <div className="grid gap-7 px-2 py-5 sm:px-3 sm:py-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[0.78rem] font-semibold tracking-[-0.02em] text-[#111111]/44">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-[0.78rem] font-semibold tracking-[-0.02em] text-[#111111]/44">
              {caseStudy?.eyebrow ?? project.studio}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-[0.78rem] font-semibold tracking-[-0.02em] text-[#111111]/44">
              {caseStudy?.role ?? profile.role}
            </span>
          </div>

          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            onClick={rememberCaseStudyReturn}
            className="mt-5 block"
          >
            <h3 className="max-w-4xl text-[clamp(2.15rem,10vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.085em] sm:leading-[0.88] sm:tracking-[-0.095em]">
              {project.title}
            </h3>
          </Link>

          <p className="mt-5 max-w-3xl text-[1rem] font-medium leading-7 tracking-[-0.035em] text-[#111111]/55 sm:text-[1.08rem]">
            {caseStudy?.summary ?? project.result}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(caseStudy?.metrics ?? project.signals).slice(0, 4).map((metric) => (
              <span
                key={metric}
                className="rounded-full bg-white px-3 py-1.5 text-[0.82rem] font-semibold tracking-[-0.02em] text-[#111111]/52"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {previewImages.length ? (
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((image, previewIndex) => (
                <img
                  key={`${image}-${previewIndex}`}
                  src={image}
                  alt=""
                  className="aspect-[4/3] rounded-[14px] bg-white object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
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
              href={caseStudy?.liveUrl ?? project.link}
              target="_blank"
              rel="noreferrer"
              className="sam-pill bg-white text-[#111111] hover:bg-[#f7f7f5]"
            >
              Live site
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function getShuffleRank(value: string) {
  return Array.from(value).reduce((rank, char, index) => rank + char.charCodeAt(0) * (index + 17), 0) % 997;
}

function getCertificationPriority(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("scrum")) return 0;
  if (lowerTitle.includes("six sigma")) return 1;
  if (lowerTitle.includes("aspire")) return 2;
  if (lowerTitle.includes("project management")) return 3;

  return 10;
}
