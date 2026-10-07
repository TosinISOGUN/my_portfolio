import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Calendar, Github, Send } from "lucide-react";
import resumePdf from "@/assets/OLUWATOMISIN_ISOGUN_RESUME.pdf";
import { SkeletonImage } from "@/components/SkeletonImage";
import profilePhoto from "@/assets/Photograph - Oluwatomisin Isogun.jpg";
import {
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

type ViewMode = "case-studies" | "work-history" | "samples" | "certifications";
type CaseStudy = (typeof projectCaseStudies)[number];
type CaseStudyCardProject = (typeof featuredProjects)[number] & {
  caseStudy: CaseStudy | undefined;
};

const viewOrder: ViewMode[] = ["case-studies", "work-history", "samples", "certifications"];
const viewLabels: Record<ViewMode, string> = {
  "case-studies": "Case studies",
  "work-history": "Work history",
  samples: "Work samples",
  certifications: "Certifications",
};

const bookingUrl = "https://cal.com/oluwatomisin-isogun-disku5/30min?overlayCalendar=true";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ReferencePortfolioHome() {
  const [view, setView] = useState<ViewMode>("case-studies");
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

    window.requestAnimationFrame(() => {
      contentScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });

      if (window.innerWidth < 1024) {
        contentScrollRef.current?.scrollIntoView({ block: "start" });
      }
    });
  };

  return (
    <main className="sam-page min-h-screen bg-white text-[#111111] lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-[clamp(300px,26vw,380px)_minmax(0,1fr)] xl:grid-cols-[460px_minmax(0,1fr)]">
        <IdentityPanel />

        <section
          ref={contentScrollRef}
          id="portfolio-panel"
          role="tabpanel"
          aria-labelledby={`tab-${view}`}
          tabIndex={0}
          data-case-study-scroll-root="home-work"
          data-case-study-return-view={view}
          className="min-w-0 border-[#111111]/10 lg:h-screen lg:overflow-y-auto lg:border-l"
        >
          <div className="sticky top-0 z-20 border-b border-[#111111]/10 bg-white/92 px-3 py-4 backdrop-blur-md sm:px-8 sm:py-5 lg:px-8">
            <ViewSwitcher value={view} onChange={handleViewChange} />
          </div>

          <div className="px-3 py-4 sm:px-8 sm:py-5 lg:px-8">
            <h2 className="sr-only">{viewLabels[view]}</h2>
            <AnimatePresence mode="wait">
              {view === "samples" ? (
                <motion.div
                  key="samples"
                  className="-mx-1 grid gap-7 sm:-mx-4 lg:-mx-5 xl:-mx-6"
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
    </main>
  );
}

function IdentityPanel() {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      className="sam-identity-panel flex min-h-0 flex-col gap-12 px-8 py-8 sm:px-10 sm:py-10 lg:h-screen lg:min-h-0 lg:justify-between lg:gap-0 lg:overflow-y-auto lg:[scrollbar-width:thin] lg:px-8 lg:py-2 xl:px-8 xl:py-5"
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
              className="h-full w-full origin-top translate-x-[4%] scale-[1.12] object-cover object-top"
            />
          </figure>

          <h1 className="mt-5 text-[1.45rem] font-semibold leading-none tracking-[-0.06em] text-[#050505] lg:mt-2 lg:text-[1.12rem] xl:mt-3 xl:text-[1.28rem]">
            {profile.name}
          </h1>

          <h2 className="mt-8 max-w-[455px] text-[clamp(1.75rem,8vw,2.35rem)] font-semibold leading-[1.16] tracking-[-0.075em] text-[#050505] lg:mt-4 lg:max-w-[360px] lg:text-[1.58rem] xl:mt-5 xl:max-w-[390px] xl:text-[1.95rem]">
            <span className="text-[#111111]/48">Hey, I'm Oluwatomisin, a </span>
            frontend developer for product teams.
          </h2>

          <p className="mt-7 max-w-[445px] text-[1.06rem] font-medium leading-[1.42] tracking-[-0.045em] text-[#111111]/58 lg:mt-4 lg:max-w-[350px] lg:text-[0.84rem] lg:leading-[1.3] xl:mt-5 xl:max-w-[390px] xl:text-[0.95rem]">
            I build React and TypeScript interfaces that feel premium and turn complex workflows
            into actual product momentum. I care about the small stuff, spacing, states,
            performance, and the one extra click that should not be there.
          </p>

          <div className="sam-stack-block mt-6 max-w-[390px] lg:mt-3 xl:mt-4">
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

          <div className="sam-action-row mt-9 flex flex-wrap gap-3 lg:mt-4 lg:gap-2 xl:mt-5">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="sam-pill sam-tilt-button bg-[#1a1a1a] text-white hover:bg-black"
            >
              <Calendar className="h-[18px] w-[18px]" aria-hidden />
              Book a call
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="sam-pill sam-tilt-button bg-[#ededed] text-[#1a1a1a] hover:bg-white"
            >
              <Send className="h-[18px] w-[18px]" aria-hidden />
              Message me
            </a>
          </div>

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="sam-resume group mt-3 inline-flex items-center gap-2 rounded-full border border-[#111111]/25 bg-white px-4 py-2 text-[0.92rem] font-semibold tracking-[-0.035em] text-[#111111] transition-colors hover:bg-[#1a1a1a] hover:text-white lg:mt-1.5 lg:px-3 lg:py-1 lg:text-[0.8rem] xl:mt-2 xl:px-3.5 xl:py-1 xl:text-[0.88rem]"
          >
            <ArrowDownToLine className="sam-resume-icon h-4 w-4" aria-hidden />
            View resume
            <span className="rounded-full bg-[#00d45a]/18 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[#0a6b34] transition-colors group-hover:bg-white/15 group-hover:text-[#7dffb0]">
              PDF
            </span>
          </a>

          <DevJokeTicker />
        </div>
      </div>

      <div className="sam-contact-footer mt-10 pb-1 lg:mt-3 xl:mt-5">
        <p className="text-[1.35rem] font-semibold leading-tight tracking-[-0.065em] lg:text-[1rem] xl:text-[1.12rem]">
          got a project in mind? let's chat :)
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

const devJokes = [
  "Frontend is just convincing rectangles to behave.",
  "I write bugs professionally, then fix them as a service.",
  "CSS is easy until the div develops ambition.",
  "Git happens. Ship anyway.",
  "I center divs and occasionally question reality.",
  "My code works. I just want to know why.",
  "React state: because feelings need management too.",
  "I asked JavaScript for truth. It said maybe.",
  "Naming things is half the job. The other half is renaming them.",
  "I do not fear bugs. I have console.log.",
  "A clean UI is a love letter to future users.",
  "Cache cleared. Confidence restored.",
  "This layout was aligned through patience and snacks.",
  "Production is just staging with witnesses.",
  "Pixels behave better after coffee.",
  "If it looks simple, the CSS probably negotiated hard.",
  "I make buttons feel like they know their purpose.",
  "The best animation is the one nobody has to wait for.",
  "Ship small. Learn fast. Refactor kindly.",
  "Code is poetry until the deadline joins the meeting.",
  "A div without CSS is just a box with dreams.",
  "I turn product anxiety into loading states.",
  "The bug was shy until I shared my screen.",
  "Responsive design is empathy with breakpoints.",
  "I trust the process. I also trust the preview build.",
  "JavaScript said undefined. I felt that.",
  "A good button should look clickable and feel inevitable.",
  "I debug in dark mode so the errors respect the mood.",
  "The DOM remembers everything except why I named it that.",
  "I measure twice and still inspect element.",
  "Types save lives, mostly mine at 2am.",
  "Every pixel has a job. Some need supervision.",
  "404: Motivation not found. Coffee retry pending.",
  "I like my components reusable and my margins explainable.",
  "The console knows what I did last deploy.",
  "A smooth flow is just fewer tiny betrayals.",
  "I speak fluent product, CSS, and polite urgency.",
  "Some days you ship. Some days you teach z-index manners.",
  "The best UX is invisible until it is missing.",
  "I make edge cases feel included.",
];

function DevJokeTicker() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % devJokes.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduce]);

  return (
    <div className="sam-dev-note mt-8 max-w-[420px] border-l border-[#111111]/10 pl-4 sm:max-w-[460px] lg:mt-3 lg:max-w-[335px] xl:mt-10 xl:max-w-[355px]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#111111]/28">
        dev notes, lol
      </p>
      <div className="relative mt-2 min-h-[44px] overflow-hidden lg:min-h-[34px] xl:min-h-[52px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={devJokes[index] ?? index}
            className="text-[0.88rem] font-medium leading-[1.35] tracking-[-0.035em] text-[#111111]/45 lg:text-[0.78rem] lg:leading-[1.25] xl:text-[0.95rem] xl:leading-[1.35]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {devJokes[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
function StatusBadge() {
  return (
    <div className="sam-status-badge sam-handwritten inline-flex w-fit items-center gap-2 text-[1.12rem] text-[#111111]/68 lg:text-[1rem]">
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
      className="relative flex h-[32px] w-fit min-w-[470px] max-w-full items-center overflow-x-auto rounded-full bg-[#ededed] p-0 sm:h-[34px] max-[520px]:min-w-0 max-[520px]:w-full"
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
            className={`relative z-10 h-full flex-1 whitespace-nowrap rounded-full px-2 text-[0.7rem] font-medium max-[359px]:px-1 max-[359px]:text-[0.64rem] tracking-[-0.035em] transition-colors sm:px-4 sm:text-[0.78rem] ${
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
            {viewLabels[item]}
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
      className="group rounded-[26px] bg-[#ededed] p-2 sm:p-3"
      initial={
        reduce
          ? false
          : { opacity: 0, x: fromLeft ? -44 : 44, y: 34, rotate: fromLeft ? -3.5 : 3.5 }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      whileHover={reduce ? {} : { y: -6, scale: 1.012 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
    >
      <SkeletonImage
        src={certificate.image}
        alt={certificate.title}
        className="rounded-[20px] bg-white"
      />
      <motion.div
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-2 pb-1 pt-3 sm:px-1"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
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
  const seen = useInView(ref, { once: true, amount: 0.12 });
  const show = reduce || seen;

  return (
    <div ref={ref}>
      <motion.article
        className="relative rounded-[24px] bg-[#ededed] p-1 sm:p-2"
        initial={false}
        animate={
          show
            ? { clipPath: "inset(0 0 0% 0 round 24px)", y: 0 }
            : { clipPath: "inset(0 0 100% 0 round 24px)", y: 36 }
        }
        transition={{ duration: reduce ? 0 : 0.95, ease }}
      >
        <div className="relative overflow-hidden rounded-[20px] bg-white">
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
        viewport={{ once: true, amount: 0.12 }}
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

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${entry.company} stack`}>
            {entry.stack.map((item) => (
              <li
                key={item}
                className="rounded-full bg-[#1a1a1a] px-3 py-1.5 text-[0.8rem] font-semibold tracking-[-0.02em] text-white"
              >
                {item}
              </li>
            ))}
          </ul>

          {entry.points.length ? (
            <ol className="mt-6 max-w-3xl divide-y divide-[#111111]/10 overflow-hidden rounded-[20px] bg-white px-4">
              {entry.points.map((point, pointIndex) => (
                <motion.li
                  key={point}
                  className="flex gap-4 py-3.5"
                  initial={reduce ? false : { x: -18 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
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
        </div>
      </motion.div>
    </article>
  );
}

function CaseStudyCard({ project, index }: { project: CaseStudyCardProject; index: number }) {
  const reduce = useReducedMotion();
  const caseStudy = project.caseStudy;
  const orderedImages = getLandingFirstImages(project);
  const previewImages = orderedImages.slice(0, 3);
  const cover = orderedImages[0];

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
            alt={`${project.title} interface preview`}
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
              className="sam-pill bg-white text-[#111111] hover:bg-[#f2f2f2]"
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
  return (
    Array.from(value).reduce((rank, char, index) => rank + char.charCodeAt(0) * (index + 17), 0) %
    997
  );
}

function getLandingFirstImages(project: CaseStudyCardProject) {
  const gallery = project.caseStudy?.gallery.filter(Boolean) ?? [];
  const preferredCover = project.caseStudy?.cover ?? gallery[0];
  const remaining = gallery.filter((image) => image !== preferredCover);

  return [preferredCover, ...remaining].filter((image): image is string => Boolean(image));
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
