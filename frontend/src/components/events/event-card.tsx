'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Event } from "@/features/event/types/event";
import { formatDate, getCardVariant, CardVariant } from "./constants";

interface EventCardProps {
  event: Event;
  index: number;
}

const variantStyles: Record<CardVariant, { aspectClass: string; showDescription: boolean; titleSize: string }> = {
  tall: {
    aspectClass: 'aspect-[3/4]',
    showDescription: true,
    titleSize: 'text-xl',
  },
  standard: {
    aspectClass: 'aspect-[4/3]',
    showDescription: false,
    titleSize: 'text-lg',
  },
  compact: {
    aspectClass: 'aspect-square',
    showDescription: false,
    titleSize: 'text-base',
  },
};

export default function EventCard({ event, index }: EventCardProps) {
  const router = useRouter();
  const formattedDate = formatDate(event.datetime);
  const variant = getCardVariant(index);
  const style = variantStyles[variant];

  if (variant === 'tall') {
    return (
      <motion.div
        className="group cursor-none mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-200px", amount: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.2) }}
        onClick={() => router.push(`/event/${event.id}`)}
      >
        <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className={`relative ${style.aspectClass} overflow-hidden`}>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 text-center">
              <div className="text-2xl font-bold leading-none">{formattedDate.date}</div>
              <div className="text-xs uppercase text-purple-400 font-medium">{formattedDate.month}</div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 text-purple-300 text-xs mb-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </div>

              <h3 className={`${style.titleSize} font-bold mb-2 leading-tight group-hover:text-purple-300 transition-colors`}>
                {event.title}
              </h3>

              <p className="text-slate-300/70 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="text-xl font-bold">
                ${event.price}
                <span className="text-xs font-normal text-slate-400 ml-1">/ person</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group cursor-none mb-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-200px", amount: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.2) }}
      onClick={() => router.push(`/event/${event.id}`)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className={`relative ${style.aspectClass} overflow-hidden`}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10 text-center">
            <div className={`${variant === 'compact' ? 'text-base' : 'text-lg'} font-bold leading-none`}>{formattedDate.date}</div>
            <div className="text-[10px] uppercase text-purple-400">{formattedDate.month}</div>
          </div>

          <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className={`${variant === 'compact' ? 'p-3' : 'p-4'}`}>
          <div className="flex items-center gap-1.5 text-purple-400 text-[10px] mb-1.5">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/60">{formattedDate.time}</span>
          </div>

          <h3 className={`${style.titleSize} font-bold mb-2 leading-tight group-hover:text-purple-300 transition-colors line-clamp-2`}>
            {event.title}
          </h3>

          <div className={`${variant === 'compact' ? 'text-base' : 'text-lg'} font-bold`}>
            ${event.price}
            <span className="text-[10px] font-normal text-slate-500 ml-0.5">/ person</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
