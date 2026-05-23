import React, { useRef } from 'react';

export default function TiltCard({ children, className = '', resetFlat = true, style = {} }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    if (resetFlat) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    } else {
      card.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
    }
    card.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
  };

  // Default non-hover state for non-flat (code-graphic) card
  const defaultTransform = resetFlat
    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    : 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';

  return (
    <div
      ref={cardRef}
      className={`neon-float ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: defaultTransform,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
