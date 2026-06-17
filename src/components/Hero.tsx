'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import ParticleCanvas from './ParticleCanvas';

const Hero = () => {
  const titles = [
    'Full-Stack Software Engineer',
    'Blockchain Specialist',
    'AI Security Enthusiast',
    'DSA Problem Solver'
  ];

  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.substring(0, displayText.length + 1));
          setTypingSpeed(75 + Math.random() * 50);
        } else {
          setTypingSpeed(2500); // Hold time
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentTitle.substring(0, displayText.length - 1));
          setTypingSpeed(30 + Math.random() * 30);
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(120);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, typingSpeed]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#03001e] py-20"
    >
      <ParticleCanvas />

      {/* Decorative Radial Gradient glow overlays */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8">
          
          {/* Text Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center md:text-left order-2 md:order-1"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              Available for Opportunities
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-none"
            >
              Hi, I'm <span className="text-gradient">Ubaid</span> Ullah
            </motion.h1>

            <div className="h-12 mb-6 flex items-center justify-center md:justify-start">
              <span className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium">
                {displayText}
                <span className="inline-block w-[3px] h-6 sm:h-8 ml-1 bg-purple-500 animate-pulse align-middle" />
              </span>
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-400 max-w-xl text-base sm:text-lg mb-8 leading-relaxed"
            >
              Crafting premium digital platforms by merging web development,
              secure decentralized ledger systems, and automated security auditing tools.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start items-center"
            >
              {[
                { icon: FaGithub, link: 'https://github.com/ubaidhabib0' },
                { icon: FaLinkedin, link: 'https://www.linkedin.com/in/ubaidhabib0/' },
                { icon: FaTwitter, link: 'https://twitter.com' },
                { icon: FaEnvelope, link: 'mailto:ubaidhabiib@gmail.com' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass p-3 rounded-full text-gray-300 hover:text-white border border-white/5 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 bg-white/5"
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:brightness-110 transition-all duration-300 cursor-pointer ml-2"
              >
                Let's Collaborate
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Picture / Avatar */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 order-1 md:order-2 z-10 relative"
          >
            {/* Hexagon/Circle floating container */}
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto rounded-full p-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:rotate-3 transition-transform duration-500">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#03001e] bg-[#03001e]">
                <img
                  src="/img.jpeg"
                  alt="Ubaid Ullah"
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Ambient background blur circles */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
