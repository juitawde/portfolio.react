import React, { useRef } from 'react';

function ProjectImageScanner({ src, code, title }) {
  const containerRef = useRef(null);
  const codeOverlayRef = useRef(null);
  const lensRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Directly update DOM styles to bypass React state updates entirely for 100% lag-free performance!
    if (codeOverlayRef.current) {
      codeOverlayRef.current.style.clipPath = `circle(55px at ${x}px ${y}px)`;
      codeOverlayRef.current.style.webkitClipPath = `circle(55px at ${x}px ${y}px)`;
    }
    if (lensRef.current) {
      lensRef.current.style.left = `${x}px`;
      lensRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseEnter = () => {
    if (codeOverlayRef.current) {
      codeOverlayRef.current.style.display = 'block';
      setTimeout(() => {
        if (codeOverlayRef.current) codeOverlayRef.current.style.opacity = '1';
      }, 10);
    }
    if (lensRef.current) {
      lensRef.current.style.display = 'block';
      setTimeout(() => {
        if (lensRef.current) lensRef.current.style.opacity = '1';
      }, 10);
    }
  };

  const handleMouseLeave = () => {
    if (codeOverlayRef.current) {
      codeOverlayRef.current.style.opacity = '0';
      codeOverlayRef.current.style.display = 'none';
    }
    if (lensRef.current) {
      lensRef.current.style.opacity = '0';
      lensRef.current.style.display = 'none';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '160px',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '1.2rem',
        cursor: 'none', // Custom scanner cursor experience!
        border: '1px solid var(--border-light)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#0a0d14',
      }}
    >
      {/* Base Project Cover Image */}
      <img
        src={src}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: src.includes('leave') ? 'contain' : 'cover',
          backgroundColor: src.includes('leave') ? '#ffffff' : '#0a0d14',
          transition: 'transform 0.5s ease',
        }}
      />

      {/* Code Snippet Overlay (Revealed via circular clipPath) */}
      <div
        ref={codeOverlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          backgroundColor: '#080b11',
          display: 'none',
          opacity: 0,
          zIndex: 10,
          transition: 'opacity 0.15s ease',
        }}
      >
        <pre style={{
          margin: 0,
          padding: '0.8rem',
          fontSize: '0.68rem',
          lineHeight: '1.4',
          fontFamily: 'var(--font-mono)',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          color: '#a0aec0',
          textAlign: 'left',
          whiteSpace: 'pre',
        }}>
          {code}
        </pre>
      </div>

      {/* Magnifying Scanner Glass Lens Circle Ring */}
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
    </div>
  );
}

