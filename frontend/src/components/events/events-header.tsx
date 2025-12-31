'use client';

import { motion } from "framer-motion";

export default function EventsHeader() {
  return (
    <motion.div
      className="lg:w-[380px] lg:flex-shrink-0 lg:sticky lg:top-32"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-purple-400/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
        Explore the Cosmos
      </p>  
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.1]">
        Upcoming{' '}
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Events
        </span>
      </h1>
      <p className="text-slate-400 text-base md:text-lg">
        Discover extraordinary cosmic experiences at Pulsar Planetarium.
      </p>
    </motion.div>
  );
}
