'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaShieldAlt, FaBriefcase } from 'react-icons/fa';

const About = () => {
  const coreStrengths = [
    {
      icon: FaCode,
      title: 'Full-Stack Development',
      description: 'Expertise in modern web architectures including Vite React, Next.js App Router, Node.js, Express, MongoDB, and PostgreSQL.',
    },
    {
      icon: FaShieldAlt,
      title: 'AI Dependency Auditor',
      description: 'Pioneering security auditor platforms (DevGuard AI) that scan manifest files to secure software dependencies.',
    },
    {
      icon: FaGraduationCap,
      title: 'Computer Science Core',
      description: 'Strong foundations in Data Structures and Algorithms (C++), object-oriented programming, and relational database normalization.',
    },
  ];

  const stats = [
    { value: '6th', label: 'Academic Sem.' },
    { value: '3+', label: 'Core Projects' },
    { value: '15+', label: 'Technologies' },
    { value: '4.0', label: 'CS Focus' },
  ];

  return (
    <section id="about" className="py-24 bg-[#03001e] relative overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A software engineering student dedicated to building robust web platforms, security layers, and decentralized services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Biography Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Software Engineering Student at <span className="text-purple-400">AUST</span>
            </h3>
            
            <p className="text-gray-300 leading-relaxed">
              I am currently pursuing a Bachelor's degree in Software Engineering (6th Semester) at the <strong>Abbottabad University of Science and Technology (AUST)</strong>, with expected graduation in <strong>Spring 2027</strong>.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              My technical focus centers on full-stack development and security tools. I have developed a full-stack Next.js project with MongoDB for university management (<a href="#projects" className="text-purple-400 hover:underline">Uni Dropdown App</a>), a peer-to-peer blockchain ledger network (<a href="#projects" className="text-purple-400 hover:underline">P2P Blockchain Network</a>), and an AI-driven repository security auditing system (<a href="#projects" className="text-purple-400 hover:underline">DevGuard AI</a>).
            </p>

            {/* Stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
              {stats.map((stat, i) => (
                <div key={i} className="glass-panel p-4 rounded-xl text-center border border-white/5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white text-gradient">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1 font-medium tracking-wide uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full text-white font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaBriefcase className="text-sm" /> Hire Me
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 inline-flex items-center gap-2"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          {/* Competency cards */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {coreStrengths.map((strength, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, borderColor: 'rgba(168,85,247,0.3)' }}
                className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 flex items-start gap-4 shadow-xl"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <strength.icon className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{strength.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{strength.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
