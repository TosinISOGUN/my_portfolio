import { profile } from "@/data/portfolio";

/**
 * The page footer, in the style of samwrks.in: a full-width strip under a hairline with the
 * copyright line set large and light on the right. It sits below both columns on every tab.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-[#111111]/10 px-8 py-8 sm:py-10 lg:px-10 lg:py-12">
      <p
        suppressHydrationWarning
        className="text-right text-[clamp(1.6rem,3.4vw,2.5rem)] font-medium leading-none tracking-[-0.06em] text-[#111111]/38"
      >
        <span aria-hidden>©</span>
        <span className="sr-only">Copyright </span>
        {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
