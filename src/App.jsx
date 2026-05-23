import React, { useState, useEffect } from 'react';
import BackgroundMesh from './components/BackgroundMesh';
import Navbar from './components/Navbar';
import ScannerBar from './components/ScannerBar';
import BottomPagination from './components/BottomPagination';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Toolkit from './components/Toolkit';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Education from './components/Education';
import Contact from './components/Contact';
import CVModal from './components/CVModal';
import UnlockModal from './components/UnlockModal';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [cvOpen, setCvOpen] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [unlockType, setUnlockType] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Ensure document always has dark theme defaults
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('portfolio_theme', 'dark');
  }, []);

  // Track scroll progress for top glow bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup IntersectionObserver for sections
  useEffect(() => {
    const panels = document.querySelectorAll('.panel');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const fadeEl = entry.target.querySelector('.fade-in');
          if (entry.isIntersecting) {
            if (fadeEl) fadeEl.classList.add('visible');
            setActiveSection(entry.target.id);
          } else {
            if (fadeEl) fadeEl.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    panels.forEach((panel) => observer.observe(panel));

    return () => {
      panels.forEach((panel) => observer.unobserve(panel));
    };
  }, []);

  const openCV = () => {
    setCvOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCV = () => {
    setCvOpen(false);
    document.body.style.overflow = '';
  };

  const openUnlock = (type) => {
    setUnlockType(type);
    setUnlockOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
    setUnlockType('');
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Premium scroll progress top glow bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent-primary) 0%, #2ed8a7 100%)',
          zIndex: 999999,
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
          transition: 'width 0.05s linear',
        }}
      />
      <CustomCursor />
      <BackgroundMesh />
      <Navbar activeSection={activeSection} />
      <ScannerBar activeSection={activeSection} />

      <main className="container">
        <Hero openCV={openCV} />
        <AboutMe />
        <Toolkit />
        <Projects />
        <Journey />
        <Education onUnlockCertificates={openUnlock} />
        <Contact />
      </main>

      <CVModal isOpen={cvOpen} onClose={closeCV} />
      <UnlockModal isOpen={unlockOpen} type={unlockType} onClose={closeUnlock} />
      <Footer />
      <BottomPagination activeSection={activeSection} />
    </>
  );
}
