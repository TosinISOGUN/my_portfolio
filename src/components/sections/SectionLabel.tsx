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
      <h2 className={`mt-4 font-display text-[clamp(1.85rem,6.5vw,3.8rem)] leading-[1] tracking-normal sm:text-[clamp(2.1rem,4.8vw,4.2rem)] ${titleColor}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`mt-4 max-w-2xl font-sans text-base leading-7 ${copyColor}`}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
