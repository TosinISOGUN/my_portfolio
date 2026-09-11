type SectionLabelProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  tone?: "dark" | "light";
};

export function SectionLabel({ eyebrow, title, copy, tone = "dark" }: SectionLabelProps) {
  const titleColor = tone === "light" ? "text-cream" : "text-charcoal";
  const copyColor = tone === "light" ? "text-cream/72" : "text-charcoal/75";

  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-tangerine">
        {eyebrow}
      </p>
      <h2 className={`mt-4 font-display text-[clamp(2rem,8vw,4.8rem)] leading-[0.96] tracking-normal sm:text-[clamp(2.35rem,6vw,5.2rem)] ${titleColor}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`mt-4 max-w-2xl font-sans text-sm leading-6 sm:text-base sm:leading-7 ${copyColor}`}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
