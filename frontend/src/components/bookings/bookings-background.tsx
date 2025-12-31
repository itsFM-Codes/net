'use client';

import { motion } from "framer-motion";

const stars = [...Array(60)].map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.7 + 0.3,
  layer: Math.floor(Math.random() * 3),
}));

const randomOffset = () => (Math.random() - 0.5) * 30;

const constellations = [
  {
    name: 'pegasus',
    offsetX: 60 + randomOffset(),
    offsetY: 8 + Math.random() * 15,
    scale: 0.5,
    stars: [
      { x: 5, y: 3 },
      { x: 10, y: 7 },
      { x: 15, y: 10 },
      { x: 23, y: 9 },
      { x: 27, y: 5 },
      { x: 13, y: 17 },
      { x: 11, y: 23 },
      { x: 21, y: 15 },
      { x: 23, y: 21 },
      { x: 7, y: 1 },
      { x: 17, y: 3 },
      { x: 13, y: 0 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [2,5], [5,6], [3,7], [7,8], [0,9], [2,10], [10,11], [11,2]],
  },
  {
    name: 'cygnus',
    offsetX: 5 + randomOffset(),
    offsetY: 25 + Math.random() * 20,
    scale: 0.6,
    stars: [
      { x: 10, y: 5 },
      { x: 13, y: 10 },
      { x: 17, y: 15 },
      { x: 23, y: 20 },
      { x: 10, y: 15 },
      { x: 5, y: 12 },
      { x: 23, y: 12 },
      { x: 28, y: 8 },
    ],
    connections: [[0,1], [1,2], [2,3], [2,4], [4,5], [2,6], [6,7]],
  },
  {
    name: 'ursa-minor',
    offsetX: 35 + randomOffset(),
    offsetY: 50 + Math.random() * 20,
    scale: 0.8,
    stars: [
      { x: 0, y: 0 },
      { x: 3, y: 4 },
      { x: 7, y: 2 },
      { x: 10, y: 6 },
      { x: 9, y: 10 },
      { x: 5, y: 12 },
      { x: 7, y: 8 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,3]],
  },
  {
    name: 'lyra',
    offsetX: 70 + randomOffset(),
    offsetY: 55 + Math.random() * 15,
    scale: 0.8,
    stars: [
      { x: 8, y: 0 },
      { x: 5, y: 5 },
      { x: 11, y: 5 },
      { x: 4, y: 12 },
      { x: 12, y: 12 },
      { x: 8, y: 8 },
    ],
    connections: [[0,1], [0,2], [1,3], [2,4], [1,5], [2,5], [3,5], [4,5]],
  },
  {
    name: 'orion-belt',
    offsetX: 15 + randomOffset(),
    offsetY: 70 + Math.random() * 15,
    scale: 1,
    stars: [
      { x: 0, y: 0 },
      { x: 5, y: 2 },
      { x: 10, y: 4 },
    ],
    connections: [[0,1], [1,2]],
  },
];

const layer0Stars = stars.filter(s => s.layer === 0);
const layer1Stars = stars.filter(s => s.layer === 1);
const layer2Stars = stars.filter(s => s.layer === 2);

export default function BookingsBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0a0118] to-black" />
      
      <div className="absolute inset-0">
        <div
          className="absolute rounded-full"
          style={{
            left: '-5%',
            top: '-5%',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: '75%',
            top: '30%',
            width: 450,
            height: 450,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: '20%',
            top: '70%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="absolute inset-0">
        {layer0Stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size * 0.8,
              height: star.size * 0.8,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {layer1Stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/60"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {layer2Stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size * 1.2,
              height: star.size * 1.2,
            }}
          />
        ))}
      </div>

      <svg className="absolute inset-0 w-full h-full">
        {constellations.map((constellation, ci) => (
          <g key={constellation.name}>
            {constellation.connections.map(([from, to], li) => (
              <motion.line
                key={`${ci}-line-${li}`}
                x1={`${constellation.offsetX + constellation.stars[from].x * constellation.scale}%`}
                y1={`${constellation.offsetY + constellation.stars[from].y * constellation.scale}%`}
                x2={`${constellation.offsetX + constellation.stars[to].x * constellation.scale}%`}
                y2={`${constellation.offsetY + constellation.stars[to].y * constellation.scale}%`}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.5, delay: ci * 0.3 + li * 0.06 },
                  opacity: { duration: 0.5, delay: ci * 0.3 + li * 0.06 },
                }}
              />
            ))}
            {constellation.stars.map((star, si) => (
              <motion.circle
                key={`${ci}-star-${si}`}
                cx={`${constellation.offsetX + star.x * constellation.scale}%`}
                cy={`${constellation.offsetY + star.y * constellation.scale}%`}
                r="2"
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.85, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: ci * 0.3 + si * 0.04,
                }}
                style={{
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))',
                }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
