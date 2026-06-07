'use client';

import Image from 'next/image';
import '@/styles/portfolio.css';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-left">
          <div className="hero-badge glass">
            <span className="badge-dot"></span>
            Available for Freelance Work
          </div>

          <h1 className="hero-title">
            Crafting <span className="accent">Digital Excellence</span>
          </h1>

          <p className="hero-subtitle">
            Full Stack Developer • MERN Stack • Blockchain Explorer • UI Architect
          </p>

          <p className="hero-description">
            I design and build premium web experiences with cutting-edge technologies.
          </p>

          <div className="hero-buttons">
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn btn-primary glass-btn"
            >
              Start Project
            </button>

            <button
              onClick={() => scrollToSection('#skills')}
              className="btn btn-secondary glass-btn"
            >
              Explore Skills
            </button>

            <a
              href="/Ubaid_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary glass-btn"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">
          <div className="image-frame glass">
            <Image
              src="/ubaid.jpeg"
              alt="Ubaid"
              width={304}
              height={304}
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}