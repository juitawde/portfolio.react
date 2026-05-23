document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('portfolio_theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        // Default to dark or saved dark
        document.documentElement.removeAttribute('data-theme');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('portfolio_theme', 'dark');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio_theme', 'light');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
        updateCanvasColors(); // Sync background effect with theme
    });

    /* --- Live Clock --- */
    const clockEl = document.getElementById('clock');
    const scannerTimeEl = document.getElementById('scanner-time');

    function updateClock() {
        const now = new Date();
        const hrs = now.getHours().toString().padStart(2, '0');
        const mins = now.getMinutes().toString().padStart(2, '0');
        const secs = now.getSeconds().toString().padStart(2, '0');

        let ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        let displayHrs = now.getHours() % 12 || 12;
        displayHrs = displayHrs.toString().padStart(2, '0');

        clockEl.textContent = `${displayHrs}:${mins} ${ampm}`;
        scannerTimeEl.textContent = `${hrs}:${mins}:${secs}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* --- Scroll Interactions & Pagination --- */
    const panels = document.querySelectorAll('.panel');
    const rightDots = document.querySelectorAll('.scanner-dots .dot');
    const bottomDots = document.querySelectorAll('.bottom-pagination .nav-dot');
    const navLinks = document.querySelectorAll('.floating-nav .nav-link');

    // Smooth fade in and Nav updates
    // Smooth fade in and Nav updates
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const fadeEl = entry.target.querySelector('.fade-in');
            if (entry.isIntersecting) {
                if (fadeEl) fadeEl.classList.add('visible');

                // Update active dots and nav
                const index = Array.from(panels).indexOf(entry.target);
                setActiveDot(index);
                setActiveNav(entry.target.id);
            } else {
                // Re-prepare animation when scrolling out of view
                if (fadeEl) fadeEl.classList.remove('visible');
            }
        });
    }, { threshold: 0.15 }); // Slightly lower threshold for better reactivity


    panels.forEach(panel => observer.observe(panel));

    function setActiveDot(index) {
        if (index < 0 || index >= rightDots.length) return;

        rightDots.forEach(d => d.classList.remove('active'));
        bottomDots.forEach(d => d.classList.remove('active'));

        rightDots[index].classList.add('active');
        bottomDots[index].classList.add('active');
    }

    function setActiveNav(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            }
        });
    }

    /* --- Canvas Professional Background Effect (Nodes) --- */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Colors based on theme
    let nodeColor, lineColor;

    function updateCanvasColors() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            nodeColor = 'rgba(37, 99, 235, 0.7)'; // Brighter Blue
            lineColor = 'rgba(37, 99, 235, 0.15)';  // Subtle blue lines instead of grey
        } else {
            nodeColor = 'rgba(59, 130, 246, 0.4)'; // Blue-500
            lineColor = 'rgba(226, 232, 240, 0.05)'; // Slate-200 transparent
        }
    }
    updateCanvasColors();

    function initCanvas() {
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
                type: Math.floor(Math.random() * 3) // 0: Solid Dot, 1: Hollow Circle, 2: Cross
            });
        }
    }

    function drawCanvas() {
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
                    // opacity based on distance
                    const opacity = 1 - (dist / 150);
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

        requestAnimationFrame(drawCanvas);
    }
    window.addEventListener('resize', initCanvas);

    // Start canvas
    initCanvas();
    drawCanvas();

    /* --- 3D Interactive Mouse Tilt for Code Graphics --- */
    const tiltCards = document.querySelectorAll('.neon-float');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt degrees (max 12 deg) seamlessly based on exactly where the mouse is
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            // Journey & About Me graphics reset flat; code graphic resets to angled default
            const isFlat = card.classList.contains('journey-graphic-wrapper') ||
                card.classList.contains('about-me-graphic-wrapper');
            if (isFlat) {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            } else {
                card.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg)`;
            }
            card.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
    });

    /* --- AJAX Contact Form Submission --- */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state on button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        contactForm.style.display = 'none';
                        formSuccess.style.display = 'block';
                        contactForm.reset();
                    } else {
                        return response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert("Oops! There was a problem submitting your form");
                            }
                        });
                    }
                })
                .catch(error => {
                    alert("Oops! There was a problem submitting your form");
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});

