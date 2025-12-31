'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function EmptyBookings() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto text-center py-16"
    >
      <div className="relative w-48 h-48 mx-auto mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500/50" />
        </motion.div>

        <motion.div
          className="absolute inset-6 rounded-full border border-fuchsia-500/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-fuchsia-500/50" />
        </motion.div>

        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center">
          <motion.svg
            className="w-16 h-16 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </motion.svg>
        </div>

        <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        No Bookings Yet
      </h2>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        Your cosmic journey awaits! Explore our events and book your first adventure through the stars.
      </p>

      <Link href="/event">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 cursor-none"
        >
          Explore Events
        </motion.button>
      </Link>
    </motion.div>
  );
}
