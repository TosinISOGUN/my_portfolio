import { motion, type MotionValue } from "framer-motion";
import plantSpeaker from "@/assets/plant-speaker.png";
import rug from "@/assets/rug.png";

export function ForegroundLayer({ y }: { y: MotionValue<string> }) {
  return (
    <>
      <motion.img
        style={{ y }}
        src={rug}
        alt=""
        width={1536}
        height={1024}
        className="pointer-events-none absolute -bottom-[4%] left-[-13%] hidden w-[85%] max-w-[950px] drop-shadow-[0_46px_26px_rgba(42,40,37,0.3)] xl:block"
      />
      <motion.img
        style={{ y }}
        src={plantSpeaker}
        alt=""
        width={1024}
        height={1280}
        className="pointer-events-none absolute bottom-[8%] right-[2%] z-50 w-[27%] max-w-[300px] drop-shadow-[0_26px_20px_rgba(42,40,37,0.4)] sm:bottom-[2%] lg:bottom-[8%]"
      />
    </>
  );
}
