'use client';

import { motion, MotionValue, useSpring, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { CursorTrail } from "../home/constants";

interface CustomCursorProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorTrail: CursorTrail[];
  isClicking: boolean;
  isHovering: boolean;
}

const CustomCursor = memo(function CustomCursor({
  cursorX,
  cursorY,
  cursorTrail,
  isClicking,
  isHovering,
}: CustomCursorProps) {
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outerSpringConfig = { damping: 20, stiffness: 150 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {cursorTrail.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[60] rounded-full"
            initial={{ 
              x: particle.x - 6, 
              y: particle.y - 6, 
              scale: 1, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              width: 10,
              height: 10,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(167, 139, 250, 0.6) 40%, transparent 100%)`,
              boxShadow: `0 0 12px rgba(167, 139, 250, 0.6)`,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div 
        className="fixed pointer-events-none z-[51] rounded-full border-2 border-purple-400/50"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 36 : isHovering ? 64 : 50,
          height: isClicking ? 36 : isHovering ? 64 : 50,
          borderColor: isClicking ? 'rgba(236, 72, 153, 0.8)' : isHovering ? 'rgba(139, 92, 246, 0.8)' : 'rgba(167, 139, 250, 0.5)',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div 
        className="fixed pointer-events-none z-[52] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 24 : isHovering ? 14 : 18,
          height: isClicking ? 24 : isHovering ? 14 : 18,
          backgroundColor: isClicking ? 'rgb(236, 72, 153)' : 'rgb(255, 255, 255)',
        }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[49] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.08) 30%, transparent 70%)',
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
});

export default CustomCursor;
