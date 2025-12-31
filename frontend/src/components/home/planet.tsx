'use client';

import { motion } from "framer-motion";

export default function Planet() {
  return (
    <div className="absolute bottom-[-16%] right-[-6%] w-[45vh] h-[45vh] sm:w-[55vh] sm:h-[55vh] md:w-[65vh] md:h-[65vh] lg:w-[72vh] lg:h-[72vh] pointer-events-none">
      <motion.div 
        className="absolute inset-[-200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.04) 30%, rgba(99, 102, 241, 0.02) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute rounded-full"
        style={{
          top: '-5%',
          left: '-15%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse 100% 100% at 70% 70%, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.2) 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div 
        className="absolute"
        style={{
          top: '-20%',
          left: '-25%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse 80% 80% at 60% 60%, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      <div className="absolute inset-[-150px] rounded-full bg-purple-800/[0.12] blur-[100px]" />
      <div className="absolute inset-[-100px] rounded-full bg-violet-700/[0.15] blur-[80px]" />
      
      <motion.div 
        className="absolute inset-[-50px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 40%, rgba(168, 85, 247, 0.1) 60%, transparent 80%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div 
        className="absolute inset-[-6px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #1a0d30 0%, #120a28 20%, #060412 50%, #000000 70%)',
          filter: 'blur(12px)',
          opacity: 0.95,
        }}
      />
      
      <motion.div
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #120a28 0%, #0e0820 10%, #0a0618 20%, #060412 35%, #000000 55%, #000000 100%)',
          boxShadow: `
            inset -100px -100px 160px rgba(0,0,0,1), 
            inset 20px 20px 60px rgba(168, 85, 247, 0.5), 
            inset 5px 5px 20px rgba(255, 255, 255, 0.2), 
            0 0 40px rgba(139, 92, 246, 0.5),
            0 0 80px rgba(139, 92, 246, 0.3),
            0 0 120px rgba(168, 85, 247, 0.2),
            0 0 180px rgba(99, 102, 241, 0.1)
          `,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 600, repeat: Infinity, ease: "linear" }}
      > 
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} /> 
        
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 120% 20% at 50% 5%, rgba(34, 211, 238, 0.3) 0%, rgba(139, 92, 246, 0.15) 30%, transparent 60%),
              radial-gradient(ellipse 100% 15% at 50% 95%, rgba(236, 72, 153, 0.25) 0%, rgba(168, 85, 247, 0.1) 30%, transparent 60%)
            `,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 rounded-full opacity-50" style={{
          background: `
            radial-gradient(ellipse 100px 50px at 25% 35%, rgba(139, 92, 246, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 150px 70px at 60% 25%, rgba(236, 72, 153, 0.25) 0%, transparent 70%),
            radial-gradient(ellipse 120px 60px at 40% 60%, rgba(34, 211, 238, 0.2) 0%, transparent 70%),
            radial-gradient(ellipse 80px 100px at 70% 55%, rgba(168, 85, 247, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 110px 55px at 20% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)
          `,
        }} />
        
        <motion.div 
          className="absolute w-[120px] h-[80px] rounded-full"
          style={{
            top: '35%',
            left: '25%',
            background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.5) 0%, rgba(168, 85, 247, 0.3) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 rounded-full opacity-40" style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%, 
              rgba(139, 92, 246, 0.15) 12%,
              transparent 18%,
              rgba(236, 72, 153, 0.1) 28%,
              transparent 35%,
              rgba(34, 211, 238, 0.12) 45%,
              transparent 52%,
              rgba(168, 85, 247, 0.15) 62%,
              transparent 70%,
              rgba(99, 102, 241, 0.1) 80%,
              transparent 88%,
              rgba(139, 92, 246, 0.08) 95%,
              transparent 100%
            )
          `,
        }} />
        
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `
              radial-gradient(circle 20px at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
              radial-gradient(circle 30px at 55% 30%, rgba(236, 72, 153, 0.4) 0%, transparent 100%),
              radial-gradient(circle 15px at 45% 55%, rgba(34, 211, 238, 0.5) 0%, transparent 100%),
              radial-gradient(circle 25px at 65% 65%, rgba(139, 92, 246, 0.4) 0%, transparent 100%),
              radial-gradient(circle 18px at 25% 60%, rgba(168, 85, 247, 0.35) 0%, transparent 100%),
              radial-gradient(circle 22px at 50% 75%, rgba(99, 102, 241, 0.3) 0%, transparent 100%)
            `,
          }}
        />
        
        <div className="absolute inset-0 rounded-full opacity-30" style={{
          background: `
            radial-gradient(ellipse 200% 35% at 50% 8%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 200% 30% at 50% 92%, rgba(200, 200, 255, 0.1) 0%, transparent 50%)
          `,
        }} />
        
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(135deg, transparent 0%, transparent 28%, rgba(0, 0, 0, 0.1) 35%, rgba(0, 0, 0, 0.25) 42%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.55) 60%, rgba(0, 0, 0, 0.65) 75%, rgba(0, 0, 0, 0.7) 100%)',
        }} />
        
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 80% 20%, transparent 50%, rgba(139, 92, 246, 0.2) 70%, rgba(236, 72, 153, 0.1) 85%, transparent 100%)',
          }}
        />
        
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(125deg, transparent 0%, transparent 38%, rgba(139, 92, 246, 0.06) 45%, rgba(139, 92, 246, 0.08) 50%, rgba(139, 92, 246, 0.06) 55%, transparent 62%, transparent 100%)',
        }} />
        
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle at 25% 28%, rgba(255, 255, 255, 0.12) 0%, transparent 35%)',
        }} />
        
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(200, 180, 255, 0.08) 0%, transparent 25%)',
        }} />
      </motion.div>
      
      <motion.div
        className="absolute inset-[-50px] pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 3px at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
            radial-gradient(circle 2px at 80% 20%, rgba(200, 180, 255, 0.2) 0%, transparent 100%),
            radial-gradient(circle 4px at 15% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 100%),
            radial-gradient(circle 2px at 85% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 100%),
            radial-gradient(circle 3px at 50% 10%, rgba(168, 85, 247, 0.12) 0%, transparent 100%)
          `,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
