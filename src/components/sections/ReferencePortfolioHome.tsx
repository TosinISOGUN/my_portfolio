import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Facebook,
  Github,
  MessageCircle,
} from "lucide-react";
import resumePdf from "@/assets/OLUWATOMISIN_ISOGUN_RESUME.pdf";
import { SkeletonImage } from "@/components/SkeletonImage";
import { CtaBlock, Faq } from "@/components/sections/BusinessSections";
import { SiteFooter } from "@/components/sections/SiteFooter";
import profilePhoto from "@/assets/profile-photo.webp";
import {
  bookingUrl,
  whatsappUrl,
  certifications,
  featuredProjects,
  getHeroRank,
  profile,
  projectCaseStudies,
  skills,
  workHistory,
  type WorkHistoryEntry,
} from "@/data/portfolio";
import { getPendingCaseStudyReturnView, rememberCaseStudyReturn } from "@/lib/navigation-memory";

type ViewMode = "websites" | "case-studies" | "work-history" | "samples" | "certifications";
type CaseStudy = (typeof projectCaseStudies)[number];
type CaseStudyCardProject = (typeof featuredProjects)[number] & {
  caseStudy: CaseStudy | undefined;
};

// The tabs that are shown. "work-history", "samples" (Work samples) and "certifications" are hidden
// for now: their views, components and data are all still below. To bring a tab back, add its name
// to this list.
const viewOrder: ViewMode[] = ["websites", "case-studies"];
const viewLabels: Record<ViewMode, string> = {
  websites: "Websites I've built",
  "case-studies": "Case studies",
  "work-history": "Work history",
  samples: "Work samples",
  certifications: "Certifications",
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ReferencePortfolioHome() {
  const [view, setView] = useState<ViewMode>("websites");
  const contentScrollRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const pendingView = getPendingCaseStudyReturnView();
    if (isViewMode(pendingView)) setView(pendingView);
  }, []);

  const workSamples = useMemo(
    () =>
      featuredProjects.map((project) => ({
        ...project,
        caseStudy: projectCaseStudies.find((item) => item.slug === project.slug),
      })),
    [],
  );

  const sampleScreens = useMemo(() => {
    const screens = projectCaseStudies.flatMap((project) =>
      project.gallery.map((image, index) => ({
        image,
        title: `${project.title} screenshot ${index + 1} of ${project.gallery.length}`,
        project: project.title,
        slug: project.slug,
        position: index + 1,
        total: project.gallery.length,
        sortKey: `${project.slug}-${index}`,
      })),
    );

    // Hero sections lead (one per project, then the extra hero variants); the rest are shuffled.
    return screens.sort((first, second) => {
      const firstRank = getHeroRank(first.image) ?? Number.POSITIVE_INFINITY;
      const secondRank = getHeroRank(second.image) ?? Number.POSITIVE_INFINITY;
      if (firstRank !== secondRank) return firstRank < secondRank ? -1 : 1;
      return getShuffleRank(first.sortKey) - getShuffleRank(second.sortKey);
    });
  }, []);

  const orderedCertifications = useMemo(
    () =>
      [...certifications].sort(
        (first, second) =>
          getCertificationPriority(first.title) - getCertificationPriority(second.title),
      ),
    [],
  );

  const handleViewChange = (nextView: ViewMode) => {
    if (nextView === view) return;

    setView(nextView);

    // The whole page scrolls, so a new tab starts at the top of the page on wide screens and at
    // the top of the tab content on phones, where the profile sits above it.
    window.requestAnimationFrame(() => {
      if (window.innerWidth < 1024) {
        contentScrollRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });
  };

  return (
    <main className="sam-page min-h-screen bg-white text-[#111111]">
      <div className="grid min-h-screen lg:grid-cols-[clamp(280px,24vw,330px)_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
        <IdentityPanel />

        <section
          ref={contentScrollRef}
          id="portfolio-panel"
          role="tabpanel"
          aria-labelledby={`tab-${view}`}
          tabIndex={0}
          data-case-study-scroll-root="home-work"
          data-case-study-return-view={view}
          className="min-w-0 border-[#111111]/10 lg:border-l"
        >
          <div className="sticky top-0 z-20 border-b border-[#111111]/10 bg-white/92 px-3 py-2.5 backdrop-blur-md sm:px-8 sm:py-3 lg:px-8">
            <ViewSwitcher value={view} onChange={handleViewChange} />
          </div>

          <div className="px-3 py-4 sm:px-8 sm:py-5 lg:px-8">
            <h2 className="sr-only">{viewLabels[view]}</h2>
            <AnimatePresence mode="wait">
              {view === "samples" ? (
                <motion.div
                  key="samples"
                  className="grid gap-7"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {sampleScreens.map((sample) => (
                    <WorkSampleCard key={`${sample.title}-${sample.image}`} sample={sample} />
                  ))}
                </motion.div>
              ) : view === "websites" ? (
                <motion.div
                  key="websites"
                  className="grid gap-8"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {workSamples.map((project) => (
                    <WebsiteFrame key={project.slug} project={project} />
                  ))}
                  <CtaBlock />
                  <Faq />
                </motion.div>
              ) : view === "case-studies" ? (
                <motion.div
                  key="case-studies"
                  className="grid gap-10"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {workSamples.map((project) => (
                    <CaseStudyCover key={project.slug} project={project} />
                  ))}
                </motion.div>
              ) : view === "work-history" ? (
                <motion.div
                  key="work-history"
                  className="grid gap-0"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {workHistory.map((entry, index) => (
                    <WorkHistoryCard
                      key={`${entry.company}-${entry.role}`}
                      entry={entry}
                      index={index}
                      total={workHistory.length}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="certifications"
                  className="grid gap-8 overflow-x-clip py-2"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="max-w-2xl text-[1.05rem] font-medium leading-7 tracking-[-0.035em] text-[#111111]/58">
                    I run projects on a clear process.
                  </p>
                  {orderedCertifications.map((certificate, index) => (
                    <CertificateCard
                      key={certificate.image}
                      certificate={certificate}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

function IdentityPanel() {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      className="sam-identity-panel flex min-h-0 flex-col gap-12 px-8 py-8 sm:px-10 sm:py-10 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:self-start lg:justify-between lg:gap-0 lg:overflow-y-auto lg:[scrollbar-width:thin] lg:px-8 lg:py-2 xl:px-8 xl:py-5"
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, type: "spring", bounce: 0, stiffness: 90 }}
    >
      <div>
        <div className="sam-status-wrap flex justify-end">
          <StatusBadge />
        </div>

        <div className="sam-profile-block mt-7 sm:mt-10 lg:mt-2 xl:mt-5">
          <figure className="h-[106px] w-[106px] overflow-hidden rounded-full bg-[#ededed] lg:h-[76px] lg:w-[76px] xl:h-[92px] xl:w-[92px]">
            <img
              src={profilePhoto}
              alt="Oluwatomisin Isogun"
              className="h-full w-full object-cover object-top"
            />
          </figure>

          <div className="sam-name mt-5 text-[1.25rem] font-medium leading-none tracking-[-0.045em] text-[#050505] lg:mt-2 lg:text-[1.05rem] xl:mt-3 xl:text-[1.125rem]">
            {profile.name}
          </div>

          <h1 className="sam-headline mt-7 max-w-[455px] text-[clamp(1.5rem,7vw,1.9rem)] font-medium leading-[1.2] tracking-[-0.05em] text-[#050505] lg:mt-4 lg:max-w-[360px] lg:text-[1.3rem] xl:mt-5 xl:max-w-[390px] xl:text-[1.625rem]">
            <span className="text-[#111111]/48">I build fast, good-looking websites </span>
            that turn visitors into customers.
          </h1>

          <p className="mt-5 max-w-[445px] text-[0.98rem] font-normal leading-[1.4] tracking-[-0.03em] text-[#111111]/62 lg:mt-3 lg:max-w-[350px] lg:text-[0.8rem] lg:leading-[1.35] xl:mt-4 xl:max-w-[390px] xl:text-[0.88rem]">
            Mobile-friendly websites with online booking, ordering, and contact forms, built to help
            your business get found and get contacted. Fixed price, no surprises.
          </p>

          <div className="sam-action-row mt-9 flex flex-wrap gap-3 lg:mt-4 lg:gap-2 xl:mt-5">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="sam-pill sam-tilt-button bg-[#1a1a1a] text-white hover:bg-black"
            >
              <Calendar className="h-[18px] w-[18px]" aria-hidden />
              Book a free call
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="sam-pill sam-tilt-button bg-[#ededed] text-[#1a1a1a] hover:bg-white"
            >
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
              Chat on WhatsApp
            </a>
          </div>

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 py-2 text-[0.84rem] font-normal tracking-[-0.02em] text-[#111111]/50 underline-offset-4 transition-colors hover:text-[#111111] hover:underline lg:-mt-0.5 lg:py-1.5 lg:text-[0.76rem]"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden />
            Resume
          </a>

          <TrustLine />

          <div className="sam-stack-block mt-5 max-w-[390px] lg:mt-3 xl:mt-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#111111]/32">
              Built with
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.slice(0, 8).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#f3f3f3] px-2.5 py-1 text-[0.7rem] font-medium tracking-[-0.02em] text-[#111111]/45 lg:px-2 lg:py-0.5 lg:text-[0.66rem] xl:text-[0.7rem]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sam-contact-footer mt-10 pb-1 lg:mt-3 xl:mt-5">
        <p className="text-[1.15rem] font-medium leading-tight tracking-[-0.045em] lg:text-[0.92rem] xl:text-[1rem]">
          Need a website that brings in more customers? Let's talk.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 lg:mt-2 lg:gap-2 xl:mt-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="sam-social-pill"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={profile.facebook}
            target="_blank"
            rel="noreferrer"
            className="sam-social-pill"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" aria-hidden />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="sam-social-pill">
            LinkedIn
          </a>
          <a href={profile.upwork} target="_blank" rel="noreferrer" className="sam-social-pill">
            Upwork
          </a>
          <a href={`mailto:${profile.email}`} className="sam-social-pill">
            Email
          </a>
        </div>
      </div>
    </motion.aside>
  );
}

function TrustLine() {
  return (
    <div className="sam-dev-note mt-4 max-w-[420px] sm:max-w-[460px] lg:mt-3 lg:max-w-[335px] xl:mt-4 xl:max-w-[355px]">
      <p className="text-[0.86rem] font-medium leading-[1.35] tracking-[-0.02em] text-[#111111]/55 lg:text-[0.76rem] xl:text-[0.82rem]">
        Fixed price. Fast delivery. You own your site.
      </p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="sam-status-badge sam-handwritten inline-flex w-fit items-center gap-2 text-[0.95rem] text-[#111111]/68 lg:text-[0.85rem]">
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
    <div
      role="tablist"
      aria-label="Portfolio sections"
      className="relative flex h-[28px] w-fit min-w-[300px] max-w-full items-center overflow-x-auto rounded-full bg-[#ededed] p-0 sm:h-[30px] max-[520px]:min-w-0 max-[520px]:w-full"
    >
      {viewOrder.map((item) => {
        const active = value === item;

        return (
          <button
            key={item}
            id={`tab-${item}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls="portfolio-panel"
            onClick={() => onChange(item)}
            className={`relative z-10 h-full flex-1 whitespace-nowrap rounded-full px-2 text-[0.68rem] font-medium max-[359px]:px-1 max-[359px]:text-[0.62rem] tracking-[-0.035em] transition-colors sm:px-4 sm:text-[0.74rem] ${
              active ? "text-white" : "text-[#111111]/50 hover:text-[#111111]/80"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="sam-active-tab"
                className="absolute inset-0 -z-10 rounded-full bg-[#1a1a1a]"
                transition={{ type: "spring", stiffness: 420, damping: 35 }}
              />
            ) : null}
            {item === "websites" ? (
              <>
                <span className="min-[521px]:hidden">Websites</span>
                <span className="max-[520px]:hidden">{viewLabels[item]}</span>
              </>
            ) : (
              viewLabels[item]
            )}
          </button>
        );
      })}
    </div>
  );
}

function CertificateCard({
  certificate,
  index,
}: {
  certificate: (typeof certifications)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const fromLeft = index % 2 === 0;

  return (
    <motion.article
      className="group overflow-hidden rounded-[26px] bg-[#ededed]"
      initial={
        reduce
          ? false
          : { opacity: 0, x: fromLeft ? -44 : 44, y: 34, rotate: fromLeft ? -3.5 : 3.5 }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      whileHover={reduce ? {} : { y: -6, scale: 1.012 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
    >
      <SkeletonImage src={certificate.image} alt={certificate.title} className="bg-white" />
      <motion.div
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 pb-4 pt-4 sm:px-5"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      >
        <p className="min-w-0 text-[0.92rem] font-semibold tracking-[-0.035em]">
          {certificate.issuer}
          <span className="font-medium text-[#111111]/50"> · {certificate.signal}</span>
        </p>
        <span className="rounded-full bg-white px-3 py-1 text-[0.74rem] font-semibold tracking-[-0.02em] text-[#111111]/55">
          {certificate.theme}
        </span>
      </motion.div>
    </motion.article>
  );
}

function WorkSampleCard({
  sample,
}: {
  sample: {
    image: string;
    title: string;
    project: string;
    slug: string;
    position: number;
    total: number;
  };
}) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  // Visibility is tracked on an unclipped wrapper. Observing an element that is itself clipped
  // away (clip-path) never reports it as visible, so the reveal would never start.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: "some" });
  const show = reduce || seen;

  return (
    <div ref={ref}>
      <motion.article
        className="relative rounded-[24px] bg-[#ededed]"
        initial={false}
        animate={
          show
            ? { clipPath: "inset(0 0 0% 0 round 24px)", y: 0 }
            : { clipPath: "inset(0 0 100% 0 round 24px)", y: 36 }
        }
        transition={{ duration: reduce ? 0 : 0.95, ease }}
      >
        <div className="relative overflow-hidden rounded-[24px] bg-white">
          <motion.div
            initial={false}
            animate={
              show ? { scale: 1, filter: "grayscale(0)" } : { scale: 1.14, filter: "grayscale(1)" }
            }
            transition={{ duration: reduce ? 0 : 1.2, ease }}
          >
            <SkeletonImage src={sample.image} alt={sample.title} />
          </motion.div>
          <motion.div
            className="absolute left-3 top-3"
            initial={false}
            animate={show ? { x: 0, opacity: 1 } : { x: -24, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : 0.55 }}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: sample.slug }}
              onClick={rememberCaseStudyReturn}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1a1a1a]/88 px-3 py-1.5 text-[0.74rem] font-semibold tracking-[-0.02em] text-white backdrop-blur-sm transition-colors hover:bg-black"
              aria-label={`${sample.project}, screenshot ${sample.position} of ${sample.total}. Open case study`}
            >
              {sample.project}
              <span className="font-mono text-[0.66rem] text-white/55">
                {sample.position}/{sample.total}
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

function WorkHistoryCard({
  entry,
  index,
  total,
}: {
  entry: WorkHistoryEntry;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const isCurrent = /present/i.test(entry.period);
  const lineSpan = isFirst ? "top-7 bottom-0" : isLast ? "top-0 h-7" : "top-0 bottom-0";

  const chip =
    "rounded-full bg-white px-3 py-1 text-[0.78rem] font-semibold tracking-[-0.02em] text-[#111111]/55";

  return (
    <article className="grid grid-cols-[28px_minmax(0,1fr)] md:grid-cols-[150px_28px_minmax(0,1fr)]">
      <div className="hidden pr-4 pt-[1.6rem] text-right md:block">
        <p className="text-[0.95rem] font-semibold leading-tight tracking-[-0.03em] text-[#111111]/65">
          {entry.period}
        </p>
        {isCurrent ? (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#1a1a1a] px-2.5 py-1 text-[0.7rem] font-semibold tracking-[-0.01em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f06a]" aria-hidden />
            Now
          </span>
        ) : null}
      </div>

      <div className="relative" aria-hidden>
        {!(isFirst && isLast) ? (
          <span className={`absolute left-1/2 w-px -translate-x-1/2 bg-[#111111]/12 ${lineSpan}`}>
            <motion.span
              className="block h-full w-full origin-top bg-[#111111]"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ margin: "0px 0px -35% 0px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </span>
        ) : null}
        {isCurrent ? (
          <>
            {reduce ? null : (
              <span
                className="absolute left-1/2 top-7 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f06a]"
                style={{ animation: "sam-status-breathe 1.6s ease-in-out infinite" }}
              />
            )}
            <motion.span
              className="absolute left-1/2 top-7 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d45a] shadow-[0_0_14px_rgb(0_240_106/0.7)]"
              initial={reduce ? false : { scale: 0.4 }}
              whileInView={{ scale: 1 }}
              viewport={{ margin: "0px 0px -35% 0px" }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
            />
          </>
        ) : (
          <motion.span
            className="absolute left-1/2 top-7 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#111111]"
            initial={reduce ? false : { scale: 0.6, backgroundColor: "#ffffff" }}
            whileInView={{ scale: 1, backgroundColor: "#111111" }}
            viewport={{ margin: "0px 0px -35% 0px" }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          />
        )}
      </div>

      <motion.div
        className="pb-8 md:pb-10"
        initial={reduce ? false : { y: 44, scale: 0.97 }}
        whileInView={{ y: 0, scale: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
      >
        <div className="overflow-hidden rounded-[26px] bg-[#ededed] p-5 text-[#111111] sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${chip} md:hidden`}>{entry.period}</span>
            <span className={chip}>{entry.location}</span>
          </div>

          <h3 className="mt-5 max-w-4xl text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.08em]">
            {entry.role}
          </h3>
          <h4 className="mt-3 text-[clamp(1.05rem,2.2vw,1.35rem)] font-semibold tracking-[-0.045em] text-[#111111]/55">
            {entry.company}
          </h4>

          <p className="mt-5 max-w-3xl text-[1rem] font-medium leading-7 tracking-[-0.035em] text-[#111111]/60 sm:text-[1.05rem]">
            {entry.summary}
          </p>

          {entry.points.length ? (
            <ol className="mt-6 max-w-3xl divide-y divide-[#111111]/10 overflow-hidden rounded-[20px] bg-white px-4">
              {entry.points.map((point, pointIndex) => (
                <motion.li
                  key={point}
                  className="flex gap-4 py-3.5"
                  initial={reduce ? false : { x: -18 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 20,
                    delay: pointIndex * 0.07,
                  }}
                >
                  <span
                    className="pt-0.5 font-mono text-[0.72rem] font-semibold text-[#111111]/35"
                    aria-hidden
                  >
                    {String(pointIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/72">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ol>
          ) : null}

          {entry.products?.length ? (
            <div className="mt-6">
              <p className="text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
                Shipped products
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {entry.products.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-1.5 rounded-[20px] bg-[#1a1a1a] p-4 text-white transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-between gap-4 text-[1.02rem] font-semibold tracking-[-0.04em]">
                      {product.name}
                      <ArrowUpRight
                        className="h-4 w-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="text-[0.88rem] font-medium leading-5 tracking-[-0.03em] text-white/55">
                      {product.description}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 border-t border-[#111111]/10 pt-4">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-[#111111]/38">
              Tools used
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${entry.company} tools`}>
              {entry.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white px-2.5 py-1 text-[0.74rem] font-medium tracking-[-0.01em] text-[#111111]/55"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

/**
 * One project in the "Websites I've built" tab, shown the way samwrks.in shows its work: a large
 * picture of the site in a rounded frame, then one link to the case study. The picture itself is
 * a link for mouse and touch users; it is hidden from keyboard and screen readers, who get the
 * text link (which names the project and says when it is a concept) instead of two stops.
 */
function WebsiteFrame({ project }: { project: CaseStudyCardProject }) {
  const reduce = useReducedMotion();
  const cover = project.caseStudy?.cover;
  if (!cover) return null;

  const concept = project.labels.includes("Concept project");
  const goToCaseStudy = rememberCaseStudyReturn;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        onClick={goToCaseStudy}
        aria-hidden
        tabIndex={-1}
        className="group block overflow-hidden rounded-[26px] bg-[#ededed]"
      >
        <div className="transition-transform duration-700 group-hover:scale-[1.012] motion-reduce:transition-none">
          <SkeletonImage
            src={cover}
            alt={`${project.title}${concept ? " (concept project)" : ""} website preview`}
          />
        </div>
      </Link>

      <CaseStudyLink slug={project.slug} title={project.title} concept={concept} />
    </motion.article>
  );
}

/** The one underlined link under a project, as on samwrks.in: "Read full case study" and an arrow. */
function CaseStudyLink({
  slug,
  title,
  concept,
}: {
  slug: string;
  title: string;
  concept: boolean;
}) {
  return (
    <div className="mt-3 flex justify-end">
      <Link
        to="/projects/$slug"
        params={{ slug }}
        onClick={rememberCaseStudyReturn}
        className="group inline-flex items-center gap-2 border-b border-[#111111] pb-0.5 text-[1.05rem] font-medium tracking-[-0.035em] text-[#111111] transition-opacity hover:opacity-65"
      >
        Read full case study
        <span className="sr-only">
          : {title}
          {concept ? ", concept project" : ""}
        </span>
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}

/**
 * One project in the "Case studies" tab, in the style of samwrks.in's case study covers: a tinted
 * card with the kind of project at the top, a framed picture of the site, the project name in
 * large type and a handwritten byline, then the link to the full case study. The tint comes from
 * the project's own accent colour. The picture is a link for mouse and touch, and is hidden from
 * keyboard and screen readers, who use the text link instead.
 */
function CaseStudyCover({ project }: { project: CaseStudyCardProject }) {
  const reduce = useReducedMotion();
  const study = project.caseStudy;
  if (!study?.cover) return null;

  const concept = project.labels.includes("Concept project");
  const tint = { "--accent": project.accent } as MotionStyle;

  return (
    <motion.article
      style={tint}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        onClick={rememberCaseStudyReturn}
        aria-hidden
        tabIndex={-1}
        className="group block overflow-hidden rounded-[26px] border border-[color-mix(in_oklab,var(--accent)_26%,white)] bg-[color-mix(in_oklab,var(--accent)_10%,white)] px-5 pt-7 text-center sm:px-10 sm:pt-10"
      >
        {concept ? (
          <span className="mb-4 inline-block rounded-full bg-white/80 px-3 py-1 text-[0.74rem] font-semibold tracking-[-0.01em] text-[var(--accent)]">
            Concept project
          </span>
        ) : null}
        <p className="text-[clamp(1.5rem,4.4vw,3.1rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--accent)]">
          {study.eyebrow}
        </p>

        <div className="mx-auto mt-6 w-full max-w-[640px] overflow-hidden rounded-t-[20px] border-[7px] border-b-0 border-[#111111] bg-white shadow-[0_24px_60px_-28px_rgb(0_0_0/0.5)]">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={study.cover}
              alt={`${project.title} website preview`}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="pb-7 pt-6 sm:pb-9">
          <p className="text-[clamp(2.4rem,9vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.06em] text-[var(--accent)] [overflow-wrap:anywhere]">
            {project.title}
          </p>
          <p className="sam-handwritten mt-4 flex items-center justify-center gap-2 text-[1.2rem] text-[#111111]/70">
            <img
              src={profilePhoto}
              alt="Oluwatomisin Isogun"
              className="h-7 w-7 rounded-full object-cover"
            />
            -by Oluwatomisin
          </p>
        </div>
      </Link>

      <CaseStudyLink slug={project.slug} title={project.title} concept={concept} />
    </motion.article>
  );
}

function getShuffleRank(value: string) {
  return (
    Array.from(value).reduce((rank, char, index) => rank + char.charCodeAt(0) * (index + 17), 0) %
    997
  );
}

function getCertificationPriority(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("scrum")) return 0;
  if (lowerTitle.includes("six sigma")) return 1;
  if (lowerTitle.includes("aspire")) return 2;
  if (lowerTitle.includes("project management")) return 3;

  return 10;
}

function isViewMode(value: unknown): value is ViewMode {
  return viewOrder.some((item) => item === value);
}
