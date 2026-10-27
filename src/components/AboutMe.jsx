import React from 'react';
import TiltCard from './TiltCard';

export default function AboutMe() {
  return (
    <section className="panel" id="about-me">
      <div className="panel-content flex-split fade-in visible">
        <div className="col-left" style={{ flex: 1.1 }}>
          <div className="section-header">
            <span className="eyebrow">ABOUT ME</span>
            <h2 className="section-title">
              Who <span className="italic">I Am</span>
            </h2>
          </div>
          <div className="about-bio-card glass-panel">
            <p className="bio-para">
              I'm <strong>Jui Tawde</strong>, a second-year B.Tech Computer Science Engineering student at <strong>ITM Skills University</strong>, passionate about building practical software solutions. My development journey spans frontend experiences, backend systems, databases, and full-stack applications using <span className="accent-text fw-600">React, JavaScript, TypeScript, Node.js, and Express.js</span>.
            </p>
            <p className="bio-para">
              Through projects like <strong>PetMatch</strong>, <strong>Quiz Arena</strong>, and <strong>Chatterly</strong>, I've explored real-time communication, authentication, REST APIs, and database-driven applications. Other projects have helped me strengthen my understanding of <span className="accent-text fw-600">Java, C++, object-oriented programming, data structures, and algorithmic problem-solving</span>.
            </p>
            <p className="bio-para">
              Beyond development, I'm interested in <strong>data science</strong> and <strong>business technology</strong>, particularly how data and software can solve real-world problems and support better decisions. I enjoy learning by building, experimenting with new ideas, and continuously improving my technical skills to create user-centric applications.
            </p>
          </div>
        </div>
        <div className="col-right flex-center" style={{ flex: 0.9 }}>
          {/* Identity Constellation Graphic wrapper in TiltCard */}
          <TiltCard
            className="about-me-graphic-wrapper"
            resetFlat={true}
            style={{
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
                filter: 'drop-shadow(0 10px 20px rgba(59,130,246,0.18))',
              }}
            >
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="avatarGrad" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#6574ff" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </radialGradient>
              </defs>

              {/* Ambient core glow */}
              <circle cx="150" cy="150" r="55" fill="url(#coreGlow)">
                <animate attributeName="r" values="50;60;50" dur="3.5s" repeatCount="indefinite" />
              </circle>

              {/* Outer dashed orbit ring */}
              <circle
                cx="150"
                cy="150"
                r="118"
                className="orbit-ring"
                stroke="var(--border-light)"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="5 7"
                opacity="0.5"
              />

              {/* Inner dashed orbit ring */}
              <circle
                cx="150"
                cy="150"
                r="80"
                className="orbit-ring"
                stroke="var(--border-light)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3 5"
                opacity="0.35"
              />

              {/* Connector lines to trait nodes */}
              <line
                className="connector-line"
                x1="150"
                y1="150"
                x2="150"
                y2="32"
                stroke="var(--accent-primary)"
                strokeWidth="1"
                opacity="0.25"
              />
              <line
                className="connector-line"
                x1="150"
                y1="150"
                x2="268"
                y2="150"
                stroke="#ff7eb3"
                strokeWidth="1"
                opacity="0.25"
              />
              <line
                className="connector-line"
                x1="150"
                y1="150"
                x2="150"
                y2="268"
                stroke="#2ed8a7"
                strokeWidth="1"
                opacity="0.25"
              />
              <line
                className="connector-line"
                x1="150"
                y1="150"
                x2="32"
                y2="150"
                stroke="#ffbd2e"
                strokeWidth="1"
                opacity="0.25"
              />

              {/* Trait node: TOP — Data Science */}
              <circle
                className="trait-node-bg"
                cx="150"
                cy="32"
                r="22"
                fill="var(--bg-panel)"
                stroke="var(--accent-primary)"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text
                x="150"
                y="27"
                textAnchor="middle"
                fontSize="9"
                fill="var(--accent-primary)"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                DATA
              </text>
              <text
                x="150"
                y="38"
                textAnchor="middle"
                fontSize="9"
                fill="var(--accent-primary)"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                SCIENCE
              </text>

              {/* Trait node: RIGHT — B.Tech CSE */}
              <circle
                className="trait-node-bg"
                cx="268"
                cy="150"
                r="22"
                fill="var(--bg-panel)"
                stroke="#ff7eb3"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text
                x="268"
                y="145"
                textAnchor="middle"
                fontSize="8.5"
                fill="#ff7eb3"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                B.TECH
              </text>
              <text
                x="268"
                y="157"
                textAnchor="middle"
                fontSize="8.5"
                fill="#ff7eb3"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                CSE
              </text>

              {/* Trait node: BOTTOM — Builder */}
              <circle
                className="trait-node-bg"
                cx="150"
                cy="268"
                r="22"
                fill="var(--bg-panel)"
                stroke="#2ed8a7"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text
                x="150"
                y="263"
                textAnchor="middle"
                fontSize="9"
                fill="#2ed8a7"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                8
              </text>
              <text
                x="150"
                y="275"
                textAnchor="middle"
                fontSize="9"
                fill="#2ed8a7"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                PROJECTS
              </text>

              {/* Trait node: LEFT — Business Tech */}
              <circle
                className="trait-node-bg"
                cx="32"
                cy="150"
                r="22"
                fill="var(--bg-panel)"
                stroke="#ffbd2e"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text
                x="32"
                y="145"
                textAnchor="middle"
                fontSize="8"
                fill="#ffbd2e"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                BIZ
              </text>
              <text
                x="32"
                y="157"
                textAnchor="middle"
                fontSize="8"
                fill="#ffbd2e"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                TECH
              </text>

              {/* Orbiting accent dot (fast) */}
              <circle r="5" fill="var(--accent-primary)" opacity="0.85">
                <animateMotion dur="6s" repeatCount="indefinite">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>

              {/* Orbiting accent dot (slow, opposite) */}
              <circle r="3.5" fill="#ff7eb3" opacity="0.7">
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  keyPoints="1;0"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>

              <path id="orbitPath" d="M 150,32 A 118,118 0 1 1 149.9,32" fill="none" />

              {/* Central avatar circle */}
              <circle cx="150" cy="150" r="36" fill="url(#avatarGrad)" opacity="0.95" />
              {/* Person silhouette */}
              <circle className="avatar-shape" cx="150" cy="138" r="11" fill="white" opacity="0.9" />
              <ellipse className="avatar-shape" cx="150" cy="163" rx="18" ry="12" fill="white" opacity="0.9" />

              {/* Central pulse ring */}
              <circle cx="150" cy="150" r="36" fill="none" stroke="white" strokeWidth="1.5" opacity="0.0">
                <animate attributeName="r" values="36;52;36" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* Name label */}
              <text
                x="150"
                y="205"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-muted)"
                fontFamily="var(--font-mono)"
                letterSpacing="2"
              >
                JUI TAWDE
              </text>
            </svg>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
