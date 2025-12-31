'use client';

import { useState, useEffect, memo } from "react";
import { useMotionValue } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/shared/navbar";
import { eventService } from "@/features/event/api/event-service";
import { Event } from "@/features/event/types/event";
import {
  CosmicBackground,
  EventsGrid,
  EventsHeader,
  FeaturedEventCard,
  LoadingSpinner,
} from "@/components/events";
import { CustomCursor, CursorTrail } from "@/components/home";
import { FloatingChat } from "@/components/chat";

const MemoizedNavbar = memo(Navbar);
const MemoizedCosmicBackground = memo(CosmicBackground);
const MemoizedEventsHeader = memo(EventsHeader);
const MemoizedFeaturedEventCard = memo(FeaturedEventCard);
const MemoizedEventsGrid = memo(EventsGrid);

function CursorWrapper() {
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    <CustomCursor
      cursorX={cursorX}
      cursorY={cursorY}
      cursorTrail={cursorTrail}
      isClicking={isClicking}
      isHovering={isHovering}
    />
  );
}

export default function EventsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await eventService.getAllEvents();
      if (response.statusCode === 200 && response.payload) {
        return response.payload;
      }
      throw new Error('Failed to load events');
    },
  });

  const events = data || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || events.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white cursor-none">
        <CursorWrapper />
        <MemoizedNavbar />
        <MemoizedCosmicBackground />
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {error ? (error instanceof Error ? error.message : String(error)) : "No events available at the moment"}
            </h2>
            <p className="text-gray-400">Please check back later for upcoming events.</p>
          </div>
        </div>
        <FloatingChat />
      </div>
    );
  }

  const featuredEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <div className="min-h-screen bg-black text-white cursor-none [&_a]:cursor-none [&_button]:cursor-none [&_[role='button']]:cursor-none">
      <CursorWrapper />
      <MemoizedNavbar />
      <MemoizedCosmicBackground />

      <div className="relative z-10">
        <div className="pt-32 md:pt-36 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <MemoizedEventsHeader />
              <div className="flex-1 w-full">
                <MemoizedFeaturedEventCard event={featuredEvent} />
              </div>
            </div>
          </div>
        </div>

        <MemoizedEventsGrid events={otherEvents} />

        <div className="h-16" />
      </div>

      <FloatingChat />
    </div>
  );
}
