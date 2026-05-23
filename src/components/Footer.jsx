import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [clockText, setClockText] = useState('00:00 AM');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const mins = now.getMinutes().toString().padStart(2, '0');

      let ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      let displayHrs = now.getHours() % 12 || 12;
      displayHrs = displayHrs.toString().padStart(2, '0');

      setClockText(`${displayHrs}:${mins} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="indicator"></span>
        <span className="status-text fw-600">LIVE</span>
        <span className="divider">|</span>
        <span id="clock" className="status-text font-mono">
          {clockText}
        </span>
      </div>
      <div className="status-right">
        <span className="status-text">©️ {new Date().getFullYear()} Jui Tawde</span>
      </div>
    </div>
  );
}