/* --- Certificate Unlock System --- */
let currentCertType = '';
let currentCertIndex = 0;
const certData = {
    'hsc': [
        { title: '10th Marksheet (SSC)', file: 'WhatsApp%20Image%202025-12-21%20at%2017.35.04 copy 2.jpeg' },
        { title: '12th Marksheet (HSC)', file: 'WhatsApp%20Image%202025-12-21%20at%2017.21.39 copy 2.jpeg' }
    ],
    'btech': [
        { title: 'HTML Course Certificate', file: 'Screenshot%202026-02-24%20at%2012.28.59%E2%80%AFAM copy 2.png' }
    ]
};

window.unlockCertificates = function (type) {
    const modal = document.getElementById('unlock-modal');
    const intro = document.getElementById('unlock-intro');
    const viewer = document.getElementById('certificate-viewer');
    const statusText = document.getElementById('unlock-status');

    currentCertType = type;
    currentCertIndex = 0;

    const steps = [
        "INITIALIZING_SECURITY_PROTOCOL...",
        "AUTHENTICATING_USER_IDENTITY...",
        "DECRYPTING_PROTECTED_ASSETS...",
        "UNWINDING_CERTIFICATES...",
        "ACCESS_GRANTED_BY_JUI_TAWDE"
    ];

    if (!modal || !statusText) return;

    modal.style.display = 'flex';
    intro.style.display = 'block';
    viewer.style.display = 'none';
    document.body.style.overflow = 'hidden';

    let stepIndex = 0;
    const interval = setInterval(() => {
        if (stepIndex < steps.length) {
            statusText.innerText = steps[stepIndex];
            stepIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                intro.style.display = 'none';
                viewer.style.display = 'block';
                updateCertViewer();
            }, 800);
        }
    }, 600);
};

window.changeCert = function (dir) {
    const data = certData[currentCertType];
    currentCertIndex = (currentCertIndex + dir + data.length) % data.length;
    updateCertViewer();
};

function updateCertViewer() {
    const data = certData[currentCertType][currentCertIndex];
    const title = document.getElementById('cert-title');
    const img = document.getElementById('cert-img');
    const prevBtn = document.getElementById('prev-cert');
    const nextBtn = document.getElementById('next-cert');

    if (!title || !img) return;

    title.innerText = data.title;
    img.src = decodeURIComponent(data.file);

    const hasMultiple = certData[currentCertType].length > 1;
    prevBtn.style.display = hasMultiple ? 'block' : 'none';
    nextBtn.style.display = hasMultiple ? 'block' : 'none';
}

window.downloadCurrentCert = function () {
    const data = certData[currentCertType][currentCertIndex];
    const link = document.createElement('a');
    link.href = data.file; // Uses encoded path for request
    link.download = decodeURIComponent(data.file); // Decoded name for local save
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


window.closeUnlockModal = function () {
    const modal = document.getElementById('unlock-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

/* --- CV Access System (Biometric Scan) --- */
window.openCV = function () {
    const modal = document.getElementById('cv-modal');
    const scanningZone = document.getElementById('cv-scanning-zone');
    const viewer = document.getElementById('cv-viewer');
    const statusText = document.getElementById('cv-status');

    const steps = [
        "ESTABLISHING_SECURE_CONNECTION...",
        "SCANNING_BIOMETRIC_DATA...",
        "VERIFYING_IDENTIFICATION...",
        "AUTHORIZING_ACCESS_LEVEL_5...",
        "DECRYPTING_RESUME_BLOB...",
        "ACCESS_GRANTED"
    ];

    if (!modal || !statusText) return;

    modal.style.display = 'flex';
    scanningZone.style.display = 'flex';
    viewer.style.display = 'none';
    document.body.style.overflow = 'hidden';

    let stepIndex = 0;
    const interval = setInterval(() => {
        if (stepIndex < steps.length) {
            statusText.innerText = steps[stepIndex];
            stepIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                scanningZone.style.display = 'none';
                viewer.style.display = 'block';
            }, 800);
        }
    }, 700);
};

window.closeCVModal = function () {
    const modal = document.getElementById('cv-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

/* --- Reset Contact Form UI --- */
window.resetContactForm = function () {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (contactForm && formSuccess) {
        formSuccess.style.display = 'none';
        contactForm.style.display = 'grid'; // Grid matches the .form-grid class
    }
};