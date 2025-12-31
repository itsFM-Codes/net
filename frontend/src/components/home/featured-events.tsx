'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { eventService } from "@/features/event/api/event-service";
import { Event } from "@/features/event/types/event";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
};

export default function FeaturedEvents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        if (response.payload && response.statusCode === 200) {
          const randomEvents = shuffleArray(response.payload).slice(0, 5);
          setFeaturedEvents(randomEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || featuredEvents.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredEvents.length]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalCards = featuredEvents.length;
    
    let adjustedDiff = diff;
    if (diff > totalCards / 2) adjustedDiff = diff - totalCards;
    if (diff < -totalCards / 2) adjustedDiff = diff + totalCards;

    const isActive = adjustedDiff === 0;
    const absPos = Math.abs(adjustedDiff);
    const direction = adjustedDiff > 0 ? 1 : -1;
    
    let xOffset = 0;
    for (let i = 0; i < absPos; i++) {
      const cardScale = i === 0 ? 1 : Math.max(0.75, 1 - i * 0.12);
      xOffset += 250 * cardScale + 70;
    }

    return {
      x: xOffset * direction,
      scale: isActive ? 1 : Math.max(0.75, 1 - absPos * 0.12),
      zIndex: 10 - absPos,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.25,
      rotateY: adjustedDiff * -8,
      filter: isActive ? 'blur(0px)' : `blur(${absPos * 2}px)`,
    };
  };

  if (isLoading) {
    return (
      <section className="relative z-10 h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
        <div className="text-purple-400 text-lg">Loading featured events...</div>
      </section>
    );
  }

  if (featuredEvents.length === 0) {
    return (
      <section className="relative z-10 h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
        <div className="text-slate-400 text-lg">No events available at the moment.</div>
      </section>
    );
  }

  const activeEvent = featuredEvents[activeIndex];
  const formattedDate = formatDate(activeEvent.datetime);

  return (
    <section className="relative z-10 h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <motion.div
        className="featured-events-header text-center mb-8 mt-8 z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-purple-400/70 text-sm tracking-[0.3em] uppercase mb-4"
        >
          Don't Miss Out
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Featured <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Events</span>
        </h2>
      </motion.div>

      <div 
        className="featured-events-container relative w-full h-[480px] flex items-center justify-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="popLayout">
          {featuredEvents.map((event, index) => {
            const style = getCardStyle(index);
            const date = formatDate(event.datetime);
            
            return (
              <motion.div
                key={event.id}
                className="absolute cursor-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={() => setActiveIndex(index)}
                style={{ perspective: 1000 }}
                data-hover
              >
                <div 
                  className="featured-events-card relative w-[300px] h-[420px] rounded-2xl overflow-hidden group"
                  style={{
                    boxShadow: index === activeIndex 
                      ? '0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)'
                      : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        border: '2px solid transparent',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.5)) border-box',
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                    <div className="text-purple-400 text-xs font-medium">{date.month}</div>
                    <div className="text-white text-xl font-bold">{date.date}</div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                    
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">${event.price}</span>
                      <span className="text-slate-500 text-sm">{date.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="featured-events-dots mt-8 flex items-center gap-3 z-20">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative p-1 cursor-none"
            data-hover
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{
                scale: index === activeIndex ? 1.5 : 1,
                backgroundColor: index === activeIndex ? 'rgb(167, 139, 250)' : 'rgb(71, 85, 105)',
              }}
              transition={{ duration: 0.3 }}
            />
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        className="featured-events-button mt-8 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Link href="/event">
          <motion.button
            className="px-8 py-3 border border-purple-500/40 rounded-full text-purple-300 font-medium hover:bg-purple-500/10 hover:border-purple-400/60 transition-all duration-300 flex items-center gap-2 cursor-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-hover
          >
            View All Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="featured-events-description mt-6 text-center px-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-slate-400 max-w-lg mx-auto text-sm line-clamp-2">
            {activeEvent.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
