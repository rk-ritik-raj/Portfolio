import { Link } from 'react-scroll';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080D1A] border-t border-slate-800/80 pt-16 pb-8 z-10">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[150px] bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link 
              to="home" 
              smooth={true} 
              duration={500} 
              className="cursor-pointer inline-flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center font-bold text-base text-textColor shadow-glow-primary">
                RK
              </div>
              <span className="font-poppins font-semibold text-base text-textColor tracking-wider">
                Ritik Kumar
              </span>
            </Link>
            <p className="text-textSecondary text-sm max-w-sm font-inter">
              A passionate Software Developer crafting premium, high-performance web applications and solving complex algorithmic challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-textColor uppercase tracking-wider font-poppins">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-inter">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-textSecondary hover:text-highlight transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-textColor uppercase tracking-wider font-poppins">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-textSecondary hover:text-textColor hover:border-primary transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-textSecondary hover:text-textColor hover:border-primary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-textSecondary hover:text-textColor hover:border-primary transition-all duration-300"
                aria-label="LeetCode"
              >
                <SiLeetcode size={18} />
              </a>
              <a
                href="mailto:ritik.kumar@example.com"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-textSecondary hover:text-textColor hover:border-primary transition-all duration-300"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
            <p className="text-xs text-textSecondary pt-2">
              Email: <span className="text-textColor">ritikkumar.dev@gmail.com</span>
            </p>
          </div>
        </div>

        <hr className="border-slate-800/60" />

        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <p className="text-xs text-slate-500 font-inter">
            © {currentYear} Ritik Kumar. All rights reserved.
          </p>
          
          {/* Scroll to top */}
          <Link
            to="home"
            smooth={true}
            duration={600}
            className="group cursor-pointer w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-highlight flex items-center justify-center text-textSecondary hover:text-highlight transition-all duration-300 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="group-hover:animate-bounce" size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
