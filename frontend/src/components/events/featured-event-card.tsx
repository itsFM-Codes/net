'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Event } from "@/features/event/types/event";
import { formatDate } from "./constants";

interface FeaturedEventCardProps {
  event: Event;
}

export default function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  const router = useRouter();
  const formattedDate = formatDate(event.datetime);
  const isLowSeats = event.seatsAvailable <= 20;

  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-[2px] rounded-[26px] z-0"
        style={{
          background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6, #ec4899)',
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <motion.div
        className="absolute -inset-4 rounded-[40px] z-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative w-full rounded-3xl overflow-hidden cursor-none group z-10 bg-black"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => router.push(`/event/${event.id}`)}
      >
        <div className="relative aspect-[16/9]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          
          <motion.div
            className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          <motion.div 
            className="absolute top-6 md:top-8 left-6 md:left-8"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 flex items-center gap-2">
              <motion.svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
              Featured Event
            </span>
          </motion.div>

          <div className="absolute top-6 md:top-8 right-6 md:right-8">
            <motion.div
              className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold text-white leading-none">{formattedDate.date}</div>
              <div className="text-sm uppercase tracking-wider text-purple-300 font-medium mt-1">{formattedDate.month}</div>
              <div className="text-xs text-white/60 mt-2 border-t border-white/10 pt-2">{formattedDate.time}</div>
            </motion.div>
          </div>

          <div className="max-w-2xl">
            <div className="mb-4">
              {isLowSeats ? (
                <motion.span 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-medium backdrop-blur-sm"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Only {event.seatsAvailable}/{event.capacity} seats left!
                </motion.span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-medium backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {event.seatsAvailable}/{event.capacity} seats available
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-purple-300 text-sm mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">{formattedDate.day}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight group-hover:text-purple-200 transition-colors">
              {event.title}
            </h2>

            <p className="text-slate-300/80 text-sm md:text-base mb-5 line-clamp-2 max-w-xl">
              {event.description}
            </p>

            <div className="flex items-center gap-5">
              <div className="text-2xl md:text-3xl font-bold text-white">
                ${event.price}
                <span className="text-xs md:text-sm font-normal text-slate-400 ml-1">/ person</span>
              </div>
              <motion.button
                className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all text-sm md:text-base"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/event/${event.id}`);
                }}
              >
                Get Tickets →
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
