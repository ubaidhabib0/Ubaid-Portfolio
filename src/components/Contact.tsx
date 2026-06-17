'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Contact = () => {
  const { sendMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ubaidhabiib@gmail.com',
      href: 'mailto:ubaidhabiib@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'WhatsApp / Phone',
      value: '+92 312 0911667',
      href: 'https://wa.me/923120911667',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Khyber Pakhtunkhwa, Pakistan',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#03001e] relative overflow-hidden">
      {/* Decorative radial lighting */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Have a project in mind, want to discuss software engineering, or just say hello? Drop a line!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Contact Details Column */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.3)' }}
                className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4 transition-all duration-300 block hover:shadow-[0_10px_20px_rgba(168,85,247,0.1)]"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <info.icon className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">{info.label}</h4>
                  <p className="text-white font-medium text-sm sm:text-base mt-1">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel p-8 text-center rounded-3xl border border-purple-500/20 bg-purple-500/5 shadow-2xl"
              >
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30 text-purple-400">
                  <FaPaperPlane className="text-2xl animate-bounce" />
                </div>
                <h3 className="text-2xl text-white font-bold mb-3">Thank You!</h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto mb-6">
                  Your message has been received successfully. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-white text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-5 shadow-2xl">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all duration-300 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Collaboration Opportunity"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all duration-300 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your project details or inquiry..."
                    required
                    rows={5}
                    className="w-full p-4 bg-white/5 border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all duration-300 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold hover:brightness-110 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    'Sending Message...'
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
