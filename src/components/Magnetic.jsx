import React, { useRef, useState, useEffect } from 'react';

export default function Magnetic({ children, strength = 0.35, range = 75, style: customStyle = {} }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Distance between mouse and element center
      const distanceX = e.clientX - elementCenterX;
      const distanceY = e.clientY - elementCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setIsTransitioning(false);
        // Magnetic pull toward mouse with speed limit
        const pullX = distanceX * strength;
        const pullY = distanceY * strength;
        setPosition({ x: pullX, y: pullY });
      } else {
        // Reset if outside magnetic range
        setIsTransitioning(true);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsTransitioning(true);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, range]);

  const transformStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
    width: '100%',
    height: '100%',
  };

  return (
    <div ref={containerRef} style={{ display: 'inline-block', ...customStyle }}>
      <div style={transformStyle}>{children}</div>
    </div>
  );
}
