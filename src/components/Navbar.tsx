import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#fafafa]/85 dark:bg-[#0c0d0e]/85 backdrop-blur-md border-b hairline shadow-2xs'
            : 'bg-transparent'
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
            <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700">
              <span className="text-neutral-700 dark:text-neutral-200 font-normal text-lg tracking-tight">M</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </a>
            ))}

            {/* Recruiter Resume Download */}
            <a
              href="/Muhire_Bagina_Christian_CV.pdf"
              download="Muhire_Bagina_Christian_CV.pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white transition-colors duration-200 cursor-pointer"
              title="Download Official CV (PDF)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Desktop Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center border hairline bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-all duration-300 cursor-pointer shadow-2xs"
              title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-label={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-neutral-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2.5 border border-black dark:border-white rounded-full text-sm font-normal bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-neutral-950 hover:text-black dark:hover:text-white transition-all duration-300 cursor-pointer"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Quick Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border hairline bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-200 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-800" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-neutral-800 dark:bg-neutral-200"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-neutral-800 dark:bg-neutral-200"
                animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 20 : 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-neutral-800 dark:bg-neutral-200"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#fafafa] dark:bg-[#0c0d0e] flex flex-col items-center justify-center px-6 transition-colors duration-300"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col items-center gap-7 w-full max-w-xs">
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors cursor-pointer tracking-tight"
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
                href="/Muhire_Bagina_Christian_CV.pdf"
                download="Muhire_Bagina_Christian_CV.pdf"
                className="inline-flex items-center gap-2 text-xl font-normal text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer tracking-tight"
                custom={navLinks.length}
                initial="closed"
                animate="open"
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </motion.a>

              <motion.a
                href="#contact"
                className="mt-2 w-full py-3 border border-black dark:border-white rounded-full text-base font-normal bg-black dark:bg-white text-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all duration-300 text-center cursor-pointer"
                custom={navLinks.length + 1}
                initial="closed"
                animate="open"
                variants={itemVariants}
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Book a Call
              </motion.a>

              {/* Mobile Dedicated Theme Toggle Switch */}
              <motion.div
                className="mt-6 flex items-center justify-between w-full p-2 rounded-2xl border hairline bg-neutral-100 dark:bg-neutral-900"
                custom={navLinks.length + 2}
                initial="closed"
                animate="open"
                variants={itemVariants}
              >
                <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 px-3 font-medium">
                  Theme
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      theme === 'light'
                        ? 'bg-white text-black shadow-xs font-semibold'
                        : 'text-neutral-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      theme === 'dark'
                        ? 'bg-neutral-800 text-white shadow-xs font-semibold'
                        : 'text-neutral-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-blue-400" />
                    <span>Dark</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
