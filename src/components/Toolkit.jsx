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

  const SKILL_CATEGORIES = [
    {
      category: 'Programming Languages',
      skills: ['C++', 'Python', 'JavaScript', 'Java'],
    },
    {
      category: 'Frontend Development',
      skills: ['HTML5', 'CSS3', 'React.js', 'TypeScript', 'DOM Manipulation', 'REST API Integration'],
    },
    {
      category: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Socket.IO'],
    },
    {
      category: 'Databases & Data Management',
      skills: ['SQL Fundamentals', 'PostgreSQL', 'MongoDB', 'DBMS'],
    },
    {
      category: 'Authentication & Services',
      skills: ['Firebase', 'Supabase', 'JWT Authentication'],
    },
    {
      category: 'Tools & Deployment',
      skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Render'],
    },
    {
      category: 'Core Computer Science',
      skills: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'Debugging', 'Computer Networks', 'Problem Solving'],
    },
  ];

  const renderCode = (isMagnified = false) => (
    <pre
      style={{
        margin: 0,
        padding: '0.2rem 0',
        fontSize: isMagnified ? '0.84rem' : '0.74rem',
        lineHeight: '1.68',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'pre',
      }}
    >
      <code>
        <span className="keyword" style={{ color: '#ff7eb3' }}>const</span> <span className="function" style={{ color: '#6574ff' }}>engineer</span> = &#123;
        {'\n  '}
        <span className="keyword" style={{ color: '#ff7eb3' }}>role</span>: <span className="comment" style={{ color: '#2ed8a7' }}>"Full Stack Engineer"</span>,
        {'\n  '}
        <span className="keyword" style={{ color: '#ff7eb3' }}>stack</span>: &#123;
        {'\n    '}
        <span className="comment" style={{ color: '#ffbd2e' }}>languages</span>: [
        {'\n      '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'C++'</span>, <span className="comment" style={{ color: '#2ed8a7' }}>'Python'</span>,
        {'\n      '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'JavaScript'</span>, <span className="comment" style={{ color: '#2ed8a7' }}>'Java'</span>
        {'\n    '}
        ],
        {'\n    '}
        <span className="comment" style={{ color: '#ffbd2e' }}>frontend</span>: [
        {'\n      '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'React.js'</span>, <span className="comment" style={{ color: '#2ed8a7' }}>'TypeScript'</span>
        {'\n    '}
        ],
        {'\n    '}
        <span className="comment" style={{ color: '#ffbd2e' }}>backend</span>: [
        {'\n      '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'Node.js'</span>, <span className="comment" style={{ color: '#2ed8a7' }}>'Express.js'</span>,
        {'\n      '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'Socket.IO'</span>
        {'\n    '}
        ],
        {'\n    '}
        <span className="comment" style={{ color: '#ffbd2e' }}>databases</span>: [
        {'\n      '}
        <span className="comment" style={{ color: '#2ed8a7' }}>'PostgreSQL'</span>, <span className="comment" style={{ color: '#2ed8a7' }}>'MongoDB'</span>
        {'\n    '}
        ]
        {'\n  '}&#125;,
        {'\n  '}
        <span className="function" style={{ color: '#6574ff' }}>build</span>: () =&gt; <span className="comment" style={{ color: '#2ed8a7' }}>"Scalable Solutions"</span>
        {'\n'}&#125;;
        {'\n\n'}
        <span className="keyword" style={{ color: '#ff7eb3' }}>export default</span> <span className="function" style={{ color: '#6574ff' }}>engineer</span>;
      </code>
    </pre>
  );

  return (
    <section className="panel" id="toolkit">
      <div className="panel-content flex-split row-reverse-mobile fade-in visible">
        <div className="col-left" style={{ flex: 1.05 }}>
          <div className="section-header">
            <span className="eyebrow">EXPERTISE</span>
            <h2 className="section-title">
              The <span className="italic">Toolkit</span>
            </h2>
            <p className="section-desc">
              A carefully curated setup of languages, frameworks, and computer science foundations spanning full-stack architecture, databases, and real-time platforms.
            </p>
          </div>
          <div
            className="toolkit-categories"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginTop: '1.5rem',
              maxHeight: '52vh',
              overflowY: 'auto',
              paddingRight: '0.6rem',
            }}
          >
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="toolkit-group">
                <h4
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '1.5px',
                    color: 'var(--accent-primary)',
                    marginBottom: '0.55rem',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                  }}
                >
                  {cat.category}
                </h4>
                <div className="pills-container" style={{ gap: '0.6rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="pill"
                      style={{ padding: '0.55rem 1.15rem', fontSize: '0.88rem' }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-right flex-center" style={{ flex: 1, justifyContent: 'center' }}>
          <div className="toolkit-graphic-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {/* Glowing Code Graphic inside TiltCard with resetFlat={false} */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', width: '100%', maxWidth: '440px', margin: '0 auto' }}
            >
              <TiltCard
                className="code-graphic"
                resetFlat={false}
                style={{
                  width: '100%',
                  minHeight: '510px',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '1.4rem 1.6rem 1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header Bar */}
                <div className="mac-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
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
                    padding: '1.4rem 1.6rem 1.6rem',
                    display: 'none',
                    opacity: 0,
                    zIndex: 10,
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  <div className="mac-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
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
