'use client';

import { useState, useEffect } from 'react';
import '@/styles/portfolio.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

    document.querySelectorAll('.contact-card').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.contact-card').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => notification.remove(), 400);
    }, 4500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    showNotification("'✨ Message sent successfully! I'll get back to you soon.', 'success'");

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Let's Create Magic</h2>
        <div className="title-line"></div>

        <p className="contact-subtitle">
          Ready to bring your vision to life? Let's collaborate on something extraordinary.
        </p>

        <div className="contact-grid">
          {/* FORM CARD */}
          <div className="contact-card glass">
            <h3>Send a Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit glass-btn">
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>

          {/* INFO / SOCIAL CARD */}
          <div className="contact-card glass">
            <h3>Connect With Me</h3>

            <p>
              I'm available for premium projects, collaborations, and innovative ventures. Let's create something extraordinary together!
            </p>

            <div className="contact-info">
              <div className="info-item glass">
                <span className="info-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <p>Abbottabad, Pakistan</p>
                </div>
              </div>
              <div className="info-item glass">
                <span className="info-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>ubaidhabiib@gmail.com</p>
                </div>
              </div>
              <div className="info-item glass">
                <span className="info-icon">⚡</span>
                <div>
                  <strong>Response</strong>
                  <p>8am - 2am PKT</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/ubaidhabib0"
                className="social-link glass-btn"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://instagram.com/ubaidhabiib0"
                className="social-link glass-btn"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://x.com/ubaidhabiib0"
                className="social-link glass-btn"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-x-twitter"></i>
              </a>
              <a
                href="https://facebook.com/ubaidhabiib0"
                className="social-link glass-btn"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://fiverr.com/ubaidhabib9"
                className="social-link glass-btn"
                title="Fiverr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-fiverr"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
