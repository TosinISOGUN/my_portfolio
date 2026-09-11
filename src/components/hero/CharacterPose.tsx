import { motion, type MotionValue } from "framer-motion";

type CharacterPoseProps = {
  src: string;
  opacity: MotionValue<number> | number;
  /** Horizontal flip, used for the seated pose so it faces the monitors. */
  flip?: boolean;
  /** Per-pose scale tweak so feet/height read consistently between poses. */
  scale?: number;
  alt?: string;
};

/**
 * A single character pose. Every pose fills the shared CharacterStage box and
 * is bottom-anchored so crossfades never make the character jump.
 */
export function CharacterPose({ src, opacity, flip, scale = 1, alt = "" }: CharacterPoseProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      style={{ opacity, transform: `scaleX(${flip ? -1 : 1}) scale(${scale})` }}
      className="absolute inset-0 h-full w-full object-contain object-bottom will-change-[opacity]"
    />
  );
}
