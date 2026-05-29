import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check for interactive elements
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'a, button, .pill, .project-card, .unlock-btn, .nav-dot, .dot, .social-chip, .submit-btn, .close-modal, pre, input, textarea, [role="button"]'
        );
        const hovered = !!interactive;

        if (hovered !== isHoveredRef.current) {
          isHoveredRef.current = hovered;
          if (hovered) {
            dotRef.current?.classList.add('hovered');
            ringRef.current?.classList.add('hovered');
          } else {
            dotRef.current?.classList.remove('hovered');
            ringRef.current?.classList.remove('hovered');
          }
        }
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const handleMouseDown = () => {
      isClickedRef.current = true;
      dotRef.current?.classList.add('clicked');
      ringRef.current?.classList.add('clicked');
    };

    const handleMouseUp = () => {
      isClickedRef.current = false;
      dotRef.current?.classList.remove('clicked');
      ringRef.current?.classList.remove('clicked');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    let animationFrameId;

    const updatePositions = () => {
      // Lerp factor — higher = snappier, lower = smoother trail
      const ease = 0.12;

      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * ease;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * ease;

      // Dot snaps instantly (no lerp on dot — CSS transition removed too)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      // Ring trails smoothly behind mouse
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
