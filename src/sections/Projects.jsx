import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: "VINGO Food Delivery",
    desc: "A premium online food ordering and delivery web application. Built with vendor administration dashboards, clean product search interfaces, persistent carts, and mock payment gateway APIs.",
    image: "/vingo.png",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Redux"],
    category: "Fullstack",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 2,
    title: "AI Virtual Assistant",
    desc: "A smart voice-and-text virtual dashboard powered by OpenAI. Real-time language recognition models are integrated to draft documents, calculate statistics, and summarize user logs.",
    image: "/ai_assistant.png",
    tech: ["React.js", "OpenAI API", "Node.js", "Tailwind CSS"],
    category: "AI",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 3,
    title: "Study Circle",
    desc: "An educational workspace designed for students. Offers persistent real-time chat, study group notes folders, task management boards, and virtual whiteboard canvas modules.",
    image: "/study_circle.png",
    tech: ["React.js", "Express.js", "MongoDB", "Socket.io"],
    category: "Fullstack",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 4,
    title: "Portfolio Website",
    desc: "Ritik's modern web portfolio. Styled using premium dark colors, mouse-following glass glow highlights, responsive layouts, modular structures, and smooth scroll controls.",
    image: "/portfolio.png",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    github: "https://github.com",
    live: "https://example.com"
  }
];

const categories = ["All", "Fullstack", "AI", "Frontend"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-secondary font-mono tracking-widest text-sm uppercase mb-2 animate-pulse">
            Showcase
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textColor font-poppins">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-3 md:gap-5 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 font-inter border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-primary to-accent text-textColor border-transparent shadow-glow"
                  : "bg-slate-900/60 border-slate-800 text-textSecondary hover:text-textColor hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List with layout animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-[24px] overflow-hidden group flex flex-col justify-between"
              >
                {/* Image Section with Overlay */}
                <div className="relative h-56 w-full overflow-hidden border-b border-slate-800/80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-textColor hover:text-highlight hover:border-highlight transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-textColor hover:text-highlight hover:border-highlight transition-all duration-300"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  </div>
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 text-[10px] font-bold font-mono tracking-widest bg-slate-950/80 border border-slate-800/80 text-highlight py-1 px-3 rounded-full">
                    {project.category.toUpperCase()}
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold font-poppins text-textColor group-hover:text-highlight transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-textSecondary text-sm leading-relaxed font-inter">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech stack & Links */}
                  <div className="space-y-6 pt-4 border-t border-slate-800/60">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-950/40 border border-slate-800/80 text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 lg:hidden">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-textColor transition-colors"
                      >
                        <FaGithub size={16} /> GitHub
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-textColor transition-colors"
                      >
                        <FaExternalLinkAlt size={14} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
