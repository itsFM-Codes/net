'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto text-center py-16"
    >
      <div className="relative w-32 h-32 mx-auto mb-8">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute inset-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <motion.svg
            className="w-12 h-12 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </motion.svg>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Sign In Required
      </h2>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        Please sign in to view your bookings and manage your cosmic adventures.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 cursor-none"
          >
            Sign In
          </motion.button>
        </Link>
        <Link href="/register">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-xl font-medium transition-all duration-200 hover:bg-white/5 cursor-none"
          >
            Create Account
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
