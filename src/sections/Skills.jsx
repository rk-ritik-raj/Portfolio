import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaTerminal } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiCplusplus, SiPostman } from 'react-icons/si';
import { DiVisualstudio } from 'react-icons/di';

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" /> },
      { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
      { name: "React", icon: <FaReact className="text-[#61DAFB] animate-[spin_18s_linear_infinite]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
      { name: "Express.js", icon: <SiExpress className="text-[#B9BBBE]" /> },
      { name: "REST API", icon: <FaTerminal className="text-accent" /> }
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> }
    ]
  },
  {
    title: "Programming",
    skills: [
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> }
    ]
  },
  {
    title: "Tools & Environment",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
      { name: "GitHub", icon: <FaGithub className="text-textColor" /> },
      { name: "VS Code", icon: <DiVisualstudio className="text-[#007ACC]" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> }
    ]
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Glow Backer */}
      <div className="absolute top-[20%] left-0 w-[250px] h-[250px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-secondary font-mono tracking-widest text-sm uppercase mb-2 animate-pulse">
            Capabilities
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textColor font-poppins">
            Skills & Toolkit
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="glass-card p-6 rounded-[22px] flex flex-col gap-6 relative group overflow-hidden"
            >
              {/* Subtle top corner gradient hover overlay */}
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
              
              <h3 className="text-lg font-bold font-poppins text-textColor border-b border-slate-800/80 pb-3 flex items-center justify-between">
                <span>{category.title}</span>
                <span className="text-xs font-mono font-normal text-slate-500 uppercase tracking-widest">{category.skills.length} items</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-highlight/20 hover:bg-slate-900/60 transition-all duration-300 group/item cursor-default"
                  >
                    <div className="text-3xl mb-2 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] group-hover/item:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <span className="text-[11px] font-mono text-center text-textSecondary group-hover/item:text-textColor transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
