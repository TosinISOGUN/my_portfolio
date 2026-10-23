import type { ReactNode } from "react";
import { ArrowUpRight, Calendar, Check, ChevronDown, MessageCircle, Send } from "lucide-react";
import profilePhoto from "@/assets/Photograph - Oluwatomisin Isogun.jpg";
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

const included = [
  "Up to 5 pages",
  "A contact or booking form",
  "Mobile-friendly design",
  "Basic SEO setup",
  "Your domain and hosting for the first year",
  "Handover of the finished site",
];

const faqs: { question: string; answer: ReactNode; todo?: string }[] = [
  {
    question: "How much does a website cost, and what do I get?",
    answer: (
      <>
        <p>
          Websites start from $799 (USD). The price is fixed and agreed with you on the free call.
        </p>
        <ul className="mt-3 grid gap-2">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#111111] text-white"
                aria-hidden
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">Extra pages and any other work are quoted before any work starts.</p>
      </>
    ),
  },
  {
    question: "What do I need to give you?",
    answer:
      "Your text, your photos, and a list of the pages you want. I do not write your page text or take photos, so you send me those.",
  },
  {
    question: "How long does it take?",
    answer: "5 working days. The clock starts when your deposit is paid and I have your content.",
  },
  {
    question: "How do payments work?",
    answer:
      "A 50% deposit starts the project. The other 50% is due on delivery, before I hand over the final files and logins. I accept bank transfer, Chipper Cash and Grey. Payments are in USD.",
  },
  {
    question: "What if I want changes?",
    answer:
      "Two rounds of changes are included. After launch, small changes and fixes are free for a month. Anything beyond that, I send you a quote before doing any work.",
  },
  {
    question: "Who owns the website? What about domain and hosting?",
    answer:
      "You do. Ownership transfers to you on final payment. Your domain and hosting costs are already part of the price and cover the first year. After that they need renewing, and you, as the owner of the website, take care of the renewals.",
  },
];

export function Faq() {
  return (
    <section className={cardClass} aria-labelledby="faq-heading">
      <h3 id="faq-heading" className={sectionHeading}>
        Got questions?
      </h3>
      <p className="mt-3 text-[1rem] font-medium tracking-[-0.03em] text-[#111111]/55">
        Tap a question for a straight answer.
      </p>

      <div className="mt-6 grid gap-3.5">
        {faqs.map((item, index) => (
          <details key={item.question} className="group" open={index === 0}>
            <summary className="ml-auto flex min-h-[44px] w-fit max-w-[90%] cursor-pointer list-none items-center gap-3 rounded-[22px] rounded-br-[6px] bg-[#1a1a1a] px-4 py-3 text-[0.98rem] font-medium leading-[1.3] tracking-[-0.03em] text-white transition-colors hover:bg-black sm:max-w-[78%] [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-white/60 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="sam-reply mt-2 flex items-end gap-2">
              <img
                src={profilePhoto}
                alt="Oluwatomisin Isogun"
                className="h-8 w-8 shrink-0 rounded-full bg-white object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="max-w-[92%] rounded-[22px] rounded-bl-[6px] bg-white px-4 py-3 text-[0.95rem] font-medium leading-6 tracking-[-0.025em] text-[#111111]/80 sm:max-w-[78%]">
                {item.answer}
                {item.todo ? (
                  <>
                    {" "}
                    <Todo>{item.todo}</Todo>
                  </>
                ) : null}
              </div>
            </div>
          </details>
        ))}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex min-h-[48px] items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[0.95rem] font-medium tracking-[-0.03em] text-[#111111]/50 transition-colors hover:text-[#111111]/80"
      >
        <span className="min-w-0 flex-1 truncate">Still curious? Ask me on WhatsApp</span>
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1a1a1a] text-white"
          aria-hidden
        >
          <Send className="h-4 w-4" />
        </span>
      </a>
    </section>
  );
}
