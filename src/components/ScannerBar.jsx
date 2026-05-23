import React, { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'about-me', 'toolkit', 'projects', 'about', 'education', 'contact'];

export default function ScannerBar({ activeSection }) {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      const secs = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hrs}:${mins}:${secs}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeIndex = SECTIONS.indexOf(activeSection);

  const handleDotClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scanner-bar">
      <div className="scanner-text scanner-top">
        SYS_RUNTIME_ <span>{time}</span>
      </div>
      <div className="scanner-dots">
        {SECTIONS.map((sectionId, idx) => (
          <div
            key={sectionId}
            onClick={() => handleDotClick(sectionId)}
            className={`dot ${activeIndex === idx ? 'active' : ''}`}
            data-index={idx}
            style={{ cursor: 'pointer' }}
          ></div>
        ))}
      </div>
      <div className="scanner-text scanner-bottom">SCANNING_ENVIRONMENT...</div>
    </div>
  );
}
