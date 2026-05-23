import React from 'react';
import Magnetic from './Magnetic';

export default function Education({ onUnlockCertificates }) {
  return (
    <section className="panel" id="education">
      <div className="panel-content fade-in visible">
        <div className="section-header center-align">
          <span className="eyebrow">ACADEMIC BACKGROUND</span>
          <h2 className="section-title">
            My <span className="italic">Education</span>
          </h2>
          <p className="section-desc">The foundation of my technical and analytical skills.</p>
        </div>
        <div className="projects-grid">
          <div
            className="project-card glass-panel flex-column"
            style={{ justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '3rem' }}
          >
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>B.Tech Computer Science (CSE)</h3>
            <p className="project-desc" style={{ fontSize: '1.2rem' }}>
              ITM Skills University Kharghar
            </p>
            <div className="contact-divider" style={{ margin: '0 auto' }}></div>
            <div className="metrics" style={{ justifyContent: 'center' }}>
              <div className="metric">
                <span className="metric-val">2029</span>
                <span className="metric-label">Expected Graduation</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Magnetic strength={0.35} range={65}>
                <button className="unlock-btn" onClick={() => onUnlockCertificates('btech')}>
                  <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '8px', fill: 'currentColor' }}>
                    <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z" />
                  </svg>
                  Unlock my Achievements
                </button>
              </Magnetic>
            </div>
          </div>
          <div
            className="project-card glass-panel flex-column"
            style={{ justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '3rem' }}
          >
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>11th & 12th (Science)</h3>
            <p className="project-desc" style={{ fontSize: '1.2rem' }}>
              Narayana Jr. College, Nalasopara
            </p>
            <div className="contact-divider" style={{ margin: '0 auto' }}></div>
            <div className="metrics" style={{ justifyContent: 'center' }}>
              <div className="metric">
                <span className="metric-val">Completed</span>
                <span className="metric-label">Status</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Magnetic strength={0.35} range={65}>
                <button className="unlock-btn" onClick={() => onUnlockCertificates('hsc')}>
                  <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '8px', fill: 'currentColor' }}>
                    <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z" />
                  </svg>
                  Unlock my Certificates
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
