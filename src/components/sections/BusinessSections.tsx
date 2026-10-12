import type { ReactNode } from "react";
import { ArrowUpRight, Calendar, ChevronDown, Send } from "lucide-react";
import { bookingUrl, mockupUrl } from "@/data/portfolio";

/**
 * A visible reminder that a fact still needs the owner's decision.
 * Search the codebase for "TODO(owner)" to find every one before publishing.
 */
function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-[#fff1b8] px-1.5 py-0.5 font-mono text-[0.78em] font-semibold text-[#6b4f00]">
      TODO(owner): {children}
    </mark>
  );
}

const cardClass = "overflow-hidden rounded-[26px] bg-[#ededed] p-5 text-[#111111] sm:p-7";

const sectionHeading =
  "max-w-4xl text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.08em]";

export function ServicesBlock() {
  return (
    <section className={cardClass} aria-labelledby="services-heading">
      <h3 id="services-heading" className={sectionHeading}>
        A website, built in days.
      </h3>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[20px] bg-white p-4">
          <dt className="text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
            Price
          </dt>
          <dd className="mt-2 text-[0.98rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/75">
            Fixed price, from <Todo>price</Todo>
          </dd>
        </div>
        <div className="rounded-[20px] bg-white p-4">
          <dt className="text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
            What is included
          </dt>
          <dd className="mt-2 text-[0.98rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/75">
            <Todo>
              confirm scope, for example number of pages, booking or contact form, mobile-friendly,
              basic SEO, hosting handoff
            </Todo>
          </dd>
        </div>
        <div className="rounded-[20px] bg-white p-4">
          <dt className="text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
            Delivery time
          </dt>
          <dd className="mt-2 text-[0.98rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/75">
            <Todo>confirm, currently planned at 5 days</Todo>
          </dd>
        </div>
      </dl>
    </section>
  );
}

const steps = [
  {
    title: "Free mockup",
    copy: "Tell me about your business and I design a free homepage mockup, so you can see it before you decide.",
  },
  {
    title: "Build",
    copy: "I build your website so it works well on phones and computers.",
  },
  {
    title: "Review and changes",
    copy: "You look it over and tell me what to change.",
  },
  {
    title: "Launch",
    copy: "Your website goes live.",
  },
];

export function HowItWorks() {
  return (
    <section className={cardClass} aria-labelledby="how-it-works-heading">
      <h3 id="how-it-works-heading" className={sectionHeading}>
        How it works
      </h3>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-[20px] bg-white p-4">
            <span className="font-mono text-[0.72rem] font-semibold text-[#111111]/35" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-[1.05rem] font-semibold tracking-[-0.045em]">{step.title}</p>
            <p className="mt-2 text-[0.92rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/60">
              {step.copy}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WebsitesHeading() {
  return (
    <h3 className="mt-2 text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.08em]">
      Websites I've built
    </h3>
  );
}

export function CtaBlock() {
  return (
    <section
      className="overflow-hidden rounded-[26px] bg-[#1a1a1a] p-5 text-white sm:p-7"
      aria-labelledby="cta-heading"
    >
      <h3 id="cta-heading" className={sectionHeading}>
        Want a website like these?
      </h3>
      <p className="mt-4 max-w-xl text-[1rem] font-medium leading-7 tracking-[-0.035em] text-white/60">
        Book a free call, or ask for a free homepage mockup.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="sam-pill bg-white text-[#1a1a1a] hover:bg-[#f2f2f2]"
        >
          <Calendar className="h-[18px] w-[18px]" aria-hidden />
          Book a free call
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <a href={mockupUrl} className="sam-pill bg-white/12 text-white hover:bg-white/20">
          <Send className="h-[18px] w-[18px]" aria-hidden />
          Get a free homepage mockup
        </a>
      </div>
    </section>
  );
}

const faqs: { question: string; answer?: string; todo: string }[] = [
  {
    question: "Do I own the website?",
    answer: "Yes, you own your site.",
    todo: "confirm ownership terms",
  },
  {
    question: "What about hosting and domain?",
    todo: "confirm: who sets up and pays for hosting and the domain",
  },
  {
    question: "What if I need changes after launch?",
    todo: "confirm: what is included after launch and how later changes are priced",
  },
  {
    question: "How do payments work?",
    answer: "A deposit first, then the balance when your website is delivered.",
    todo: "confirm deposit amount and terms",
  },
];

export function Faq() {
  return (
    <section className={cardClass} aria-labelledby="faq-heading">
      <h3 id="faq-heading" className={sectionHeading}>
        Questions
      </h3>

      <div className="mt-6 grid gap-3">
        {faqs.map((item) => (
          <details key={item.question} className="group rounded-[20px] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-[1rem] font-semibold tracking-[-0.04em] [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-[#111111]/50 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="px-4 pb-4 text-[0.95rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/65">
              {item.answer ? `${item.answer} ` : null}
              <Todo>{item.todo}</Todo>
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
