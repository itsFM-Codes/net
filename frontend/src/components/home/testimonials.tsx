'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Astronomy Enthusiast",
    quote: "The Journey to the Edge of the Universe show literally brought tears to my eyes. I've never felt so small and yet so connected to everything around me.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "Science Teacher",
    quote: "I bring my students here every semester. The way Pulsar makes complex astronomical concepts accessible is nothing short of magical.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "First-time Visitor",
    quote: "The Aurora Borealis Experience was absolutely breathtaking. It felt like I was actually standing under the northern lights!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: "4",
    name: "David Park",
    role: "Astrophotographer",
    quote: "As someone who photographs the night sky professionally, I was blown away by the accuracy and beauty of their visualizations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Parent",
    quote: "My kids haven't stopped talking about their visit. The interactive exhibits sparked a genuine curiosity about space that I've never seen before.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
  {
    id: "6",
    name: "James Mitchell",
    role: "Retired Astronomer",
    quote: "After 40 years studying the cosmos, I thought nothing could surprise me. Pulsar proved me wrong with their incredible immersive experiences.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  const avatarPositions: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    size: number;
    bubblePos: 'right' | 'left' | 'top' | 'bottom';
  }[] = [
    { top: '24%', left: '13%', size: 90, bubblePos: 'right' },
    { top: '30%', right: '12%', size: 88, bubblePos: 'left' },
    { top: '52%', left: '10%', size: 80, bubblePos: 'right' },
    { top: '58%', right: '10%', size: 85, bubblePos: 'left' },
    { bottom: '14%', left: '11%', size: 80, bubblePos: 'right' },
    { bottom: '8%', right: '13%', size: 82, bubblePos: 'left' },
  ];

  return (
    <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute top-28 left-1/2 -translate-x-1/2 text-center z-30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-purple-400/70 text-sm tracking-[0.3em] uppercase mb-4">
          What People Say
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Visitor <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Testimonials</span>
        </h2>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="testimonials-center absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px]"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              border: '2px solid transparent',
              background: 'linear-gradient(0deg, transparent, rgba(168, 85, 247, 0.5), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              willChange: 'transform',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              border: '2px solid transparent',
              background: 'linear-gradient(180deg, transparent, rgba(236, 72, 153, 0.5), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              willChange: 'transform',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-16 rounded-full"
            style={{ 
              border: '2px solid transparent',
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              willChange: 'transform',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-16 rounded-full"
            style={{ 
              border: '2px solid transparent',
              background: 'linear-gradient(270deg, transparent, rgba(59, 130, 246, 0.5), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              willChange: 'transform',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-32 rounded-full"
            style={{ 
              border: '3px solid transparent',
              background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.6), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              willChange: 'transform',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-purple-400"
              style={{
                boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.8)',
                willChange: 'transform, opacity',
              }}
              animate={{
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 240],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 240],
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeOut",
              }}
            />
          ))}

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-pink-400"
              style={{
                boxShadow: '0 0 12px 3px rgba(236, 72, 153, 0.8)',
                willChange: 'transform, opacity',
              }}
              animate={{
                x: [Math.cos(i * 45 * Math.PI / 180) * 155, 0],
                y: [Math.sin(i * 45 * Math.PI / 180) * 155, 0],
                opacity: [0, 1, 1, 0],
                scale: [1.5, 0.5, 0.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3 + 0.5,
                ease: "easeIn",
              }}
            />
          ))}

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
            style={{ 
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
              filter: 'blur(8px)',
              willChange: 'transform, opacity',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{ 
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
              willChange: 'transform, opacity',
            }}
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10"
            style={{ 
              boxShadow: '0 0 60px 20px rgba(168, 85, 247, 0.5), 0 0 100px 40px rgba(139, 92, 246, 0.3), 0 0 140px 60px rgba(236, 72, 153, 0.2)',
              willChange: 'transform',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500/40"
              style={{ willChange: 'transform, opacity' }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ 
                width: [0, 425], 
                height: [0, 425], 
                opacity: [0.8, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {testimonials.map((testimonial, index) => {
        const pos = avatarPositions[index];
        const isActive = index === activeIndex;
        
        return (
          <motion.button
            key={testimonial.id}
            className="absolute cursor-none"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
            }}
            onClick={() => setActiveIndex(index)}
            data-hover
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="rounded-full overflow-hidden"
                style={{ width: pos.size, height: pos.size }}
                animate={{
                  boxShadow: isActive 
                    ? '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(168, 85, 247, 0.3)'
                    : '0 0 20px rgba(168, 85, 247, 0.2)',
                  borderWidth: isActive ? 3 : 2,
                  borderColor: isActive ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.3)',
                }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  style={{
                    filter: isActive ? 'grayscale(0%)' : 'grayscale(50%)',
                    transition: 'filter 0.4s',
                  }}
                />
              </motion.div>
              
              {isActive && (
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-purple-400/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className={`absolute z-20 ${
                      pos.bubblePos === 'right' ? 'left-full ml-10 top-1/2 -translate-y-1/2' :
                      pos.bubblePos === 'left' ? 'right-full mr-10 top-1/2 -translate-y-1/2' :
                      pos.bubblePos === 'bottom' ? 'top-full mt-10 left-1/2 -translate-x-1/2' :
                      'bottom-full mb-10 left-1/2 -translate-x-1/2'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`testimonials-bubble relative bg-white/10 backdrop-blur-md rounded-2xl p-4 w-[320px] border border-white/20`}>
                      <p className="text-white text-sm leading-relaxed mb-3">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-purple-400 text-xs font-medium">{testimonial.name}</p>
                      <p className="text-slate-400 text-xs">{testimonial.role}</p>
                      
                      <div className={`absolute w-3 h-3 bg-white/10 border border-white/20 rotate-45 ${
                        pos.bubblePos === 'right' ? '-left-1.5 top-1/2 -translate-y-1/2 border-r-0 border-t-0' :
                        pos.bubblePos === 'left' ? '-right-1.5 top-1/2 -translate-y-1/2 border-l-0 border-b-0' :
                        pos.bubblePos === 'bottom' ? '-top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0' :
                        '-bottom-1.5 left-1/2 -translate-x-1/2 border-l-0 border-t-0'
                      }`} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        );
      })}
    </section>
  );
}
