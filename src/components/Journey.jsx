import React from 'react';
import TiltCard from './TiltCard';

export default function Journey() {
  return (
    <section className="panel" id="about">
      <div className="panel-content flex-split fade-in visible">
        <div className="col-left" style={{ flex: 1.1 }}>
          <div className="section-header">
            <span className="eyebrow">ABOUT ME</span>
            <h2 className="section-title">
              The <span className="italic">Journey</span>
            </h2>
          </div>
          <div className="about-text glass-panel" style={{ width: '100%' }}>
            <p className="large-text">
              I am continuously exploring the intersection of technology, data, and
              business to deliver high-quality digital experiences.
            </p>
            <ul className="bullet-list">
              <li>
                <span className="list-bullet"></span>
                <span>
                  <strong>Data Science & AI:</strong> Deeply interested in leveraging data analytics and AI to build
                  intelligent, impactful solutions.
                </span>
              </li>
              <li>
                <span className="list-bullet"></span>
                <span>
                  <strong>Business Tech:</strong> Bridging the gap between robust technical implementations and strategic
                  business goals.
                </span>
              </li>
              <li>
                <span className="list-bullet"></span>
                <span>
                  <strong>User Knowledge:</strong> Designing systems with empathy and understanding, ensuring technology
                  remains engaging and accessible.
                </span>
              </li>
              <li>
                <span className="list-bullet"></span>
                <span>
                  <strong>Continuous Growth:</strong> Looking forward to a dynamic career in Business Technology while
                  constantly expanding my cross-functional skillset.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-right flex-center" style={{ flex: 0.9 }}>
          {/* Dynamic Data Globe Graphic inside TiltCard */}
          <TiltCard
            className="journey-graphic-wrapper"
            resetFlat={true}
            style={{
              width: '100%',
              maxWidth: '420px',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
                filter: 'drop-shadow(0 10px 20px rgba(59,130,246,0.2))',
              }}
            >
              {/* Ambient Glow */}
              <defs>
                <radialGradient id="journeyGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="70" fill="url(#journeyGlow)">
                <animate attributeName="r" values="65;75;65" dur="4s" repeatCount="indefinite" />
              </circle>

              {/* Rotating Globe Grid */}
              <g stroke="var(--border-light)" strokeWidth="1.5" fill="none" opacity="0.6">
                <ellipse cx="100" cy="100" rx="60" ry="20" />
                <ellipse cx="100" cy="70" rx="45" ry="12" />
                <ellipse cx="100" cy="130" rx="45" ry="12" />
                <ellipse cx="100" cy="100" rx="20" ry="60" />
                <circle cx="100" cy="100" r="60" />
              </g>

              {/* Ascending Data Path / Journey Line */}
              <path
                d="M 40 130 Q 70 170 100 100 T 160 50"
                stroke="var(--accent-primary)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              >
                <animate attributeName="stroke-dasharray" values="0,300; 300,0" dur="4s" repeatCount="indefinite" />
              </path>

              {/* Journey Nodes */}
              <circle cx="40" cy="130" r="4.5" fill="#ff7eb3" />
              <circle cx="100" cy="100" r="6.5" fill="#6574ff">
                <animate attributeName="r" values="5.5;7.5;5.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="160" cy="50" r="8.5" fill="#2ed8a7">
                <animate attributeName="r" values="7.5;10.5;7.5" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Outer Data Orbit */}
              <g transform="rotate(45 100 100)">
                <ellipse
                  cx="100"
                  cy="100"
                  rx="85"
                  ry="12"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                  strokeDasharray="6 6"
                ></ellipse>
                <circle cx="185" cy="100" r="5" fill="var(--text-main)">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 100 100"
                    to="360 100 100"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="15" cy="100" r="3" fill="#ffbd2e">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 100 100"
                    to="360 100 100"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
