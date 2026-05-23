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
      {/* Base AI Project Cover Image */}
      <img
        src={src}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
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
    title: 'Employee Leave Trend Visualizer',
    github: 'https://github.com/juitawde/Leave-trend-Visualizer.git',
    image: '/assets/project_leave_visualizer.png',
    desc: 'Python-based visualization tool analyzing monthly and departmental leave trends with actionable insights.',
    metricVal: 'Python',
    metricLabel: 'Data',
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
    title: 'Brew & Bloom',
    github: 'https://github.com/juitawde/Brew-Bloom.git',
    image: '/assets/project_brew_bloom.png',
    desc: 'Blending pastel visuals, smooth animations, and a cozy café-inspired layout for a premium experience.',
    metricVal: 'HTML/CSS',
    metricLabel: 'Frontend',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>&lt;div</span> <span style={{ color: '#6574ff' }}>class</span>=<span style={{ color: '#2ed8a7' }}>"cafe-hero"</span><span style={{ color: '#ff7eb3' }}>&gt;</span>{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>&lt;h1&gt;</span>Welcome to Brew & Bloom<span style={{ color: '#ff7eb3' }}>&lt;/h1&gt;</span>{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>&lt;p&gt;</span>Coffee & floral aesthetics.<span style={{ color: '#ff7eb3' }}>&lt;/p&gt;</span>{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>&lt;button&gt;</span>Order Online<span style={{ color: '#ff7eb3' }}>&lt;/button&gt;</span>{"\n"}
        <span style={{ color: '#ff7eb3' }}>&lt;/div&gt;</span>{"\n\n"}
        <span style={{ color: '#6574ff' }}>.cafe-hero</span> &#123;{"\n"}
        {"  "}background: <span style={{ color: '#2ed8a7' }}>var(--pastel-pink)</span>;{"\n"}
        &#125;
      </code>
    ),
  },
  {
    title: 'Intrepid Replica',
    github: 'https://github.com/juitawde/inteprid_replica.git',
    image: '/assets/project_intrepid_replica.png',
    desc: 'A responsive travel-themed website created using HTML5 and CSS3 for educational purposes, focusing on clean UI.',
    metricVal: 'HTML, CSS',
    metricLabel: 'Frontend',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>&lt;section</span> <span style={{ color: '#6574ff' }}>class</span>=<span style={{ color: '#2ed8a7' }}>"travel-grid"</span><span style={{ color: '#ff7eb3' }}>&gt;</span>{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>&lt;h2&gt;</span>Popular Routes<span style={{ color: '#ff7eb3' }}>&lt;/h2&gt;</span>{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>&lt;div</span> <span style={{ color: '#6574ff' }}>class</span>=<span style={{ color: '#2ed8a7' }}>"routes"</span><span style={{ color: '#ff7eb3' }}>&gt;</span>{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>&lt;div&gt;</span>Maldives ↗<span style={{ color: '#ff7eb3' }}>&lt;/div&gt;</span>{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>&lt;div&gt;</span>Santorini ↗<span style={{ color: '#ff7eb3' }}>&lt;/div&gt;</span>{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>&lt;/div&gt;</span>{"\n"}
        <span style={{ color: '#ff7eb3' }}>&lt;/section&gt;</span>
      </code>
    ),
  },
  {
    title: 'WeatherScope',
    github: 'https://github.com/juitawde/WeatherScope.git',
    image: '/assets/project_weatherscope.png',
    desc: 'A modern Weather Data Aggregator Dashboard fetching real-time info and visualizing it with interactive UI components.',
    metricVal: 'HTML, CSS, JS',
    metricLabel: 'Frontend',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>const</span> API_KEY = <span style={{ color: '#2ed8a7' }}>"65fe9d8bc..."</span>;{"\n"}
        <span style={{ color: '#ff7eb3' }}>async function</span> fetchWeather(city) &#123;{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>const</span> res = <span style={{ color: '#ff7eb3' }}>await</span> fetch(`api?q=$&#123;city&#125;`);{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>const</span> data = <span style={{ color: '#ff7eb3' }}>await</span> res.json();{"\n"}
        {"  "}updateDashboard(data.temp, data.condition);{"\n"}
        &#125;
      </code>
    ),
  },
  {
    title: 'Smart Traffic Signal Simulation',
    github: 'https://github.com/juitawde/traffic_signal.simulator.git',
    image: '/assets/project_traffic_signal.png',
    desc: 'A console-based Smart Traffic Signal Simulation in C++ using time-based logic and sequential execution.',
    metricVal: 'C++',
    metricLabel: 'Console',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>#include</span> <span style={{ color: '#2ed8a7' }}>&lt;iostream&gt;</span>{"\n"}
        <span style={{ color: '#ff7eb3' }}>class</span> <span style={{ color: '#6574ff' }}>TrafficSignal</span> &#123;{"\n"}
        <span style={{ color: '#ff7eb3' }}>public</span>:{"\n"}
        {"  "}<span style={{ color: '#ff7eb3' }}>void</span> checkSensor(<span style={{ color: '#ff7eb3' }}>int</span> cars) &#123;{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>if</span> (cars &gt; <span style={{ color: '#2ed8a7' }}>10</span>) triggerGreen();{"\n"}
        {"  "}&#125;{"\n"}
        &#125;;
      </code>
    ),
  },
  {
    title: 'Daily Expense Tracker',
    github: 'https://github.com/juitawde/expense_tracker.git',
    image: '/assets/project_expense_tracker.png',
    desc: 'A simple and modern Web App that helps you record, manage, and monitor your daily spending effortlessly.',
    metricVal: 'HTML, CSS, JS',
    metricLabel: 'Frontend',
    code: (
      <code>
        <span style={{ color: '#ff7eb3' }}>class</span> <span style={{ color: '#6574ff' }}>ExpenseTracker</span> &#123;{"\n"}
        {"  "}constructor() &#123; <span style={{ color: '#ff7eb3' }}>this</span>.expenses = []; &#125;{"\n"}
        {"  "}addTransaction(title, amount) &#123;{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>this</span>.expenses.push(&#123; title, amount &#125;);{"\n"}
        {"    "}<span style={{ color: '#ff7eb3' }}>this</span>.renderCharts();{"\n"}
        {"  "}&#125;{"\n"}
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
                <div className="project-header">
                  <h3>{proj.title}</h3>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                    title="View Source"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-divider"></div>
                <div className="metrics">
                  <div className="metric">
                    <span className="metric-val">{proj.metricVal}</span>
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
