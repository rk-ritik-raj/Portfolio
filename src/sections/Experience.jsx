import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const educationData = [
  {
    id: 1,
    role: "B.Tech Computer Science & Engineering",
    company: "Lovely Professional University",
    duration: "2023 - Present",
    desc: "Developing structural algorithm analysis and clean database modeling skills. Engaging in coding exercises and building full-stack web applications."
  },
  {
    id: 2,
    role: "Senior Secondary Schooling",
    company: "CBSE Affiliate Institute",
    duration: "2021 - 2023",
    desc: "Completed advanced science coursework focusing on Physics, Chemistry, and Mathematics with core programming introductory classes."
  }
];

const experienceData = [
  {
    id: 1,
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    duration: "2024 - Present",
    desc: "Delivering customized web modules to private clients. Designing scalable Express databases, MERN panels, and styling pages using Tailwind CSS and Framer Motion."
  },
  {
    id: 2,
    role: "Open Source Contributor",
    company: "GitHub Community",
    duration: "2023 - Present",
    desc: "Publishing bug fixes in React repositories, designing lightweight components, and collaborating with external devs on micro-interaction features."
  }
];

export default function Experience() {
  const columnVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-0 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-[250px] h-[250px] bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-secondary font-mono tracking-widest text-sm uppercase mb-2 animate-pulse">
            Journey
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textColor font-poppins">
            Education & Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shadow-glow-primary">
                <FaGraduationCap size={20} />
              </div>
              <h3 className="text-2xl font-bold font-poppins text-textColor">Education</h3>
            </div>

            <motion.div 
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-6 md:pl-8 border-l border-slate-800/80 space-y-8"
            >
              {educationData.map((edu) => (
                <motion.div 
                  key={edu.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-primary group-hover:bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  
                  {/* Detail Panel */}
                  <div className="glass-card p-6 rounded-2xl space-y-2 relative overflow-hidden group">
                    <span className="text-xs font-mono text-highlight font-semibold tracking-wide block">
                      {edu.duration}
                    </span>
                    <h4 className="text-lg font-bold font-poppins text-textColor group-hover:text-primary transition-colors duration-300">
                      {edu.role}
                    </h4>
                    <span className="text-sm font-semibold font-inter text-textSecondary block">
                      {edu.company}
                    </span>
                    <p className="text-textSecondary text-sm font-inter leading-relaxed pt-2">
                      {edu.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Experience */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-accent shadow-glow-accent">
                <FaBriefcase size={18} />
              </div>
              <h3 className="text-2xl font-bold font-poppins text-textColor">Experience</h3>
            </div>

            <motion.div 
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-6 md:pl-8 border-l border-slate-800/80 space-y-8"
            >
              {experienceData.map((exp) => (
                <motion.div 
                  key={exp.id}
                  variants={itemVariantsRight}
                  className="relative group"
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-accent group-hover:bg-accent transition-all duration-300 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  
                  {/* Detail Panel */}
                  <div className="glass-card p-6 rounded-2xl space-y-2 relative overflow-hidden group">
                    <span className="text-xs font-mono text-highlight font-semibold tracking-wide block">
                      {exp.duration}
                    </span>
                    <h4 className="text-lg font-bold font-poppins text-textColor group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h4>
                    <span className="text-sm font-semibold font-inter text-textSecondary block">
                      {exp.company}
                    </span>
                    <p className="text-textSecondary text-sm font-inter leading-relaxed pt-2">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