const PROJECTS_DATA = [
  {
    title: 'PetMatch — Pet Adoption Portal',
    live: 'https://pet-adoption-portal-1.onrender.com/',
    github: 'https://github.com/juitawde/pet-adoption-portal',
    image: '/assets/project_petmatch.png',
    desc: 'A full-stack pet adoption platform featuring pet listings, adoption applications, admin management, JWT and Firebase authentication, real-time updates, and push notifications.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Firebase Auth', 'Socket.IO', 'FCM'],
    metricVal: 'React • Node',
    metricLabel: 'Full Stack',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>router</span>.post(<span style={{ color: '#2ed8a7' }}>"/adopt"</span>, authenticateJWT, <span style={{ color: '#ff7eb3' }}>async</span> (req, res) =&gt; &#123;{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>const</span> app = <span style={{ color: '#ff7eb3' }}>await</span> Application.create(req.body);{"\n"}
        {"  "}io.emit(<span style={{ color: '#2ed8a7' }}>"new_application"</span>, &#123; petId: req.body.petId &#125;);{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>await</span> sendFCMNotification(adminTokens, <span style={{ color: '#2ed8a7' }}>"New Application"</span>);{"\n"}
        {"  "}res.status(<span style={{ color: '#2ed8a7' }}>201</span>).json(app);{"\n"}
        &#125;);
      </code>
    ),
  },
  {
    title: 'Quiz Arena — Real-Time Quiz Platform',
    live: 'https://realtime-quiz-platform-w0c4.onrender.com/',
    github: 'https://github.com/juitawde/realtime-quiz-platform',
    image: '/assets/project_quiz_arena.png',
    desc: 'A real-time multiplayer quiz platform featuring PIN-based rooms, synchronized timers, custom quizzes, document import, persistent quiz history, performance reports, leaderboards, and a winners\' podium.',
    tech: ['JavaScript', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB'],
    metricVal: 'Socket.IO • Node',
    metricLabel: 'Real-Time',
    code: (
      <code>
        io.on(<span style={{ color: '#2ed8a7' }}>"connection"</span>, (socket) =&gt; &#123;{"\n"}
        {"  "}socket.on(<span style={{ color: '#2ed8a7' }}>"join_room"</span>, (&#123; pin, player &#125;) =&gt; &#123;{"\n"}
        {"    "}socket.join(pin);{"\n"}
        {"    "}rooms[pin].players.push(player);{"\n"}
        {"    "}io.to(pin).emit(<span style={{ color: '#2ed8a7' }}>"player_joined"</span>, rooms[pin]);{"\n"}
        {"  "}&#125;);{"\n"}
        &#125;);
      </code>
    ),
  },
  {
    title: 'Chatterly — Real-Time Chat App',
    live: 'https://chatterly-self.vercel.app/',
    github: 'https://github.com/juitawde/realtime-chat-app',
    image: '/assets/project_chatterly.png',
    desc: 'A full-stack real-time chat application with direct and group conversations, authentication, media uploads, message editing and reactions, user blocking, notifications, and AI-powered chat summarization.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'],
    metricVal: 'React • TypeScript',
    metricLabel: 'Full Stack',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>interface</span> <span style={{ color: '#6574ff' }}>ChatMessage</span> &#123;{"\n"}
        {"  "}channelId: <span style={{ color: '#6574ff' }}>string</span>;{"\n"}
        {"  "}senderId: <span style={{ color: '#6574ff' }}>string</span>;{"\n"}
        {"  "}content: <span style={{ color: '#6574ff' }}>string</span>;{"\n"}
        {"  "}reactions?: Record&lt;<span style={{ color: '#6574ff' }}>string</span>, <span style={{ color: '#6574ff' }}>string[]</span>&gt;;{"\n"}
        &#125;{"\n"}
        socket.emit(<span style={{ color: '#2ed8a7' }}>"send_message"</span>, payload);
      </code>
    ),
  },
  {
    title: 'Vox Commander — Voice-Controlled Notes App',
    live: 'https://vox-commander.vercel.app/',
    github: 'https://github.com/juitawde/vox_commander',
    image: '/assets/project_vox_commander.png',
    desc: 'A voice-controlled notes application built with React and the Web Speech API, featuring reusable components, Local Storage persistence, PDF export, and a responsive interface.',
    tech: ['React.js', 'JavaScript', 'Web Speech API', 'Local Storage'],
    metricVal: 'React • Web Speech',
    metricLabel: 'Voice App',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>const</span> recognition = <span style={{ color: '#ff7eb3' }}>new</span> window.webkitSpeechRecognition();{"\n"}
        recognition.continuous = <span style={{ color: '#ff7eb3' }}>true</span>;{"\n"}
        recognition.onresult = (event) =&gt; &#123;{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>const</span> text = event.results[event.resultIndex][<span style={{ color: '#2ed8a7' }}>0</span>].transcript;{"\n"}
        {"  "}dispatchCommand(text.trim());{"\n"}
        &#125;;
      </code>
    ),
  },
  {
    title: 'Employee Leave Trend Visualizer',
    github: 'https://github.com/juitawde/Leave-trend-Visualizer.git',
    image: '/assets/project_leave_trend_histogram.png',
    desc: 'Python-based visualization tool analyzing monthly and departmental leave trends with actionable insights.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
    metricVal: 'Python • Matplotlib',
    metricLabel: 'Data Science',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>import</span> pandas <span style={{ color: '#ff7eb3' }}>as</span> pd{"\n"}
        <span style={{ color: '#ff7eb3' }}>import</span> matplotlib.pyplot <span style={{ color: '#ff7eb3' }}>as</span> plt{"\n\n"}
        df = pd.read_csv(<span style={{ color: '#2ed8a7' }}>"leave_trends.csv"</span>){"\n"}
        trends = df.groupby([<span style={{ color: '#2ed8a7' }}>"dept"</span>, <span style={{ color: '#2ed8a7' }}>"month"</span>]).size(){"\n"}
        trends.unstack().plot(kind=<span style={{ color: '#2ed8a7' }}>"bar"</span>, stacked=<span style={{ color: '#ff7eb3' }}>True</span>){"\n"}
        plt.title(<span style={{ color: '#2ed8a7' }}>"Departmental Trends"</span>){"\n"}
        plt.show()
      </code>
    ),
  },
  {
    title: 'Eventify — Java Event Management System',
    github: 'https://github.com/juitawde/eventify-java',
    image: '/assets/project_eventify.png',
    desc: 'A Java Swing event management application for browsing, searching, and booking events, with admin management and object-oriented data handling using Java collections.',
    tech: ['Java', 'Swing', 'Object-Oriented Programming', 'Collections Framework'],
    metricVal: 'Java • Swing',
    metricLabel: 'Desktop App',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>public class</span> <span style={{ color: '#6574ff' }}>EventManager</span> &#123;{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>private</span> Map&lt;String, Event&gt; events = <span style={{ color: '#ff7eb3' }}>new</span> HashMap&lt;&gt;();{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>public synchronized boolean</span> bookTicket(String id, User u) &#123;{"\n"}
        {"    "}Event ev = events.get(id);{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>return</span> ev != <span style={{ color: '#ff7eb3' }}>null</span> &amp;&amp; ev.reserveSeat(u);{"\n"}
        {"  "}&#125;{"\n"}
        &#125;
      </code>
    ),
  },
  {
    title: 'MemGrid — Distributed Shared Memory Simulator',
    github: 'https://github.com/juitawde/MemGrid',
    image: '/assets/project_memgrid.png',
    desc: 'A C++ distributed shared memory simulator using AVL trees, hash maps, graphs, priority queues, and Dijkstra\'s algorithm for efficient node communication.',
    tech: ['C++', 'AVL Trees', 'Hash Maps', 'Graphs', 'Priority Queues', 'Dijkstra'],
    metricVal: 'C++ • Algorithms',
    metricLabel: 'Distributed Sys',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>class</span> <span style={{ color: '#6574ff' }}>DSMCluster</span> &#123;{"\n"}
        {"  "}AVLTree&lt;<span style={{ color: '#6574ff' }}>int</span>, MemoryBlock&gt; blockIndex;{"\n"}
        {"  "}Graph networkTopology;{"\n"}
        <span style={{ color: '#ff7eb3' }}>public</span>:{"\n"}
        {"  "}vector&lt;<span style={{ color: '#6574ff' }}>int</span>&gt; route(int src, int targetBlock) &#123;{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>return</span> networkTopology.dijkstra(src, targetBlock);{"\n"}
        {"  "}&#125;{"\n"}
        &#125;;
      </code>
    ),
  },
  {
    title: 'WeatherScope — Weather Information Application',
    live: 'https://juitawde.github.io/WeatherScope/',
    github: 'https://github.com/juitawde/WeatherScope',
    image: '/assets/project_weatherscope.png',
    desc: 'A responsive weather application that fetches and displays real-time weather data using REST APIs, asynchronous JavaScript, Fetch API, and Promises, with error handling.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
    metricVal: 'HTML • CSS • JS',
    metricLabel: 'API Dashboard',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>const</span> API_KEY = <span style={{ color: '#2ed8a7' }}>"65fe9d8bc..."</span>;{"\n"}
        <span style={{ color: '#ff7eb3' }}>async function</span> fetchWeather(city) &#123;{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>const</span> res = <span style={{ color: '#ff7eb3' }}>await</span> fetch(`api?q=$&#123;city&#125;&amp;appid=$&#123;API_KEY&#125;`);{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>const</span> data = <span style={{ color: '#ff7eb3' }}>await</span> res.json();{"\n"}
        {"  "}updateDashboard(data.main.temp, data.weather[<span style={{ color: '#2ed8a7' }}>0</span>].desc);{"\n"}
        &#125;
      </code>
    ),
  },
];

