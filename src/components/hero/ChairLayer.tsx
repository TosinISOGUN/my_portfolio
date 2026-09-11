import { motion, type MotionValue } from "framer-motion";
import chair from "@/assets/chair.png";

/**
 * The chair is its own layer so it can stay at the workstation while the
 * character stands up and walks away.
 */
export function ChairLayer({ y, push }: { y: MotionValue<string>; push: MotionValue<number> }) {
  return (
    <motion.div style={{ y }} className="pointer-events-none absolute inset-0 z-30">
      <motion.img
        src={chair}
        alt=""
        width={1024}
        height={1024}
        style={{ x: push }}
        className="absolute bottom-[18%] left-[36%] w-[32%] max-w-[260px] sm:bottom-[18.5%] sm:left-[36.5%] sm:max-w-[320px] lg:bottom-[19%] lg:left-[37%] lg:w-[33%] lg:max-w-[350px]"
      />
    </motion.div>
  );
}
