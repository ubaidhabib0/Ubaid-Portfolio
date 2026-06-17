'use client';

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion as m } from 'framer-motion';

const Skills = () => {
  const { skills, loading } = usePortfolio();

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-[#03001e] text-center text-white">
        <div className="animate-pulse text-lg">Loading skills inventory...</div>
      </section>
    );
  }

  // Group skills by category
  const categories = ['Frontend', 'Backend', 'Databases & DevOps', 'Core CS & Web3'];
  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-24 bg-[#03001e] relative overflow-hidden">
      {/* Decorative Blur circles */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <m.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A comprehensive inventory of languages, frameworks, databases, and core concepts I work with.
          </p>
        </m.div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {categories.map((cat, catIdx) => {
            const catSkills = groupedSkills[cat] || [];
            if (catSkills.length === 0) return null;

            return (
              <m.div
                key={cat}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white pl-4 border-l-4 border-purple-500">
                  {cat}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {catSkills.map((skill, index) => (
                    <m.div
                      key={skill._id}
                      whileHover={{ y: -5, borderColor: 'rgba(168,85,247,0.3)', boxShadow: `0 10px 20px -10px ${skill.color}55` }}
                      className="glass-panel p-5 rounded-2xl border border-white/5 bg-white/[0.01] transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Brand background hover glow */}
                      <div 
                        className="absolute inset-0 opacity-0 hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                        style={{ background: skill.color }}
                      />

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl" role="img" aria-label={skill.name}>
                          {skill.icon}
                        </span>
                        <div>
                          <h4 className="text-white font-semibold text-base">{skill.name}</h4>
                          <span className="text-xs text-gray-400">Proficiency: {skill.proficiency}%</span>
                        </div>
                      </div>

                      {/* Custom Progress Bar */}
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                        <m.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1.2, delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                          }}
                        />
                      </div>
                    </m.div>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
