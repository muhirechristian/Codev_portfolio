import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenInquiries?: () => void;
}

export default function Navbar({ onOpenInquiries }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetSelector: string
  ) => {
    e.preventDefault();

    const id = targetSelector.replace('#', '');
    const wasOpen = isOpen;
    setIsOpen(false);

    const delay = wasOpen ? 250 : 0;
    setTimeout(() => {
      if (!id || targetSelector === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', '/');
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', targetSelector);
      }
    }, delay);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeInOut' as const },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: idx * 0.08,
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-6 transition-all duration-500 ${
          isScrolled ? 'bg-[#fafafa]/80 backdrop-blur-md' : ''
        }`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-neutral-200 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-300">
              <span className="text-neutral-700 font-normal text-lg tracking-tight">M</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-normal text-neutral-500 hover:text-black transition-colors duration-300 cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2.5 border border-black rounded-full text-sm font-normal bg-black text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-[1px] bg-neutral-800"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-[1px] bg-neutral-800"
              animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 20 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-[1px] bg-neutral-800"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#fafafa] flex flex-col items-center justify-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-4xl font-normal text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
                  custom={idx}
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mt-8 px-8 py-3 border border-black rounded-full text-lg font-normal bg-black text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                custom={navLinks.length}
                initial="closed"
                animate="open"
                variants={itemVariants}
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Book a Call
              </motion.a>

              {onOpenInquiries && (
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenInquiries();
                  }}
                  className="mt-4 text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  custom={navLinks.length + 1}
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                >
                  View Inquiries Dashboard
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
