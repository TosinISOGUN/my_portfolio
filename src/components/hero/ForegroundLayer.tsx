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
        className="pointer-events-none absolute -bottom-[6%] left-[-16%] hidden w-[85%] max-w-[950px] xl:block"
      />
      <motion.img
        style={{ y }}
        src={plantSpeaker}
        alt=""
        width={1024}
        height={1280}
        className="pointer-events-none absolute bottom-[2%] right-[2%] z-50 w-[27%] max-w-[300px] sm:-bottom-[4%] lg:bottom-[2%]"
      />
    </>
  );
}
