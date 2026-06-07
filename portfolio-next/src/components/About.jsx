'use client';

import { useEffect } from 'react';
import '@/styles/portfolio.css';

export default function About() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.about-card').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.about-card').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const stats = [
    { icon: '📁', number: '10+', label: 'Projects Built' },
    { icon: '📚', number: '1+', label: 'Years Exp' },
    { icon: '⚙️', number: '8+', label: 'Tech Stack' },
    { icon: '❤️', number: '100%', label: 'Dedicated' },
  ];

  const tags = [
    'Full Stack Developer',
    'MERN Stack',
    'Blockchain',
    'UI/UX Design',
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="title-line"></div>

        <div className="about-grid">
          {/* LEFT TEXT */}
          <div className="about-text glass">
            <h3 className="about-heading">
              Transforming Ideas Into Premium Digital Solutions
            </h3>

            <p>
              I'm a Software Engineering student at AUST with a passion for creating world-class web applications. My approach combines modern design principles with robust architecture to deliver exceptional user experiences.
            </p>

            <p>
              Proficient in JavaScript, React, Next.js, Node.js, Express, and MongoDB. Actively exploring blockchain development, AI integration, and advanced system design patterns.
            </p>

            <div className="about-tags">
              {tags.map((tag) => (
                <span key={tag} className="tag glass">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT STATS CARD */}
          <div className="about-cards">
            {stats.map((stat) => (
              <div key={stat.label} className="about-card glass">
                <div className="card-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
