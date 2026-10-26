import { profile } from "@/data/portfolio";

/**
 * The page footer, in the style of samwrks.in: a full-width strip under a hairline with the
 * copyright line set small and light on the right. It sits below both columns on every tab.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-[#111111]/10 px-8 py-4 sm:py-5 lg:px-10 lg:py-6">
      <p
        suppressHydrationWarning
        className="text-right text-[clamp(0.95rem,1.6vw,1.25rem)] font-medium leading-none tracking-[-0.04em] text-[#111111]/38"
      >
        <span aria-hidden>©</span>
        <span className="sr-only">Copyright </span>
        {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