export default function Projects() {
  return (
    <section className="panel" id="projects">
      <div className="panel-content fade-in visible">
        <div className="section-header">
          <span className="eyebrow">PROFESSIONAL NARRATIVE</span>
          <h2 className="section-title">
            Selected <span className="italic">Works</span>
          </h2>
        </div>
        <div className="projects-grid">
          {PROJECTS_DATA.map((proj, idx) => (
            <div key={idx} className="project-card glass-panel">
              {/* Premium X-Ray Code Scanner Image Frame */}
              <ProjectImageScanner src={proj.image} code={proj.code} title={proj.title} />

              <div className="project-info">
                <div
                  className="project-header"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    marginBottom: '0.8rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.12rem',
                      lineHeight: '1.35',
                      margin: 0,
                      flex: 1,
                      paddingRight: '0.5rem',
                    }}
                  >
                    {proj.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexShrink: 0 }}>
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="live-link"
                        title="Live Demo"
                        aria-label="Live Demo"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                        title="View Source"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className="project-desc">{proj.desc}</p>
                {proj.tech && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', margin: '0.8rem 0 0.5rem' }}>
                    {proj.tech.map((t, tidx) => (
                      <span
                        key={tidx}
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="project-divider"></div>
                <div className="metrics">
                  <div className="metric">
                    <span className="metric-val" style={{ fontSize: '0.92rem' }}>
                      {proj.metricVal}
                    </span>
                    <span className="metric-label">{proj.metricLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
