'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Projects = () => {
  const { projects, loading } = usePortfolio();
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'fullstack', label: 'Full-Stack' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'security-ai', label: 'Security & AI' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-[#03001e] text-center text-white">
        <div className="animate-pulse text-lg">Loading projects showcase...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-[#03001e] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A showcase of core engineering designs, highlighting decentralized ledgers, auditing tools, and dynamic dashboards.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === cat.value
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-105'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel rounded-3xl border border-white/5 bg-white/[0.01] overflow-hidden flex flex-col hover:border-purple-500/30 hover:shadow-[0_15px_30px_-15px_rgba(168,85,247,0.25)] transition-all duration-500 group"
              >
                {/* Project Image Panel */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Indicator Badge */}
                  <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/80 text-purple-300 backdrop-blur-md uppercase tracking-wider">
                    {project.category.replace('-', ' & ')}
                  </span>
                </div>

                {/* Project Info Panel */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md border border-white/5 bg-white/5 text-gray-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md border border-white/5 bg-white/5 text-purple-300 font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Call-to-action buttons */}
                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                        title="View GitHub Repository"
                      >
                        <FaGithub className="text-lg" /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 ml-auto"
                        title="Launch Application"
                      >
                        <FaExternalLinkAlt className="text-base" /> Launch App
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
