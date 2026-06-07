'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import '@/styles/portfolio.css';

export default function Gallery() {
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

    document.querySelectorAll('.gallery-item').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.gallery-item').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      title: 'Workspace',
      subtitle: 'Development',
    },
    {
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      title: 'Coding',
      subtitle: 'Solutions',
    },
    {
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      title: 'Innovation',
      subtitle: 'Technology',
    },
    {
      src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      title: 'Design',
      subtitle: 'Excellence',
    },
    {
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      title: 'Collaboration',
      subtitle: 'Teamwork',
    },
    {
      src: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
      title: 'Blockchain',
      subtitle: 'Future Tech',
    },
  ];

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">Creative Showcase</h2>
        <div className="title-line"></div>

        <p className="gallery-subtitle">
          Visual journey through my development process and projects
        </p>
      </div>

      {/* AUTO SCROLL TRACK */}
      <div className="gallery-wrapper">
        <div className="gallery-track">
          {galleryItems.concat(galleryItems).map((item, idx) => (
            <div key={idx} className="gallery-item glass">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
              <div className="overlay">
                <div className="overlay-content">
                  <p>{item.title}</p>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
