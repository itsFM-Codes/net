'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Planet from "./planet";

export default function HeroSection() {
  return (
    <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
      <Planet />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-violet-800/5 to-indigo-900/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-purple-400/70 text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Journey Beyond the Stars
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="block text-white">Experience the Wonders</span>
          <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            of the Universe
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-slate-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          at <span className="text-purple-300 font-medium">Pulsar</span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/event">
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-300 cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-hover
            >
              View Events
            </motion.button>
          </Link>

          <Link href="/booking">
            <motion.button
              className="px-10 py-4 border-2 border-purple-500/40 rounded-full text-purple-300 font-semibold text-lg hover:bg-purple-500/10 hover:border-purple-400/60 transition-all duration-300 cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-hover
            >
              My Bookings
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-slate-500"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
