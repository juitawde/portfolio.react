import React, { useEffect, useRef } from 'react';

export default function BackgroundMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    // Elegant Dark Mode Colors
    const nodeColor = 'rgba(59, 130, 246, 0.4)'; // Blue-500
    const lineColor = 'rgba(226, 232, 240, 0.05)'; // Slate-200 transparent

    const initCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      particles = [];
      const numParticles = Math.min(Math.floor((width * height) / 10000), 150);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          type: Math.floor(Math.random() * 3), // 0: Solid Dot, 1: Hollow Circle, 2: Cross
        });
      }
    };

    const drawCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            const opacity = 1 - dist / 150;
            ctx.globalAlpha = opacity;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges softly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (p.type === 0) {
          // Solid dot
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 1) {
          // Hollow circle
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === 2) {
          // Cross / Plus sign
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = 1.2;
          const size = p.radius * 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x - size, p.y);
          ctx.lineTo(p.x + size, p.y);
          ctx.moveTo(p.x, p.y - size);
          ctx.lineTo(p.x, p.y + size);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(drawCanvas);
    };

    window.addEventListener('resize', initCanvas);
    initCanvas();
    drawCanvas();

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dark Mode Mesh Background */}
      <div className="dark-mode-mesh">
        <div className="blob blob-dark-1"></div>
        <div className="blob blob-dark-2"></div>
        <div className="blob blob-dark-3"></div>
      </div>
      <canvas id="bg-canvas" ref={canvasRef}></canvas>
    </>
  );
}
