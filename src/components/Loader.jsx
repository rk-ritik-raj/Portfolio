import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ finishLoading }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finishLoading();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0B1120]"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />

      <div className="relative flex flex-col items-center">
        {/* Animated circle loader */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="64"
              className="stroke-slate-800/80 fill-none"
              strokeWidth="4"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="64"
              className="stroke-primary fill-none"
              strokeWidth="4"
              strokeDasharray={402}
              strokeDashoffset={402 - (402 * percent) / 100}
              transition={{ ease: "easeInOut" }}
            />
          </svg>

          {/* RK Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            RK
          </motion.div>
        </div>

        {/* Loading Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 font-mono text-sm tracking-widest text-textSecondary flex flex-col items-center gap-1"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Initializing Portfolio</span>
          <span className="text-highlight font-bold text-lg">{percent}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
