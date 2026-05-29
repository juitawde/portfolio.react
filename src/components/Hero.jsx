import React from 'react';
import Magnetic from './Magnetic';

export default function Hero({ openCV }) {
  return (
    <section className="panel" id="hero">
      <div className="panel-content flex-split row-reverse-mobile fade-in visible">
        <div className="col-left">
          <h1 className="headline">
            Jui Tawde <br />
            <span className="hero-role">Frontend Developer</span>
          </h1>
          <br />
          <br />
          <p className="subheadline">
            Actively building skills in data science and business thinking to create
            impactful, user-focused solutions. Learning to transform complex ideas into smart, analytical,
            and practical innovations while working on Frontend.
          </p>
          <div className="cta-group" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Magnetic strength={0.3} range={60}>
              <a href="#projects" className="btn primary">
                View Projects
              </a>
            </Magnetic>
            <Magnetic strength={0.35} range={60}>
              <button onClick={openCV} className="btn-cv-access">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{ marginRight: '8px' }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Access CV
              </button>
            </Magnetic>
          </div>
        </div>
        <div className="col-right flex-center">
          <div className="profile-card">
            <div className="profile-image-container">
              <img
                src="/WhatsApp Image 2025-12-21 at 13.49.47 copy 3.jpeg"
                alt="Jui Tawde"
                id="profile-img"
              />
            </div>
            <div className="hello-badge">
              <span>
                Hello,
                <br />
                I'm <span className="italic">Jui.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
