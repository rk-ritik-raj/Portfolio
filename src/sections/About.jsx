import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaBrain } from 'react-icons/fa';

export default function About() {
  const cards = [
    {
      title: "Education",
      subtitle: "B.Tech CSE Student",
      icon: <FaGraduationCap size={24} className="text-primary" />,
      desc: "Currently pursuing B.Tech in Computer Science & Engineering at Lovely Professional University. Focused on system architecture, database design, and programming logic.",
      bullets: ["LPU Student", "Quick Learner", "Academic Excellence"]
    },
    {
      title: "Tech Stack",
      subtitle: "Passionate Full Stack Developer",
      icon: <FaCode size={24} className="text-secondary" />,
      desc: "Specialized in building full-stack applications with high focus on performance and clean code. Love creating smooth, reactive user interfaces using modern systems.",
      bullets: ["React & Node.js", "Express & MongoDB", "REST API Development"]
    },
    {
      title: "Problem Solving",
      subtitle: "Strong in DSA",
      icon: <FaBrain size={24} className="text-accent" />,
      desc: "Possesses analytical problem-solving skills with a solid foundation in Data Structures and Algorithms. Enthusiastic about optimizations and competitive coding.",
      bullets: ["C++ Core", "LeetCode Challenger", "Problem Solving"]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] right-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-secondary font-mono tracking-widest text-sm uppercase mb-2 animate-pulse"
          >
            My Story
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-textColor font-poppins"
          >
            About Me
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.subtitle}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 rounded-[24px] relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Card Hover Glow Backer */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-highlight/50 transition-colors duration-300">
                  {card.icon}
                </div>
                
                {/* Title */}
                <div className="space-y-1">
                  <span className="text-xs font-semibold tracking-wider font-mono text-slate-500 uppercase">{card.title}</span>
                  <h3 className="text-xl font-bold font-poppins text-textColor group-hover:text-highlight transition-colors duration-300">
                    {card.subtitle}
                  </h3>
                </div>
                
                <p className="text-textSecondary text-sm md:text-base font-inter leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Bullet Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-wrap gap-2">
                {card.bullets.map(b => (
                  <span key={b} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950/40 border border-slate-800/80 text-highlight">
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
