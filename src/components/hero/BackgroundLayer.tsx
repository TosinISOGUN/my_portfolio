import { motion, type MotionValue } from "framer-motion";
import wallDecor from "@/assets/wall-decor.png";

export function BackgroundLayer({ y }: { y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
      <img
        src={wallDecor}
        alt=""
        width={1536}
        height={1024}
        className="absolute right-[6%] top-[-12%] w-[85%] max-w-[950px]"
      />
    </motion.div>
  );
}
