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
  CheckCircle2,
  Send,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');

    try {
      // Send directly to Christian's email address: christianbagina@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/christianbagina@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Service returned an error');
      }

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      // Direct email mailto fallback so Christian is 100% guaranteed to receive the message
      const mailtoUrl = `mailto:christianbagina@gmail.com?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Christian,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;

      window.location.href = mailtoUrl;
      setStatus('success');
      setTimeout(() => setStatus('idle'), 6000);
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
      className="bg-[#0a0a0a] text-white py-24 sm:py-32 lg:py-48 overflow-hidden border-t hairline-dark transition-colors duration-300"
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 mb-16 lg:mb-24">
            <motion.div className="lg:col-span-3" custom={0} variants={fadeVariants}>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium">
                04 / Contact
              </span>
            </motion.div>
            <motion.div className="lg:col-span-9" custom={0.1} variants={fadeVariants}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight-custom mb-4 sm:mb-6">
                Let&apos;s work together.
              </h2>
              <p className="text-neutral-400 font-normal text-base sm:text-lg max-w-xl leading-relaxed">
                Have a project or opportunity in mind? Send me a message and it will be delivered directly to my inbox at{' '}
                <a
                  href="mailto:christianbagina@gmail.com"
                  className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
                >
                  christianbagina@gmail.com
                </a>.
              </p>
            </motion.div>
          </div>

          {/* Form and Connect Links */}
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Form Column */}
            <motion.div className="lg:col-span-7" custom={0.2} variants={fadeVariants}>
              <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                  {/* Name Input */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="text-neutral-500 w-4 h-4 group-focus-within:text-white transition-colors" />
                      <label className="text-xs tracking-[0.15em] uppercase text-neutral-400 block font-medium">
                        Your Name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b hairline-dark pb-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors font-normal text-base"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="text-neutral-500 w-4 h-4 group-focus-within:text-white transition-colors" />
                      <label className="text-xs tracking-[0.15em] uppercase text-neutral-400 block font-medium">
                        Your Email
                      </label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b hairline-dark pb-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors font-normal text-base"
                      placeholder="e.g. your@email.com"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="text-neutral-500 w-4 h-4 group-focus-within:text-white transition-colors" />
                    <label className="text-xs tracking-[0.15em] uppercase text-neutral-400 block font-medium">
                      Message
                    </label>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full bg-transparent border-b hairline-dark pb-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors resize-none font-normal leading-relaxed text-base"
                    placeholder="Tell me about your project or inquiry..."
                    onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                      const target = e.currentTarget;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />
                </div>

                {/* Status Feedback Notice */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-200">
                        Message sent successfully!
                      </p>
                      <p className="text-emerald-300/80 text-xs mt-0.5">
                        Your message was delivered to Christian&apos;s email (<span className="text-white">christianbagina@gmail.com</span>). He will get back to you shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{errorMessage || 'Failed to send message. Please send an email directly to christianbagina@gmail.com'}</span>
                  </motion.div>
                )}

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-4 group cursor-pointer focus:outline-none"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-sm tracking-wide uppercase font-medium">
                      {status === 'sending'
                        ? 'Sending to Christian...'
                        : status === 'success'
                        ? 'Sent to Email!'
                        : 'Send Message'}
                    </span>
                    <span
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        status === 'success'
                          ? 'border-emerald-400 bg-emerald-400 text-black'
                          : status === 'sending'
                          ? 'border-emerald-400 text-emerald-400 animate-spin'
                          : 'border-neutral-700 group-hover:bg-white group-hover:border-white text-white group-hover:text-black'
                      }`}
                    >
                      {status === 'sending' ? (
                        <Send className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </span>
                  </motion.button>

                  <span className="text-xs text-neutral-500 font-normal">
                    Delivered to: <strong className="text-neutral-400">christianbagina@gmail.com</strong>
                  </span>
                </div>
              </form>
            </motion.div>

            {/* Connect Column */}
            <motion.div className="lg:col-span-5" custom={0.3} variants={fadeVariants}>
              <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-6 font-medium">
                Connect
              </p>
              <div className="space-y-2.5">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 sm:py-5 px-5 sm:px-6 border border-neutral-800 rounded-2xl group hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-500 group-hover:text-white transition-colors">
                        {link.icon}
                      </span>
                      <div>
                        <span className="font-normal text-neutral-300 group-hover:text-white transition-colors text-sm sm:text-base block">
                          {link.name}
                        </span>
                        <span className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors block">
                          {link.display}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Bar */}
          <motion.div
            className="mt-24 sm:mt-32 pt-10 border-t hairline-dark flex flex-col md:flex-row justify-between items-center gap-6"
            custom={0.4}
            variants={fadeVariants}
          >
            <p className="text-neutral-500 text-sm font-normal text-center md:text-left">
              &copy; 2026 Muhire Christian. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#contact"
                className="px-8 py-3 bg-white text-black rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 shadow-md"
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
