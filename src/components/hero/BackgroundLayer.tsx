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
        className="absolute right-[6%] top-[-24%] w-[85%] max-w-[950px] drop-shadow-[0_28px_24px_rgba(42,40,37,0.26)] sm:top-[-12%]"
      />
    </motion.div>
  );
}
