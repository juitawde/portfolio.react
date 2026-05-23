import React, { useRef } from 'react';
import TiltCard from './TiltCard';

export default function Toolkit() {
  const cardRef = useRef(null);
  const magnifiedRef = useRef(null);
  const lensRef = useRef(null);
  const baseCodeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Directly update DOM styles to bypass React state updates entirely for 100% lag-free performance!
    if (magnifiedRef.current) {
      magnifiedRef.current.style.clipPath = `circle(55px at ${x}px ${y}px)`;
      magnifiedRef.current.style.webkitClipPath = `circle(55px at ${x}px ${y}px)`;
    }
    if (lensRef.current) {
      lensRef.current.style.left = `${x}px`;
      lensRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseEnter = () => {
    if (magnifiedRef.current) {
      magnifiedRef.current.style.display = 'block';
      // Short delay for opacity transition
      setTimeout(() => {
        if (magnifiedRef.current) magnifiedRef.current.style.opacity = '1';
      }, 10);
    }
    if (lensRef.current) {
      lensRef.current.style.display = 'block';
      setTimeout(() => {
        if (lensRef.current) lensRef.current.style.opacity = '1';
      }, 10);
    }
    if (baseCodeRef.current) {
      baseCodeRef.current.style.opacity = '0.3';
    }
  };

  const handleMouseLeave = () => {
    if (magnifiedRef.current) {
      magnifiedRef.current.style.opacity = '0';
      magnifiedRef.current.style.display = 'none';
    }
    if (lensRef.current) {
      lensRef.current.style.opacity = '0';
      lensRef.current.style.display = 'none';
    }
    if (baseCodeRef.current) {
      baseCodeRef.current.style.opacity = '1';
    }
  };

  const renderCode = (isMagnified = false) => (
    <pre style={{ margin: 0, padding: '1.2rem', fontSize: isMagnified ? '0.98rem' : '0.8rem', lineHeight: '1.6' }}>
      <code>
        <span className="keyword" style={{ color: '#ff7eb3' }}>const</span> <span className="function" style={{ color: '#6574ff' }}>developer</span> = &#123;
        {'\n    '}
        <span className="keyword" style={{ color: '#ff7eb3' }}>skills</span>: [
        {'\n        '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'HTML5'</span>,
        {'\n        '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'CSS3'</span>,
        {'\n        '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'JavaScript'</span>,
        {'\n        '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'Python'</span>,
        {'\n        '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'C++'</span>
        {'\n    '}],
        {'\n    '}
        <span className="function" style={{ color: '#6574ff' }}>execute</span>: () =&gt; &#123;
        {'\n        '}
        <span className="keyword" style={{ color: '#ff7eb3' }}>return</span> <span className="comment" style={{ color: '#2ed8a7' }}>"Seamless UI/UX"</span>;
        {'\n    '}&#125;
        {'\n'}&#125;;
        {'\n\n'}
        <span className="keyword" style={{ color: '#ff7eb3' }}>export default</span> <span className="function" style={{ color: '#6574ff' }}>developer</span>;
      </code>
    </pre>
  );

  return (
    <section className="panel" id="toolkit">
      <div className="panel-content flex-split row-reverse-mobile fade-in visible">
        <div className="col-left" style={{ flex: 1.2 }}>
          <div className="section-header">
            <span className="eyebrow">EXPERTISE</span>
            <h2 className="section-title">
              The <span className="italic">Toolkit</span>
            </h2>
            <p className="section-desc">
              A carefully curated setup of languages and frameworks spanning front-end
              logic, clean designs, and responsive layouts.
            </p>
          </div>
          <div className="pills-container">
            <div className="pill">HTML5</div>
            <div className="pill">CSS3</div>
            <div className="pill">JavaScript</div>
            <div className="pill">Python</div>
            <div className="pill">C++</div>
            <div className="pill">UI/UX Design</div>
            <div className="pill">Responsive Layouts</div>
            <div className="pill">Problem Solving</div>
          </div>
        </div>
        <div className="col-right flex-center" style={{ flex: 0.8, justifyContent: 'flex-end' }}>
          <div className="toolkit-graphic-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {/* Glowing Code Graphic inside TiltCard with resetFlat={false} */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', width: '100%', maxWidth: '380px' }}
            >
              <TiltCard
                className="code-graphic"
                resetFlat={false}
                style={{
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Header Bar */}
                <div className="mac-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span style={{
                    marginLeft: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    opacity: 0.7
                  }}>
                    toolkit.js
                  </span>
                </div>

                {/* Base Code Panel (Normal text size) */}
                <div ref={baseCodeRef} style={{ transition: 'opacity 0.25s ease' }}>
                  {renderCode(false)}
                </div>

                {/* Magnified Code Panel (Clipped to a circle following the mouse) */}
                <div
                  ref={magnifiedRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    backgroundColor: 'var(--bg-panel)',
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    paddingTop: '2.5rem', // Offset for header bar
                    display: 'none',
                    opacity: 0,
                    zIndex: 10,
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  {renderCode(true)}
                </div>

                {/* Physical Magnifying Circle Ring */}
                <div
                  ref={lensRef}
                  style={{
                    position: 'absolute',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--accent-primary)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2)',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                    display: 'none',
                    opacity: 0,
                    zIndex: 11,
                    transition: 'opacity 0.15s ease',
                  }}
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
