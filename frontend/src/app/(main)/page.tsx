'use client';

import { useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/shared/navbar";
import {
  CustomCursor,
  FeaturedEvents,
  HeroSection,
  JoinSection,
  NebulaBackground,
  StarfieldCanvas,
  Testimonials,
  CursorTrail,
} from "@/components/home";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const uniqueId = Date.now() + Math.random();
      setCursorTrail(prev => {
        const newTrail = [...prev, { id: uniqueId, x: e.clientX, y: e.clientY }];
        return newTrail.slice(-12);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverTarget = target.closest('a, button, [role="button"], input, textarea, select, [data-hover]');
      setIsHovering(!!isHoverTarget);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [cursorX, cursorY]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-black text-white cursor-none">
      <Navbar />

      <CustomCursor
        cursorX={cursorX}
        cursorY={cursorY}
        cursorTrail={cursorTrail}
        isClicking={isClicking}
        isHovering={isHovering}
      />

      <div className="absolute inset-x-0 top-0 z-0 h-[400vh] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0f0518] via-[#090118] via-[#05010e] to-[#000000]" />
      </div>

      <StarfieldCanvas containerRef={containerRef} mouseRef={mouseRef} />

      <NebulaBackground />

      <HeroSection />

      <FeaturedEvents />

      <Testimonials />

      <JoinSection />
    </div>
  );
}
