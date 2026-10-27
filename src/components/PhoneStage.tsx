import type { MobileScreen } from "@/data/portfolio";

// The three status icons are drawn like the iPhone's (they take the status bar's text colour).
function SignalBars({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" fill="currentColor" aria-hidden className={className}>
      <rect x="0" y="8" width="3.2" height="4" rx="1" />
      <rect x="4.9" y="5.5" width="3.2" height="6.5" rx="1" />
      <rect x="9.8" y="3" width="3.2" height="9" rx="1" />
      <rect x="14.7" y="0" width="3.2" height="12" rx="1" />
    </svg>
  );
}

function WifiFan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 17 12" aria-hidden className={className}>
      <path d="M8.5 10.8 L6.38 8.68 A3 3 0 0 1 10.62 8.68 Z" fill="currentColor" />
      <path
        d="M4.26 6.56 A6 6 0 0 1 12.74 6.56 M2.14 4.44 A9 9 0 0 1 14.86 4.44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryFull({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 13" aria-hidden className={className}>
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3.8"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <rect x="2" y="2" width="19" height="9" rx="2.5" fill="currentColor" />
      <path
        d="M24 4.5v4c.8-.3 1.5-1.2 1.5-2s-.7-1.7-1.5-2z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  );
}

type PhoneStageProps = {
  /** Phone screenshots, shown side by side. */
  screens: MobileScreen[];
  title: string;
  className?: string;
};

/**
 * Phone screenshots of a site in phone frames, side by side on a light grey background, built
 * the way samwrks.in shows the mobile view of its projects: a white phone with a thin outline and
 * very round corners, a status bar (time and signal icons) at the top, and a screen that runs
 * to the bottom edge with only the thin home indicator floating over it, and a Dynamic Island
 * pill at the top, as on current phones.
 * The status bar takes the colour of the screenshot's top edge, and the home indicator is dark or
 * light depending on the screenshot's bottom edge (both sampled in scripts/optimize-images.mjs).
 *
 * The screen area is 270 by 544 units (the same ratio the colour sampling uses) under a status
 * bar of 41, so the frame is 270 by 585.
 */
export function PhoneStage({ screens, title, className = "" }: PhoneStageProps) {
  if (!screens.length) return null;
  // Three phones share the width, so each is narrower than when there are two.
  const three = screens.length >= 3;

  return (
    <div
      className={`overflow-hidden rounded-[12px] bg-[#ececec] px-4 py-9 sm:px-8 sm:py-12 ${className}`}
    >
      <div
        className={`mx-auto flex items-center justify-center ${
          three ? "max-w-[1000px] gap-3 sm:gap-8" : "max-w-[860px] gap-4 sm:gap-12"
        }`}
      >
        {screens.map((screen, index) => (
          <div
            key={screen.src}
            className={`grid aspect-[270/585] grid-rows-[41fr_544fr] ${
              three ? "w-[31%] max-w-[300px]" : "w-[46%] max-w-[360px]"
            } overflow-hidden rounded-[15%/7%] border border-black/15 bg-white shadow-[0_36px_60px_-40px_rgb(0_0_0/0.5)]`}
          >
            <div
              aria-hidden
              style={{ background: screen.top, color: screen.topLight ? "#111111" : "#ffffff" }}
              className="relative flex items-center justify-between px-[10%] pb-[2.6%]"
            >
              {/* The Dynamic Island: a black pill centred at the top of the status bar. */}
              <span
                aria-hidden
                className="absolute left-1/2 top-[18%] h-[46%] w-[32%] -translate-x-1/2 rounded-full bg-black"
              />
              <span className="text-[0.6rem] font-semibold leading-none tracking-tight sm:text-[0.74rem] lg:text-[0.92rem]">
                9:41
              </span>
              <span className="flex items-center gap-[3px] sm:gap-1 lg:gap-1.5">
                <SignalBars className="h-[0.5rem] w-auto sm:h-[0.7rem] lg:h-[0.9rem]" />
                <WifiFan className="h-[0.5rem] w-auto sm:h-[0.7rem] lg:h-[0.9rem]" />
                <BatteryFull className="h-[0.55rem] w-auto sm:h-[0.75rem] lg:h-[0.95rem]" />
              </span>
            </div>

            <div className="relative min-h-0 overflow-hidden">
              <img
                src={screen.src}
                alt={`${title} on a phone, screen ${index + 1} of ${screens.length}`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width={390}
                height={844}
              />
              <span
                aria-hidden
                style={{ background: screen.bottomLight ? "#111111" : "#ffffff" }}
                className="absolute bottom-[2.4%] left-1/2 h-[3px] w-[38%] -translate-x-1/2 rounded-full sm:h-1 lg:h-[5px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
