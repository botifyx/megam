
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const AIParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        mouseRef.current.isActive = true;
    };
    
    const handleMouseLeave = () => {
        mouseRef.current.isActive = false;
    };

    if (canvas.parentElement) {
        canvas.parentElement.addEventListener('mousemove', handleMouseMove);
        canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    const particleCount = 70; 
    
    interface Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        baseVx: number;
        baseVy: number;
        life: number;
        size: number;
        thinking: number; 
    }

    interface NeuralPulse {
      start: number;
      end: number;
      progress: number;
      speed: number;
    }

    const particles: Particle[] = [];
    let pulses: NeuralPulse[] = [];
    
    for(let i=0; i<particleCount; i++) {
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: vx,
            vy: vy,
            baseVx: vx,
            baseVy: vy,
            life: Math.random() * Math.PI * 2,
            size: Math.random() * 1.5 + 0.5,
            thinking: 0
        });
    }

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      const mouse = mouseRef.current;
      const ease = 0.04;

      // Theme-based colors
      const particleBaseColor = theme === 'dark' ? '0, 240, 255' : '59, 130, 246';
      const connectionColor = theme === 'dark' ? '59, 130, 246' : '59, 130, 246';
      const pulseColor = theme === 'dark' ? '255, 255, 255' : '15, 23, 42';

      pulses = pulses.filter(p => p.progress < 1);
      pulses.forEach(p => p.progress += p.speed);

      if (Math.random() > 0.96 && particles.length > 2) {
        const startIdx = Math.floor(Math.random() * particles.length);
        const endIdx = Math.floor(Math.random() * particles.length);
        if (startIdx !== endIdx) {
          const dist = Math.hypot(particles[startIdx].x - particles[endIdx].x, particles[startIdx].y - particles[endIdx].y);
          if (dist < 250) {
            pulses.push({
              start: startIdx,
              end: endIdx,
              progress: 0,
              speed: (Math.random() * 0.02) + 0.01
            });
          }
        }
      }

      particles.forEach((p, i) => {
          if (mouse.isActive) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const interactionRadius = 250;

              if (dist < interactionRadius) {
                  const force = (interactionRadius - dist) / interactionRadius;
                  const angle = Math.atan2(dy, dx);
                  const pushStrength = 0.5;
                  p.vx -= Math.cos(angle) * force * pushStrength;
                  p.vy -= Math.sin(angle) * force * pushStrength;
              }
          }

          p.x += p.vx;
          p.y += p.vy;
          p.life += 0.015;
          p.thinking = Math.max(0, p.thinking - 0.05);

          p.vx += (p.baseVx - p.vx) * ease;
          p.vy += (p.baseVy - p.vy) * ease;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const connectDist = 200;

              if (dist < connectDist) {
                  const alpha = (1 - dist/connectDist) * (theme === 'dark' ? 0.12 : 0.08);
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(${connectionColor}, ${alpha})`;
                  ctx.lineWidth = 0.5;
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }

          const opacity = (Math.sin(p.life) + 1) / 2 * (theme === 'dark' ? 0.3 : 0.2) + 0.1 + p.thinking; 
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particleBaseColor}, ${opacity})`; 
          ctx.fill();

          pulses.forEach(pulse => {
            if (pulse.start === i || pulse.end === i) {
              const pStart = particles[pulse.start];
              const pEnd = particles[pulse.end];
              
              const pulseX = pStart.x + (pEnd.x - pStart.x) * pulse.progress;
              const pulseY = pStart.y + (pEnd.y - pStart.y) * pulse.progress;
              
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${pulseColor}, ${0.8 * (1 - pulse.progress)})`;
              ctx.fill();
              
              if (pulse.progress > 0.9) pEnd.thinking = 0.5;
            }
          });

          if (mouse.isActive) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const mouseConnectDist = 180;

              if (dist < mouseConnectDist) {
                  ctx.beginPath();
                  const alpha = (1 - dist/mouseConnectDist) * (theme === 'dark' ? 0.3 : 0.2);
                  ctx.strokeStyle = `rgba(${particleBaseColor}, ${alpha})`;
                  ctx.lineWidth = 0.6;
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(mouse.x, mouse.y);
                  ctx.stroke();
              }
          }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        window.removeEventListener('resize', resize);
        if (canvas.parentElement) {
             canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
             canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
        }
        cancelAnimationFrame(animationFrameId);
    }
  }, [theme]); // Re-run when theme changes

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.7, mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};

export default AIParticlesBackground;
