import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function BackgroundEffect() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background base */}
      <div className="absolute inset-0 bg-[#0B1120]" />
      
      {/* Glowing animated background blobs */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-[35%] -right-[10%] w-[45%] h-[45%] rounded-full bg-accent/8 blur-[130px] mix-blend-screen animate-float-slow" />
      <div className="absolute -bottom-[10%] left-[15%] w-[45%] h-[45%] rounded-full bg-secondary/8 blur-[120px] mix-blend-screen animate-float-medium" />

      {/* Tech Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `radial-gradient(circle, #F8FAFC 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Desktop Cursor Glow */}
      {!isMobile && (
        <motion.div
          className="fixed w-[450px] h-[450px] rounded-full cursor-glow-dot z-[1] pointer-events-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </div>
  );
}
