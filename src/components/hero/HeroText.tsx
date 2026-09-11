export function HeroText() {
  const proofPoints = ["React + TypeScript", "Dashboards", "Booking Systems", "Marketplace UX"];

  return (
    <div className="relative z-[60] max-w-[20rem] sm:max-w-xl xl:max-w-2xl">
      <h1 className="font-display text-[clamp(2.05rem,9.2vw,3.45rem)] leading-[0.95] tracking-normal text-charcoal sm:text-[clamp(2.75rem,6vw,4rem)] xl:text-[clamp(2.45rem,3.65vw,4.15rem)] 2xl:text-[clamp(2.95rem,4.35vw,5rem)]">
        Oluwatomisin
        <br />
        Isogun
      </h1>
      <p className="mt-4 inline-block max-w-full bg-navy px-3 py-2 font-mono text-[0.62rem] font-bold tracking-[0.06em] text-cream sm:mt-5 sm:px-4 sm:text-[0.82rem] xl:mt-6 xl:text-[clamp(0.7rem,1.4vw,1.05rem)] xl:tracking-[0.08em]">
        FRONTEND DEVELOPER
      </p>
      <p className="mt-4 max-w-[24rem] font-sans text-sm font-bold leading-6 text-charcoal/72 sm:text-base">
        I build React and TypeScript interfaces for booking platforms, landing pages, dashboards, and apps for product teams.
      </p>
      <div className="mt-5 flex max-w-[30rem] flex-wrap gap-2">
        {proofPoints.map((point) => (
          <span
            key={point}
            className="rounded-full border border-charcoal/12 bg-cream/70 px-3 py-1.5 font-sans text-[0.68rem] font-black text-charcoal shadow-[0_14px_36px_-30px_var(--color-charcoal)] sm:text-xs"
          >
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
