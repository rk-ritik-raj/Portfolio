import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTasks, FaGithub, FaCode, FaBookOpen } from 'react-icons/fa';

function Counter({ end, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime = null;
    const endVal = parseInt(end, 10);
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(rate * endVal));
      
      if (rate < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endVal);
      }
    };
    
    let animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-poppins font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-highlight drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { id: 1, label: "Projects Completed", value: 15, suffix: "+", icon: <FaTasks size={20} className="text-primary" /> },
  { id: 2, label: "GitHub Repositories", value: 30, suffix: "+", icon: <FaGithub size={20} className="text-secondary" /> },
  { id: 3, label: "LeetCode Problems", value: 300, suffix: "+", icon: <FaCode size={20} className="text-accent" /> },
  { id: 4, label: "Technologies Learned", value: 12, suffix: "+", icon: <FaBookOpen size={20} className="text-highlight" /> },
];

export default function Achievements() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-slate-950/20 border-y border-slate-900/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_60%)]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-[22px] flex flex-col items-center justify-center text-center gap-3 relative group"
            >
              {/* Subtle back glowing */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-highlight/30 transition-colors duration-300">
                {stat.icon}
              </div>

              <div className="flex flex-col gap-1">
                <Counter end={stat.value} suffix={stat.suffix} />
                <span className="text-xs md:text-sm font-semibold tracking-wider font-mono text-slate-500 uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
