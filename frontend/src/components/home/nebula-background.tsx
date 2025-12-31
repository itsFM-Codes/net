'use client';

import { motion } from "framer-motion";
import { nebulaClouds, getNebulaColor } from "./constants";

export default function NebulaBackground() {
  return (
    <div className="absolute inset-x-0 top-0 z-0 h-[400vh] pointer-events-none overflow-hidden">
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full pointer-events-none mix-blend-screen"
          style={{
            width: cloud.width,
            height: cloud.height,
            left: cloud.x,
            top: cloud.y,
            filter: `blur(${cloud.blur}px)`,
            opacity: cloud.opacity / 100,
            backgroundColor: getNebulaColor(cloud.color),
          }}
          initial={{ rotate: cloud.rotation }}
          animate={{
            x: [0, 30, -15, 20, 0],
            y: [0, -20, 12, -8, 0],
            scale: [1, 1.08, 0.95, 1.04, 1],
            rotate: [cloud.rotation, cloud.rotation + 5, cloud.rotation - 3, cloud.rotation + 2, cloud.rotation],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
