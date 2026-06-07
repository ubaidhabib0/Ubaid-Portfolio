'use client';

import { useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import useTheme from '@/hooks/useTheme';

export default function Home() {
  useTheme();

  useEffect(() => {
    // Initialize progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
      z-index: 10000;
      transition: width 0.2s ease;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
      width: 0%;
    `;
    document.body.appendChild(progressBar);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      progressBar.remove();
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
