import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-charcoal px-5 pb-8 text-cream sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 border-t border-cream/12 pt-6 font-sans text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
        <p>{profile.name}</p>
        <p>Frontend Developer - Isogun Labs</p>
      </div>
    </footer>
  );
}
