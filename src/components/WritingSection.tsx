import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, FileText } from "lucide-react";

const posts = [
  {
    title: "Three Apps Live on the Atlassian Marketplace",
    description: "Passdown is approved — Isogun Labs now has three apps live on the Marketplace. Notes on what got easier the third time through review, and what still caught us off guard.",
    url: "https://isogunlabs.com/blog/three-apps-live-on-marketplace",
    date: "Sep 8, 2026",
  },
  {
    title: "What the \"Runs on Atlassian\" Badge Actually Guarantees",
    description: "It's not a quality stamp or a security audit. What the badge checks, what it explicitly doesn't cover, and what to look at before installing any Jira app.",
    url: "https://isogunlabs.com/blog/runs-on-atlassian-badge-buyers-guide",
    date: "Jul 24, 2026",
  },
  {
    title: "Two Apps Live: What Actually Surprised Us",
    description: "Recap and Field Hygiene are both live on the Atlassian Marketplace. Notes on the parts that didn't go the way we expected.",
    url: "https://isogunlabs.com/blog/two-apps-live-lessons-learned",
    date: "Aug 12, 2026",
  },
  {
    title: "JSM On-Call Schedules: A Developer's Guide to the API That Almost Works",
    description: "Reading Jira Service Management's on-call schedule from a Forge app should be straightforward. It isn't, because the JSM Ops API doesn't accept app-system tokens for schedule reads.",
    url: "https://isogunlabs.com/blog/jsm-oncall-api-developer-guide",
    date: "Sep 2, 2026",
  },
  {
    title: "How to Test a Scheduled Forge Trigger Without Waiting for the Real Thing",
    description: "Forge's scheduled triggers fire on fixed intervals, not on demand. Here's how we test Passdown's shift-boundary logic locally without waiting for a schedule change.",
    url: "https://isogunlabs.com/blog/testing-scheduled-forge-triggers",
    date: "Sep 2, 2026",
  },
];

const WritingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="writing" className="section-padding section-alt" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Writing" subtitle="Blog" />

        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-2xl">
          I write about building on the Atlassian Marketplace, Forge platform internals, and
          the gap between what API documentation promises and what actually works. Below are
          a few selected posts from the Isogun Labs blog.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group skill-card flex flex-col hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-primary" />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-1"
                />
              </div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3">
                {post.description}
              </p>
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                {post.date}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
