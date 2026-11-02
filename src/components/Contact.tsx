import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Github,
  Linkedin,
  Phone,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  onOpenInquiries?: () => void;
}

export default function Contact({ onOpenInquiries }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/muhirechristian',
      icon: <Github className="w-5 h-5" />,
      display: 'github.com/muhirechristian',
    },
    {
      name: 'Email',
      href: 'mailto:christianbagina@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      display: 'christianbagina@gmail.com',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/muhire-christian',
      icon: <Linkedin className="w-5 h-5" />,
      display: 'linkedin.com/in/muhire-christian',
    },
    {
      name: 'Location',
      href: 'https://maps.google.com/?q=Kigali,Rwanda',
      icon: <MapPin className="w-5 h-5" />,
      display: 'Kigali, Rwanda',
    },
    {
      name: 'Call & WhatsApp',
      href: 'https://wa.me/250790865408',
      icon: <Phone className="w-5 h-5" />,
      display: '+250 790 865 408',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Store in portfolio_messages (same mechanism as reference site)
      const existing = localStorage.getItem('portfolio_messages') || '[]';
      let messages = [];
      try {
        messages = JSON.parse(existing);
      } catch {
        messages = [];
      }

      const newMessage = {
        ...formData,
        _id: String(Date.now()),
        createdAt: new Date().toISOString(),
      };

      messages.unshift(newMessage);
      const capped = messages.slice(0, 20);
      localStorage.setItem('portfolio_messages', JSON.stringify(capped));
      localStorage.setItem('sent_messages_cache', JSON.stringify(newMessage));

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });

      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3500);
      }, 800);
    } catch (err) {
      console.error('Error saving message:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: custom,
      },
    }),
  };

  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] text-white py-32 lg:py-48 overflow-hidden"
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
            <motion.div className="lg:col-span-3" custom={0} variants={fadeVariants}>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
                04 / Contact
              </span>
            </motion.div>
            <motion.div className="lg:col-span-9" custom={0.1} variants={fadeVariants}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight-custom mb-6">
                Let&apos;s work together.
              </h2>
              <p className="text-neutral-400 font-normal text-lg max-w-xl">
                Have a project in mind? I&apos;d love to hear about it. Get in touch and let&apos;s create something amazing.
              </p>
            </motion.div>
          </div>

          {/* Form and Connect Links */}
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Form Column */}
            <motion.div className="lg:col-span-7" custom={0.2} variants={fadeVariants}>
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Name Input */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="text-neutral-500 w-4 h-4" />
                      <label className="text-xs tracking-[0.15em] uppercase text-neutral-500 block">
                        Name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b hairline-dark pb-4 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors font-normal"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="text-neutral-500 w-4 h-4" />
                      <label className="text-xs tracking-[0.15em] uppercase text-neutral-500 block">
                        Email
                      </label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b hairline-dark pb-4 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors font-normal"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="text-neutral-500 w-4 h-4" />
                    <label className="text-xs tracking-[0.15em] uppercase text-neutral-500 block">
                      Message
                    </label>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={1}
                    className="w-full bg-transparent border-b hairline-dark pb-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors resize-none font-normal leading-relaxed"
                    placeholder="Tell me about your project..."
                    onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                      const target = e.currentTarget;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />
                </div>

                {/* Submit Action */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-4 group mt-8 cursor-pointer focus:outline-none"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-sm tracking-wide uppercase font-medium">
                    {status === 'sending'
                      ? 'Sending...'
                      : status === 'success'
                      ? 'Sent!'
                      : status === 'error'
                      ? 'Error'
                      : 'Send Message'}
                  </span>
                  <span
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      status === 'success'
                        ? 'border-white bg-white text-black'
                        : status === 'error'
                        ? 'border-red-500'
                        : 'border-neutral-700 group-hover:bg-white group-hover:border-white text-white group-hover:text-black'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </form>
            </motion.div>

            {/* Connect Column */}
            <motion.div className="lg:col-span-5" custom={0.3} variants={fadeVariants}>
              <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-8">
                Connect
              </p>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-5 px-6 border border-neutral-800 rounded-2xl group hover:bg-neutral-900 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-500 group-hover:text-white transition-colors">
                        {link.icon}
                      </span>
                      <span className="font-normal text-neutral-300 group-hover:text-white transition-colors text-sm sm:text-base">
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Bar */}
          <motion.div
            className="mt-32 pt-12 border-t hairline-dark flex flex-col md:flex-row justify-between items-center gap-6"
            custom={0.4}
            variants={fadeVariants}
          >
            <p className="text-neutral-600 text-sm font-normal">
              © 2026 Muhire Christian. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {onOpenInquiries && (
                <button
                  onClick={onOpenInquiries}
                  className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-widest font-mono cursor-pointer"
                >
                  Inquiries
                </button>
              )}
              <a
                href="#contact"
                className="px-8 py-3 bg-white text-black rounded-full text-sm font-bold hover:scale-105 transition-all duration-300"
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
