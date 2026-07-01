import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaCog } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', target: 'home' },
  { name: 'About', target: 'about' },
  { name: 'Skills', target: 'skills' },
  { name: 'Projects', target: 'projects' },
  { name: 'Experience', target: 'experience' },
  { name: 'Contact', target: 'contact' },
];

export default function Navbar({ onOpenResumeManager, downloadResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'h-16 glass-nav shadow-lg bg-slate-950/70' 
          : 'h-20 bg-transparent'
      } flex items-center`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <Link 
          to="home" 
          smooth={true} 
          duration={500} 
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center font-bold text-lg text-textColor shadow-glow-primary group-hover:scale-105 transition-transform duration-300">
            RK
          </div>
          <span className="font-poppins font-semibold text-lg text-textColor tracking-wider group-hover:text-highlight transition-colors duration-300">
            Ritik Kumar
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.target}>
                <Link
                  to={link.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  activeClass="text-highlight font-medium after:scale-x-100"
                  className="cursor-pointer font-inter text-sm text-textSecondary hover:text-textColor relative py-2 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-secondary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Resume Button Group */}
          <div className="flex items-center gap-2">
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                downloadResume();
              }}
              className="btn-border-gradient px-5 py-2 rounded-xl text-sm font-semibold tracking-wide text-textColor hover:text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Resume
            </a>
            <button
              onClick={onOpenResumeManager}
              title="Manage Resume"
              className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-primary text-textSecondary hover:text-primary transition-all duration-300 flex items-center justify-center shadow-md"
            >
              <FaCog size={14} />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-textColor focus:outline-none p-2 rounded-lg bg-slate-900/40 border border-slate-700/30 hover:border-slate-600/50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="absolute top-full left-4 right-4 p-6 glass-card rounded-2xl flex flex-col gap-5 lg:hidden z-50 animate-[fadeIn_0.2s_ease-out]"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <Link
                    to={link.target}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    activeClass="text-highlight font-semibold"
                    className="block cursor-pointer font-inter text-base text-textSecondary hover:text-textColor py-1 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="border-slate-800" />
            <div className="flex gap-2 w-full">
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  downloadResume();
                }}
                className="flex-grow text-center bg-gradient-to-r from-primary to-accent hover:from-secondary hover:to-primary text-textColor font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-glow"
              >
                Resume
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenResumeManager();
                }}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-textSecondary hover:text-primary flex items-center justify-center transition-all duration-300"
              >
                <FaCog size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
