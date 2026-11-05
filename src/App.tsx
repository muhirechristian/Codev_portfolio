import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
function MainApp() {
  return (
    <div className="relative bg-[#fafafa] dark:bg-[#0c0d0e] min-h-screen text-[#0a0a0a] dark:text-[#f5f5f5] selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black font-sans transition-colors duration-300">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Sticky Hero with Parallax Reveal */}
      <div className="sticky top-0 bg-[#fafafa] dark:bg-[#0c0d0e] transition-colors duration-300">
        <Hero />
      </div>

      {/* Content Wrapper scrolling over sticky Hero */}
      <div className="relative bg-[#fafafa] dark:bg-[#0c0d0e] z-10 shadow-2xl transition-colors duration-300">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
