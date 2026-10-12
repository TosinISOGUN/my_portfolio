import { ArrowUpRight, Calendar, ChevronDown, MessageCircle, Send } from "lucide-react";
import { bookingUrl, mockupUrl, whatsappUrl } from "@/data/portfolio";

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
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="sam-pill bg-white/12 text-white hover:bg-white/20"
        >
          <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
          WhatsApp me
        </a>
      </div>
    </section>
  );
}

const faqs: { question: string; answer: string }[] = [
  {
    question: "Do I own the website?",
    answer: "Yes. Once the final payment is made, the website and everything on it belong to you.",
  },
  {
    question: "What about hosting and domain?",
    answer:
      "Your domain is registered in your name and you pay the provider directly, so you are never locked in. I set up the hosting and the domain for you. I take no ongoing fee unless you ask me to look after the site.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Small changes and fixes are free for a month after launch. After that, I send you a quote before doing any work.",
  },
  {
    question: "How do payments work?",
    answer:
      "You pay 50% upfront to start the build and the other 50% when your website is delivered.",
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
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
