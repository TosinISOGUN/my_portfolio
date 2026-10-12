import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Hammer,
  ListChecks,
  MessageSquare,
  Palette,
  Rocket,
  Send,
  Tag,
} from "lucide-react";
import { bookingUrl, mockupUrl } from "@/data/portfolio";

const cardClass = "overflow-hidden rounded-[26px] bg-[#ededed] p-5 text-[#111111] sm:p-7";

const sectionHeading =
  "max-w-4xl text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.08em]";

function IconChip({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
        dark ? "bg-white/14 text-white" : "bg-[#111111] text-white"
      }`}
      aria-hidden
    >
      {children}
    </span>
  );
}

const included = [
  "Up to 5 pages",
  "Mobile-friendly",
  "A contact form or booking link",
  "Basic search engine setup",
  "Your site launched live",
];

export function ServicesBlock() {
  return (
    <section className={cardClass} aria-labelledby="services-heading">
      <h3 id="services-heading" className={sectionHeading}>
        A website, built in days.
      </h3>

      <dl className="mt-7 grid gap-3 lg:grid-cols-[1fr_1.3fr_1fr]">
        <div className="flex flex-col rounded-[22px] bg-white p-5">
          <IconChip>
            <Tag className="h-[18px] w-[18px]" />
          </IconChip>
          <dt className="mt-5 text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
            Price
          </dt>
          <dd className="mt-1">
            <span className="block text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
              Fixed price
            </span>
            <span className="mt-2 block text-[0.95rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/60">
              Agreed with you on the free call.
            </span>
          </dd>
        </div>

        <div className="flex flex-col rounded-[22px] bg-white p-5">
          <IconChip>
            <ListChecks className="h-[18px] w-[18px]" />
          </IconChip>
          <dt className="mt-5 text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
            What is included
          </dt>
          <dd className="mt-3">
            <ul className="grid gap-2.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[0.98rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/80"
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#111111]/8 text-[#111111]"
                    aria-hidden
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div className="flex flex-col rounded-[22px] bg-white p-5">
          <IconChip>
            <Clock className="h-[18px] w-[18px]" />
          </IconChip>
          <dt className="mt-5 text-[0.84rem] font-semibold tracking-[-0.03em] text-[#111111]/45">
            Delivery time
          </dt>
          <dd className="mt-1">
            <span className="block text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
              About 7 days
            </span>
            <span className="mt-2 block text-[0.95rem] font-medium leading-6 tracking-[-0.03em] text-[#111111]/60">
              After I have your text, photos, and logo.
            </span>
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
    Icon: Palette,
  },
  {
    title: "Build",
    copy: "I build your website so it works well on phones and computers.",
    Icon: Hammer,
  },
  {
    title: "Review and changes",
    copy: "You look it over and tell me what to change.",
    Icon: MessageSquare,
  },
  {
    title: "Launch",
    copy: "Your website goes live.",
    Icon: Rocket,
  },
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={cardClass} aria-labelledby="how-it-works-heading">
      <h3 id="how-it-works-heading" className={sectionHeading}>
        How it works
      </h3>

      <ol className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <motion.li
              key={step.title}
              className={`relative flex flex-col rounded-[22px] p-5 ${
                last ? "bg-[#1a1a1a] text-white" : "bg-white"
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <IconChip dark={last}>
                  <step.Icon className="h-[18px] w-[18px]" />
                </IconChip>
                <span
                  className={`font-mono text-[2.4rem] font-semibold leading-none tracking-[-0.06em] ${
                    last ? "text-white/25" : "text-[#111111]/12"
                  }`}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-6 text-[1.15rem] font-semibold tracking-[-0.05em]">{step.title}</p>
              <p
                className={`mt-2 text-[0.94rem] font-medium leading-6 tracking-[-0.03em] ${
                  last ? "text-white/65" : "text-[#111111]/60"
                }`}
              >
                {step.copy}
              </p>
            </motion.li>
          );
        })}
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
