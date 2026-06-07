'use client';

import { useEffect } from 'react';
import '../styles/portfolio.css';

export default function Skills() {
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

    document.querySelectorAll('.skill-card').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.skill-card').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const skills = [
    {
      title: '🎨 Frontend',
      progress: 95,
      tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind'],
    },
    {
      title: '⚙️ Backend',
      progress: 90,
      tags: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'GraphQL'],
    },
    {
      title: '🗄️ Databases',
      progress: 88,
      tags: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
    },
    {
      title: '💻 Languages',
      progress: 92,
      tags: ['JavaScript', 'Python', 'TypeScript', 'Java', 'C++'],
    },
    {
      title: '📱 Mobile',
      progress: 80,
      tags: ['Flutter', 'React Native', 'Dart'],
    },
    {
      title: '🛠️ DevOps & Tools',
      progress: 85,
      tags: ['Git', 'Docker', 'AWS', 'CI/CD'],
    },
    {
      title: '⛓️ Blockchain',
      progress: 75,
      tags: ['Web3.js', 'Smart Contracts', 'Solidity', 'DApps'],
      premium: true,
    },
    {
      title: '🚀 AI & ML',
      progress: 70,
      tags: ['TensorFlow', 'PyTorch', 'Python ML', 'Learning'],
      premium: true,
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Technical Arsenal</h2>
        <div className="title-line"></div>

        <p className="skills-subtitle">
          Premium technologies crafted into scalable solutions
        </p>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className={`skill-card glass ${skill.premium ? 'premium' : ''}`}
            >
              <div className="skill-header">
                <h3>{skill.title}</h3>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="skill-tags">
                {skill.tags.map((tag) => (
                  <span key={tag} className="glass">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
