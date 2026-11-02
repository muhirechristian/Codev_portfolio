import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import InquiriesDashboard from './components/InquiriesDashboard.tsx';

export default function App() {
  const [showInquiries, setShowInquiries] = useState(false);

  useEffect(() => {
    const handleLocation = () => {
      if (
        window.location.pathname === '/messages' ||
        window.location.hash === '#messages' ||
        window.location.hash === '#inquiries'
      ) {
        setShowInquiries(true);
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  return (
    <div className="relative bg-[#fafafa] min-h-screen text-[#0a0a0a] selection:bg-black selection:text-white font-sans">
      {/* Fixed Navigation */}
      <Navbar onOpenInquiries={() => setShowInquiries(true)} />

      {/* Sticky Hero with Parallax Reveal */}
      <div className="sticky top-0">
        <Hero />
      </div>

      {/* Content Wrapper scrolling over sticky Hero */}
      <div className="relative bg-[#fafafa] z-10 shadow-2xl">
        <About />
        <Skills />
        <Projects />
        <Contact onOpenInquiries={() => setShowInquiries(true)} />
      </div>

      {/* Secret Inquiries Dashboard View / Modal */}
      {showInquiries && (
        <InquiriesDashboard
          onClose={() => {
            setShowInquiries(false);
            if (window.location.hash === '#messages' || window.location.hash === '#inquiries') {
              history.pushState(null, '', window.location.pathname);
            }
          }}
        />
      )}
    </div>
  );
}
