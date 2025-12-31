'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinSection() {
  return (
    <section className="relative z-10 min-h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <motion.div
          className="absolute bottom-[45%] left-0 right-0 h-[350px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.03) 40%, rgba(139, 92, 246, 0.08) 70%, rgba(236, 72, 153, 0.05) 90%, transparent 100%)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2">
          <motion.div
            className="absolute -inset-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.12) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 65%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.2) 0%, rgba(251, 146, 60, 0.1) 40%, transparent 65%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-[150px] h-[150px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(253, 224, 71, 0.5) 25%, rgba(251, 146, 60, 0.25) 50%, transparent 75%)',
              filter: 'blur(15px)',
            }}
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <svg className="absolute bottom-0 left-0 right-0 w-full h-[50%] z-10" preserveAspectRatio="none" viewBox="0 0 1440 500">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a0a2e" stopOpacity="1" />
              <stop offset="20%" stopColor="#130824" stopOpacity="1" />
              <stop offset="40%" stopColor="#0a0412" stopOpacity="1" />
              <stop offset="60%" stopColor="#000000" stopOpacity="1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="mountainEdgeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="15%" stopColor="#7c3aed" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#1a0a2e" stopOpacity="1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,500 L0,140 L100,100 L200,130 L320,70 L450,110 L580,50 L720,90 L850,40 L1000,80 L1120,55 L1250,95 L1350,65 L1440,100 L1440,500 Z"
            fill="url(#mountainEdgeGlow)"
            style={{ filter: 'blur(15px)' }}
          />
          <path
            d="M0,500 L0,160 L100,120 L200,150 L320,90 L450,130 L580,70 L720,110 L850,60 L1000,100 L1120,75 L1250,115 L1350,85 L1440,120 L1440,500 Z"
            fill="url(#mountainGradient)"
          />
          <path
            d="M0,500 L0,220 L80,190 L160,210 L260,160 L380,195 L480,145 L600,180 L720,130 L860,170 L960,140 L1100,175 L1200,150 L1320,180 L1400,160 L1440,185 L1440,500 Z"
            fill="#000000"
          />
        </svg>

        <div className="absolute top-[12%] left-[10%]">
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '180px',
              height: '180px',
              top: '-50px',
              left: '-55px',
              background: 'radial-gradient(circle at 45% 50%, rgba(226, 232, 240, 0.25) 0%, rgba(148, 163, 184, 0.12) 50%, transparent 70%)',
              filter: 'blur(25px)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="relative"
            animate={{
              filter: [
                'drop-shadow(0 0 12px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 30px rgba(203, 213, 225, 0.5)) drop-shadow(0 0 50px rgba(148, 163, 184, 0.3))',
                'drop-shadow(0 0 18px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 45px rgba(203, 213, 225, 0.6)) drop-shadow(0 0 70px rgba(148, 163, 184, 0.4))',
                'drop-shadow(0 0 12px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 30px rgba(203, 213, 225, 0.5)) drop-shadow(0 0 50px rgba(148, 163, 184, 0.3))',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <defs>
              <mask id="crescentMask">
                <circle cx="50" cy="50" r="45" fill="white" />
                <circle cx="70" cy="45" r="38" fill="black" />
              </mask>
              <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="url(#moonGradient)"
              mask="url(#crescentMask)"
            />
          </motion.svg>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-purple-400/70 text-sm tracking-[0.3em] uppercase mt-10 mb-4"
          >
            Start Your Adventure
          </motion.p>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join the{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Cosmos
            </span>
          </h2>
          
          <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">
            Create your free account to unlock exclusive celestial experiences, early access to events, and personalized cosmic journeys.
          </p>
        </motion.div>

        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full" />
            
            <Link href="/register">
              <motion.button
                className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full text-white font-medium text-base shadow-lg shadow-purple-500/25 cursor-none flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                <span>Create Free Account</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </Link>

            <Link href="/login">
              <motion.button
                className="relative px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium text-base backdrop-blur-sm cursor-none hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-1">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm">Early Access</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-1">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm">Exclusive Events</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-1">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm">Member Discounts</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 py-4 px-6 border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm">Pulsar</span>
          </div>
          
          <p className="text-slate-600 text-xs">
            © 2024 All rights reserved.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
