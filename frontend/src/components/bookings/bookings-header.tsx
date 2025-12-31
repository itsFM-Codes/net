'use client';

import { motion } from "framer-motion";

export default function BookingsHeader() {
  return (
    <motion.div
      className="lg:w-[380px] lg:flex-shrink-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-purple-400/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
        Your Journey
      </p>  
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.1]">
        My{' '}
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Bookings
        </span>
      </h1>
      <p className="text-slate-400 text-base md:text-lg">
        Track your upcoming cosmic adventures and manage your reservations.
      </p>
    </motion.div>
  );
}
