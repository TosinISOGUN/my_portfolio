import type { ReactNode } from "react";
import { ArrowUpRight, Calendar, ChevronDown, MessageCircle } from "lucide-react";
import { bookingUrl, whatsappUrl } from "@/data/portfolio";

/**
 * A visible reminder that a fact still needs the owner's decision.
 * Run "npm run check:todos" to list every one before publishing.
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
        Book a free call, or message me on WhatsApp.
      </p>
      <div className="sam-cta-row mt-6 flex flex-wrap gap-3">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="sam-pill bg-white text-[#1a1a1a] hover:bg-[#f2f2f2]"
        >
          <Calendar className="h-[18px] w-[18px]" aria-hidden />
          Book a free call
          <ArrowUpRight className="h-4 w-4 max-[480px]:hidden" aria-hidden />
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="sam-pill bg-white/12 text-white hover:bg-white/20"
        >
          <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}

const faqs: { question: string; answer: string; todo?: string }[] = [
  {
    question: "How much does a website cost?",
    answer:
      "Websites start from $1,200 (USD). The price is fixed and agreed with you on the free call.",
  },
  {
    question: "What is included?",
    answer:
      "Up to 5 pages, a contact or booking form, mobile-friendly design, basic SEO setup, and handover of the finished site. Not included: writing, photography, domain and hosting costs, and extra pages.",
  },
  {
    question: "How long does it take?",
    answer: "5 working days. The clock starts when your deposit is paid and I have your content.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your text and photos, and a list of the pages you want. Writing and photography are not included.",
  },
  {
    question: "How many changes are included?",
    answer: "Two rounds of changes are included. More can be quoted.",
  },
  {
    question: "What if I want more than 5 pages?",
    answer: "Extra pages are quoted before any work starts.",
  },
  {
    question: "Do I own the website?",
    answer: "Yes. Ownership transfers to you on final payment.",
    todo: "confirm",
  },
  {
    question: "What about hosting and domain?",
    answer:
      "Domain and hosting are your own costs, listed separately. I can set them up with you or hand over to your existing ones.",
    todo: "confirm hosting setup",
  },
  {
    question: "How do payments work?",
    answer:
      "A 50% deposit starts the project. The other 50% is due on delivery, before I hand over the final files and logins. I accept bank transfer in USD.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Small changes and fixes are free for a month after launch. After that, I send you a quote before doing any work.",
    todo: "confirm: free for a month after launch, or quoted separately from day one",
  },
  {
    question: "Will it work on phones?",
    answer: "Yes. Every site is built mobile-first.",
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
              {item.answer}
              {item.todo ? (
                <>
                  {" "}
                  <Todo>{item.todo}</Todo>
                </>
              ) : null}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
