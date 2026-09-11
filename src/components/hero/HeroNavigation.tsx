const links = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export function HeroNavigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-center px-4 py-4 sm:justify-between sm:px-8 sm:py-5">
      <div className="hidden w-24 shrink-0 sm:block sm:w-32" aria-hidden />
      <nav
        aria-label="Main"
        className="flex items-center gap-3 rounded-full bg-[color-mix(in_oklab,var(--color-charcoal)_8%,transparent)] px-4 py-2 backdrop-blur-sm sm:gap-8 sm:px-7 sm:py-3 lg:gap-10 lg:px-8"
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-sans text-[10px] font-medium tracking-[0.1em] text-charcoal transition-opacity hover:opacity-60 sm:text-xs sm:tracking-[0.12em] lg:text-sm"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="hidden shrink-0 rounded-full bg-tangerine px-5 py-3 font-sans text-xs font-bold tracking-[0.1em] text-cream shadow-[0_10px_24px_-12px_var(--color-tangerine)] transition-transform hover:scale-105 md:inline-block lg:px-6 lg:text-sm"
      >
        GET IN TOUCH
      </a>
    </header>
  );
}
