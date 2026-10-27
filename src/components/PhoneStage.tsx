import { BatteryFull, SignalHigh, Wifi } from "lucide-react";
import type { MobileScreen } from "@/data/portfolio";

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
                <SignalHigh
                  className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 lg:h-[1.1rem] lg:w-[1.1rem]"
                  strokeWidth={2.6}
                />
                <Wifi
                  className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 lg:h-[1.1rem] lg:w-[1.1rem]"
                  strokeWidth={2.6}
                />
                <BatteryFull
                  className="h-3 w-3 sm:h-4 sm:w-4 lg:h-[1.3rem] lg:w-[1.3rem]"
                  strokeWidth={2.2}
                />
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
