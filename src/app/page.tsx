import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import CodeTerminal from '@/components/CodeTerminal';
import Contact from '@/components/Contact';
import { PortfolioProvider } from '@/context/PortfolioContext';

export default function Home() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#03001e] text-white selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CodeTerminal />
          <Contact />
        </main>
        
        {/* Simple professional footer */}
        <footer className="py-8 bg-black/45 border-t border-white/5 text-center text-sm text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Ubaid Ullah. Built with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </PortfolioProvider>
  );
}
