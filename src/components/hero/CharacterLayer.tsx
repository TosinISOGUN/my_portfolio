import { motion, useTransform, type MotionValue } from "framer-motion";
import sitting from "@/assets/character-sitting.png";
import standing from "@/assets/character-standing.png";
import walk1 from "@/assets/character-walk-1.png";
import walk2 from "@/assets/character-walk-2.png";
import walk3 from "@/assets/character-walk-3.png";
import { CharacterPose } from "./CharacterPose";
import { characterPath, poseFades } from "./animationTimeline";

type CharacterLayerProps = {
  progress: MotionValue<number>;
  /** Multiplier on the walk distance so smaller screens travel less. */
  travel: number;
  reducedMotion: boolean;
};

/**
 * CharacterStage - all five poses share one coordinate system and one
 * bottom anchor, so crossfading never shifts the character.
 */
export function CharacterLayer({ progress, travel, reducedMotion }: CharacterLayerProps) {
  const input = [...characterPath.input];

  const x = useTransform(
    progress,
    input,
    characterPath.x.map((v) => `${v * travel}vw`),
  );
  const y = useTransform(
    progress,
    input,
    characterPath.y.map((v) => `${v}%`),
  );
  const scale = useTransform(progress, input, [...characterPath.scale]);
  const opacity = useTransform(progress, input, [...characterPath.opacity]);

  const sittingOpacity = useTransform(progress, [...poseFades.sitting.input], [
    ...poseFades.sitting.output,
  ]);
  const standingOpacity = useTransform(progress, [...poseFades.standing.input], [
    ...poseFades.standing.output,
  ]);
  const walk1Opacity = useTransform(progress, [...poseFades.walk1.input], [
    ...poseFades.walk1.output,
  ]);
  const walk2Opacity = useTransform(progress, [...poseFades.walk2.input], [
    ...poseFades.walk2.output,
  ]);
  const walk3Opacity = useTransform(progress, [...poseFades.walk3.input], [
    ...poseFades.walk3.output,
  ]);

  if (reducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute bottom-[26%] left-[36%] z-20 aspect-[3/4] w-[27%] max-w-[220px] sm:bottom-[27%] sm:left-[36.5%] sm:max-w-[270px] lg:bottom-[28%] lg:left-[37%] lg:w-[28%] lg:max-w-[290px]">
          <CharacterPose src={sitting} opacity={1} flip alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <motion.div
        style={{ x, y, scale, opacity }}
        className="absolute bottom-[26%] left-[36%] z-20 aspect-[3/4] w-[27%] max-w-[220px] origin-bottom will-change-transform sm:bottom-[27%] sm:left-[36.5%] sm:max-w-[270px] lg:bottom-[28%] lg:left-[37%] lg:w-[28%] lg:max-w-[290px]"
      >
        <CharacterPose src={sitting} opacity={sittingOpacity} flip />
        <CharacterPose src={standing} opacity={standingOpacity} scale={0.98} />
        <CharacterPose src={walk1} opacity={walk1Opacity} scale={1.06} />
        <CharacterPose src={walk2} opacity={walk2Opacity} scale={1.08} />
        <CharacterPose src={walk3} opacity={walk3Opacity} scale={1.1} />
      </motion.div>
    </div>
  );
}
