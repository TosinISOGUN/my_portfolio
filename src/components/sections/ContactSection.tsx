import { useMemo, useState } from "react";
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import resumePdf from "@/assets/OLUWATOMISIN_ISOGUN_RESUME.pdf";
import { profile } from "@/data/portfolio";
import { RevealSection } from "./RevealSection";
import { SectionLabel } from "./SectionLabel";

const projectTypes = {
  role: { label: "Frontend role", range: null },
  dashboard: { label: "Dashboard/interface build", range: [1000, 3000] },
  marketplace: { label: "Marketplace/product frontend", range: [2000, 6000] },
  landing: { label: "Premium landing page", range: [300, 900] },
};

const timelines = {
  relaxed: { label: "4+ weeks", multiplier: 1 },
  focused: { label: "2-3 weeks", multiplier: 1.15 },
  urgent: { label: "Under 2 weeks", multiplier: 1.35 },
};

const complexity = {
  focused: { label: "Focused", multiplier: 0.85 },
  standard: { label: "Standard", multiplier: 1 },
  complex: { label: "Complex", multiplier: 1.35 },
};

export function ContactSection() {
  const [projectType, setProjectType] = useState<keyof typeof projectTypes>("role");
  const [timeline, setTimeline] = useState<keyof typeof timelines>("focused");
  const [scope, setScope] = useState<keyof typeof complexity>("standard");
  const [message, setMessage] = useState("");
  const isRoleInquiry = projectType === "role";

  const estimate = useMemo(() => {
    const range = projectTypes[projectType].range;
    if (!range) return "Recruiter conversation";

    const multiplier = timelines[timeline].multiplier * complexity[scope].multiplier;
    const low = Math.round((range[0] * multiplier) / 50) * 50;
    const high = Math.round((range[1] * multiplier) / 100) * 100;

    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
  }, [projectType, scope, timeline]);

  const subject = `Portfolio inquiry: ${projectTypes[projectType].label}`;
  const body = [
    `Project type: ${projectTypes[projectType].label}`,
    ...(isRoleInquiry
      ? ["Hiring path: Resume, GitHub, and LinkedIn review"]
      : [`Timeline: ${timelines[timeline].label}`, `Scope: ${complexity[scope].label}`]),
    `Estimator: ${estimate}`,
    "",
    message,
  ].join("\n");

  return (
    <RevealSection id="contact" className="bg-charcoal px-5 py-16 text-cream sm:px-8 sm:py-20 lg:px-14 xl:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.58fr)] xl:items-start xl:gap-16">
        <div>
          <SectionLabel
            eyebrow="Contact"
            title="Tell me what you are building."
            copy="Use the estimator for product work, or choose frontend role if you are hiring. Either way, the next step is a focused conversation."
            tone="light"
          />
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-charcoal transition-transform hover:-translate-y-1"
            >
              <FileText className="h-4 w-4" aria-hidden />
              View Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform hover:-translate-y-1"
              aria-label="Open GitHub profile"
            >
              <Github className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform hover:-translate-y-1"
              aria-label="Open LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <form className="w-full max-w-[620px] rounded-lg bg-cream p-4 text-charcoal sm:p-5 lg:p-6 xl:max-w-[520px] xl:justify-self-end">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
                {isRoleInquiry ? "Next Step" : "Estimator"}
              </p>
              <p className="mt-2 font-display text-[clamp(1.65rem,4vw,2.4rem)] leading-none tracking-normal">
                {estimate}
              </p>
              <p className="mt-3 max-w-sm font-sans text-base leading-7 text-charcoal/62">
                {isRoleInquiry
                  ? "For hiring teams, this opens a focused email with the role context and your preferred next step."
                  : "A practical early planning range for product work. Final scope depends on data complexity, integrations, and review cycles."}
              </p>
            </div>
            <Mail className="h-6 w-6 text-charcoal/45" aria-hidden />
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="font-sans text-sm font-black">Inquiry type</span>
              <select
                value={projectType}
                onChange={(event) => setProjectType(event.target.value as keyof typeof projectTypes)}
                className="rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal outline-none focus:border-tangerine"
              >
                {Object.entries(projectTypes).map(([value, item]) => (
                  <option key={value} value={value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            {isRoleInquiry ? (
              <div className="rounded-lg border border-charcoal/10 bg-white px-4 py-4">
                <p className="font-sans text-sm font-black text-charcoal">Recruiter path</p>
                <p className="mt-2 font-sans text-base leading-7 text-charcoal/64">
                  Best for frontend roles, contract interviews, technical screens, and resume follow-up.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="font-sans text-sm font-black">Timeline</span>
                  <select
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value as keyof typeof timelines)}
                    className="rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal outline-none focus:border-tangerine"
                  >
                    {Object.entries(timelines).map(([value, item]) => (
                      <option key={value} value={value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="font-sans text-sm font-black">Scope</span>
                  <select
                    value={scope}
                    onChange={(event) => setScope(event.target.value as keyof typeof complexity)}
                    className="rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal outline-none focus:border-tangerine"
                  >
                    {Object.entries(complexity).map(([value, item]) => (
                      <option key={value} value={value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <label className="grid gap-2">
              <span className="font-sans text-sm font-black">Short brief</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder="What are you hiring for or trying to build?"
                className="resize-none rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm leading-6 text-charcoal outline-none placeholder:text-charcoal/40 focus:border-tangerine"
              />
            </label>
          </div>

          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-tangerine px-5 py-3 font-sans text-sm font-black uppercase tracking-[0.1em] text-cream transition-transform hover:-translate-y-1"
          >
            {isRoleInquiry ? "Email About Role" : "Send Inquiry"}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </form>
      </div>
    </RevealSection>
  );
}
