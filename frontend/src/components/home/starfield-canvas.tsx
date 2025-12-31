'use client';

import { useEffect, useRef, RefObject } from "react";
import { Star, Meteor, Constellation } from "./constants";

interface StarfieldCanvasProps {
  containerRef: RefObject<HTMLDivElement | null>;
  mouseRef: RefObject<{ x: number; y: number }>;
}

export default function StarfieldCanvas({ containerRef, mouseRef }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let constellations: Constellation[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initConstellations();
    };

    const initStars = () => {
      stars = [];
      const totalHeight = window.innerHeight * 4;
      const count = Math.floor((canvas.width * totalHeight) / 16000); 
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * totalHeight,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          speed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    const initConstellations = () => {
      constellations = [];
      const totalHeight = window.innerHeight * 4;
      const count = Math.floor(totalHeight / 400); 
      const centers: {x: number, y: number}[] = [];

      for (let i = 0; i < count; i++) {
        let centerX = 0, centerY = 0;
        let valid = false;
        let attempts = 0;
        
        while (!valid && attempts < 50) {
          centerX = Math.random() * (canvas.width - 200) + 100;
          centerY = Math.random() * totalHeight;
          valid = true;
          for (const c of centers) {
            const dx = c.x - centerX;
            const dy = c.y - centerY;
            if (Math.sqrt(dx*dx + dy*dy) < 500) {
              valid = false;
              break;
            }
          }
          attempts++;
        }

        if (!valid) continue;
        centers.push({x: centerX, y: centerY});

        const numStars = Math.floor(Math.random() * 3) + 3; 
        
        const points: {x: number, y: number}[] = [];
        for(let j=0; j<numStars; j++) {
            points.push({
                x: centerX + (Math.random() * 300 - 150),
                y: centerY + (Math.random() * 300 - 150)
            });
        }
        
        const path: {x: number, y: number}[] = [points[0]];
        const unvisited = points.slice(1);
        
        while(unvisited.length > 0) {
            const current = path[path.length - 1];
            let nearestIdx = 0;
            let minDist = Number.MAX_VALUE;
            
            for(let k=0; k<unvisited.length; k++) {
                const dx = unvisited[k].x - current.x;
                const dy = unvisited[k].y - current.y;
                const dist = dx*dx + dy*dy;
                if(dist < minDist) {
                    minDist = dist;
                    nearestIdx = k;
                }
            }
            
            path.push(unvisited[nearestIdx]);
            unvisited.splice(nearestIdx, 1);
        }
        
        let totalLength = 0;
        const segmentLengths: number[] = [];
        for(let k=0; k<path.length-1; k++) {
            const dx = path[k+1].x - path[k].x;
            const dy = path[k+1].y - path[k].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            segmentLengths.push(dist);
            totalLength += dist;
        }

        constellations.push({
          stars: path,
          opacity: Math.random() * 0.5 + 0.4,
          speed: Math.random() * 0.005 + 0.001,
          pulseOffset: Math.random(),
          pulseDirection: 1,
          totalLength,
          segmentLengths,
        });
      }
    };

    const createMeteor = () => {
      const scrollTop = container.scrollTop;
      const startX = Math.random() * canvas.width;
      const startY = scrollTop + Math.random() * (window.innerHeight / 2);
      const angle = Math.PI * 0.75 + (Math.random() * 0.2 - 0.1);
      const speed = 5 + Math.random() * 10;
      
      meteors.push({
        x: startX,
        y: startY,
        length: 100 + Math.random() * 50,
        speed: speed,
        opacity: 1,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
      });
    };

    const animate = () => {
      const scrollTop = container.scrollTop;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;

      const glowGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      glowGradient.addColorStop(0, "rgba(100, 100, 255, 0.15)");
      glowGradient.addColorStop(1, "transparent");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      constellations.forEach((c) => {
        c.pulseOffset += 0.003 * c.pulseDirection;
        if (c.pulseOffset > 1 || c.pulseOffset < 0) {
          c.pulseDirection *= -1;
        }
        
        const firstStarY = c.stars[0].y - scrollTop;
        if (firstStarY > -300 && firstStarY < canvas.height + 300) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
          ctx.lineWidth = 1;
          
          c.stars.forEach((star, index) => {
            const drawY = star.y - scrollTop;
            if (index === 0) {
              ctx.moveTo(star.x, drawY);
            } else {
              ctx.lineTo(star.x, drawY);
            }
          });
          ctx.stroke();
          
          const totalSegments = c.stars.length - 1;
          const stripPixelLength = 80;
          const currentPixelPos = c.pulseOffset * c.totalLength;
          const startPixel = currentPixelPos - stripPixelLength / 2;
          const endPixel = currentPixelPos + stripPixelLength / 2;

          let currentSegmentStartPixel = 0;

          for (let i = 0; i < totalSegments; i++) {
            const segmentLength = c.segmentLengths[i];
            const currentSegmentEndPixel = currentSegmentStartPixel + segmentLength;
            
            const overlapStart = Math.max(startPixel, currentSegmentStartPixel);
            const overlapEnd = Math.min(endPixel, currentSegmentEndPixel);

            if (overlapStart < overlapEnd) {
              const localStartT = (overlapStart - currentSegmentStartPixel) / segmentLength;
              const localEndT = (overlapEnd - currentSegmentStartPixel) / segmentLength;

              const p1 = c.stars[i];
              const p2 = c.stars[i + 1];

              const x1 = p1.x + (p2.x - p1.x) * localStartT;
              const y1 = (p1.y - scrollTop) + ((p2.y - scrollTop) - (p1.y - scrollTop)) * localStartT;
              
              const x2 = p1.x + (p2.x - p1.x) * localEndT;
              const y2 = (p1.y - scrollTop) + ((p2.y - scrollTop) - (p1.y - scrollTop)) * localEndT;
    
              const grad = ctx.createLinearGradient(x1, y1, x2, y2);
              
              const getOpacity = (pixelPos: number) => {
                  const dist = Math.abs(pixelPos - currentPixelPos);
                  return Math.max(0, 1 - dist / (stripPixelLength / 2));
              };

              grad.addColorStop(0, `rgba(255, 255, 255, ${getOpacity(overlapStart)})`);
              
              if (currentPixelPos > overlapStart && currentPixelPos < overlapEnd) {
                  const peakPos = (currentPixelPos - overlapStart) / (overlapEnd - overlapStart);
                  grad.addColorStop(peakPos, `rgba(255, 255, 255, 1)`);
              }
              
              grad.addColorStop(1, `rgba(255, 255, 255, ${getOpacity(overlapEnd)})`);

              ctx.beginPath();
              ctx.strokeStyle = grad;
              ctx.lineWidth = 2;
              ctx.lineCap = 'round';
              ctx.shadowBlur = 5;
              ctx.shadowColor = "white";
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
            
            currentSegmentStartPixel += segmentLength;
          }
          
          c.stars.forEach((star) => {
             const drawY = star.y - scrollTop;
             ctx.fillStyle = `rgba(255, 255, 255, ${c.opacity})`;
             ctx.beginPath();
             ctx.arc(star.x, drawY, 2, 0, Math.PI * 2);
             ctx.fill();
          });
        }
      });

      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.speed = -star.speed;
        }
        
        const drawY = star.y - scrollTop;
        if (drawY >= -10 && drawY <= canvas.height + 10) {
          const dx = star.x - mouse.x;
          const dy = drawY - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const size = star.size;
          let opacity = star.opacity;

          if (dist < 150) {
            opacity = Math.min(1, star.opacity + 0.5);
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, drawY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.opacity -= 0.02;
        if (m.opacity <= 0 || m.x < 0 || m.x > canvas.width) {
          meteors.splice(i, 1);
          continue;
        }

        const drawY = m.y - scrollTop;
        
        if (drawY > -200 && drawY < canvas.height + 200) {
          const tailX = m.x - (m.dx / m.speed) * m.length;
          const tailY = drawY - (m.dy / m.speed) * m.length;

          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(255, 255, 255, 0.6)";

          const grad = ctx.createLinearGradient(m.x, drawY, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, drawY);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          
          ctx.shadowBlur = 25;
          ctx.shadowColor = "rgba(255, 255, 255, 1)";
          ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`;
          ctx.beginPath();
          ctx.arc(m.x, drawY, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (Math.random() < 0.03) {
        createMeteor();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef, mouseRef]);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />
  );
}
