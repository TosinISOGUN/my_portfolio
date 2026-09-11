import { useTransform, type MotionValue } from "framer-motion";
import { BackgroundLayer } from "./BackgroundLayer";
import { WorkspaceLayer } from "./WorkspaceLayer";
import { ChairLayer } from "./ChairLayer";
import { CharacterLayer } from "./CharacterLayer";
import { ForegroundLayer } from "./ForegroundLayer";
import { parallax } from "./animationTimeline";

type HeroScrollSceneProps = {
  progress: MotionValue<number>;
  travel: number;
  reducedMotion: boolean;
};

/**
 * Layered workspace scene. Each depth layer moves independently so the
 * composition reads as a 3D space rather than one sliding image.
 */
export function HeroScrollScene({ progress, travel, reducedMotion }: HeroScrollSceneProps) {
  const lockedY = useTransform(progress, [0, 1], ["0%", "0%"]);
  const chairY = useTransform(progress, [0, 1], reducedMotion ? ["0%", "0%"] : [`${parallax.chair[0]}%`, `${parallax.chair[1]}%`]);

  const chairPush = useTransform(
    progress,
    [0, 0.03, 0.14, 1],
    reducedMotion ? [0, 0, 0, 0] : [0, 0, 10, 10],
  );

  return (
    <div className="relative aspect-[4/3] w-[116vw] max-w-none -translate-x-[1vw] sm:w-full sm:translate-x-0 xl:w-full">
      {/* WorkspaceScene - cohesive group, nudged left toward the viewport center */}
      <div className="absolute inset-0 -translate-x-[3%] -translate-y-[6%] scale-[1.1] sm:-translate-x-[6%] sm:-translate-y-[3%] sm:scale-[1.02] md:-translate-y-[8%] xl:-translate-x-[6%] xl:translate-y-[4%] xl:scale-[1.02]">
        <BackgroundLayer y={lockedY} />
        <ForegroundLayer y={lockedY} />
        <div className="pointer-events-none absolute inset-0 xl:-translate-x-[150px]">
          <WorkspaceLayer y={lockedY} />
          <ChairLayer y={chairY} push={chairPush} />
          <CharacterLayer progress={progress} travel={travel} reducedMotion={reducedMotion} />
        </div>
      </div>
    </div>
  );
}
