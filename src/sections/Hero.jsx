import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaReact, FaNodeJs, FaCog } from 'react-icons/fa';
import { SiMongodb, SiLeetcode, SiCplusplus } from 'react-icons/si';
import { DiJavascript1 } from 'react-icons/di';

const words = ["Software Developer", "MERN Stack Developer", "Full Stack Developer", "AI Enthusiast"];

export default function Hero({ onOpenResumeManager, downloadResume }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? currentWord.substring(0, currentText.length - 1)
            : currentWord.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background blobs specific to Hero */}
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Bio & Title */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-secondary font-mono tracking-widest text-sm md:text-base font-semibold mb-2 uppercase">
              Welcome to my portfolio
            </h4>
            <h1 className="text-4xl md:text-6xl font-black text-textColor leading-tight font-poppins">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                Ritik Kumar
              </span>
            </h1>
          </motion.div>

          {/* Typing Sub-header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-10 md:h-12 flex items-center"
          >
            <h2 className="text-xl md:text-3xl font-bold font-poppins text-textSecondary">
              I am an{' '}
              <span className="text-highlight border-r-2 border-highlight pr-1 animate-pulse">
                {currentText}
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-textSecondary text-base md:text-lg max-w-xl font-inter leading-relaxed"
          >
            I build modern, interactive, and robust full-stack web applications with high-fidelity UI design, smooth animations, and optimized architectures. Currently focusing on the MERN Stack and AI-assisted workflows.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="projects"
              smooth={true}
              duration={600}
              offset={-70}
              className="cursor-pointer bg-gradient-to-r from-primary to-accent hover:from-secondary hover:to-primary text-textColor font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-glow hover:scale-[1.03]"
            >
              View Projects
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  downloadResume();
                }}
                className="btn-border-gradient font-bold py-3 px-8 rounded-xl text-textColor hover:text-white transition-all duration-300 hover:scale-[1.03]"
              >
                Download Resume
              </a>
              <button
                onClick={onOpenResumeManager}
                title="Manage Resume"
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-primary text-textSecondary hover:text-primary transition-all duration-300 hover:scale-[1.03] shadow-md flex items-center justify-center"
              >
                <FaCog size={18} />
              </button>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 pt-6"
          >
            <span className="text-sm font-semibold tracking-wider font-mono text-slate-500 uppercase">
              Follow Me:
            </span>
            <div className="flex gap-3">
              {[
                { icon: <FaGithub size={18} />, url: 'https://github.com', label: 'GitHub' },
                { icon: <FaLinkedinIn size={18} />, url: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <SiLeetcode size={18} />, url: 'https://leetcode.com', label: 'LeetCode' },
                { icon: <FaEnvelope size={18} />, url: 'mailto:ritikkumar.dev@gmail.com', label: 'Email' }
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center text-textSecondary hover:text-textColor hover:border-primary transition-all duration-300"
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Illustration & Floating Tech Icons */}
        <div className="lg:col-span-5 relative flex justify-center items-center select-none pt-8 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
          >
            {/* Center Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-[50px] animate-pulse-slow pointer-events-none" />
            
            {/* Developer Illustration */}
            <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_10px_35px_rgba(59,130,246,0.15)]">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="codeBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <polygon
                points="250,50 423,150 423,350 250,450 77,350 77,150"
                fill="url(#shieldGrad)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
              
              <circle cx="250" cy="250" r="130" fill="#0B1120" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="3" className="animate-pulse" />
              
              <rect x="170" y="190" width="160" height="120" rx="8" fill="url(#codeBoxGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              
              <rect x="185" y="210" width="70" height="6" rx="3" fill="#3B82F6" />
              <rect x="185" y="225" width="110" height="6" rx="3" fill="#06B6D4" />
              <rect x="185" y="240" width="40" height="6" rx="3" fill="#8B5CF6" />
              <rect x="185" y="255" width="90" height="6" rx="3" fill="#22D3EE" />
              <circle cx="190" cy="285" r="5" fill="#3B82F6" />
              <circle cx="205" cy="285" r="5" fill="#06B6D4" />
              <circle cx="220" cy="285" r="5" fill="#8B5CF6" />
              
              <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1.5" strokeDasharray="10 15" className="origin-center animate-[spin_40s_linear_infinite]" />
              <circle cx="250" cy="250" r="185" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="40 40" className="origin-center animate-[spin_60s_linear_infinite_reverse]" />
            </svg>

            {/* Floating Tech Badges */}
            {/* React Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] left-[8%] w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-[#61DAFB] shadow-glow"
            >
              <FaReact size={28} className="animate-[spin_12s_linear_infinite]" />
            </motion.div>

            {/* Node.js Badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[12%] right-[5%] w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-[#339933] shadow-glow"
            >
              <FaNodeJs size={28} />
            </motion.div>

            {/* JavaScript Badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[2%] w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-[#F7DF1E] shadow-glow"
            >
              <DiJavascript1 size={30} />
            </motion.div>

            {/* MongoDB Badge */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[16%] right-[3%] w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-[#47A248] shadow-glow"
            >
              <SiMongodb size={28} />
            </motion.div>

            {/* C++ Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-[48%] -right-[8%] w-12 h-12 rounded-xl glass-card flex items-center justify-center text-[#00599C] shadow-glow"
            >
              <SiCplusplus size={22} />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
