import { motion, type MotionValue } from "framer-motion";
import desk from "@/assets/workspace-desk-nochair.png";

export function WorkspaceLayer({ y }: { y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
      <img
        src={desk}
        alt="Illustrated developer workspace with desk, monitors and keyboard"
        width={1200}
        height={900}
        className="absolute bottom-[14%] left-[0%] w-[92%] max-w-[1040px]"
      />
    </motion.div>
  );
}
