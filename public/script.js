/* =========================================
   DARK & TECHY PORTFOLIO — script.js
   ========================================= */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a, button, .btn, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursor.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.opacity = '1';
  });
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- MOBILE NAV ----
const toggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---- FOOTER YEAR ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ---- SKILL BAR ANIMATION ----
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
skillFills.forEach(s => skillObs.observe(s));

// ---- TERMINAL TYPEWRITER ----
const terminalLines = [
  { type: 'cmd',  text: 'whoami' },
  { type: 'out',  text: 'full-stack-developer' },
  { type: 'cmd',  text: 'cat skills.txt' },
  { type: 'out',  text: 'JavaScript | HTML | CSS | MySQL | Node.js' },
  { type: 'cmd',  text: 'ls projects/' },
  { type: 'out',  text: 'portfolio/  ecommerce/  dashboard/  api/' },
  { type: 'cmd',  text: 'echo $STATUS' },
  { type: 'out',  text: '> Open to Work ✓' },
];
const terminalEl = document.getElementById('terminal');
let lineIdx = 0, charIdx = 0, typing = false;
function typeNext() {
  if (lineIdx >= terminalLines.length) {
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    terminalEl.appendChild(cursor);
    return;
  }
  const line = terminalLines[lineIdx];
  if (!typing) {
    typing = true;
    const div = document.createElement('div');
    div.className = 'terminal-line';
    if (line.type === 'cmd') div.innerHTML = '<span class="t-prompt">$&nbsp;</span><span class="t-cmd" id="tl"></span>';
    else div.innerHTML = '<span class="t-out" id="tl"></span>';
    terminalEl.appendChild(div);
  }
  const span = terminalEl.querySelector('#tl:last-of-type') || terminalEl.lastChild.querySelector('[id="tl"]');
  if (charIdx < line.text.length) {
    span.textContent += line.text[charIdx];
    charIdx++;
    setTimeout(typeNext, 35);
  } else {
    lineIdx++; charIdx = 0; typing = false;
    setTimeout(typeNext, line.type === 'cmd' ? 400 : 200);
  }
}
const terminalObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { typeNext(); terminalObs.disconnect(); }
}, { threshold: 0.3 });
terminalObs.observe(terminalEl);

// ---- PROJECTS DATA ----
const projects = [
  {
    icon: '🛒',
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping app with user auth, cart, and MySQL product/order management.',
    tags: ['JavaScript', 'Node.js', 'MySQL', 'CSS'],
    demo: '#', code: '#'
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Real-time data dashboard pulling from MySQL, with dynamic charts and filters.',
    tags: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    demo: '#', code: '#'
  },
  {
    icon: '📝',
    title: 'Task Manager App',
    description: 'CRUD task app with user sessions, priority filters, and persistent database storage.',
    tags: ['Node.js', 'Express', 'MySQL', 'CSS'],
    demo: '#', code: '#'
  },
  {
    icon: '🌐',
    title: 'REST API Service',
    description: 'Scalable REST API with JWT auth, rate limiting, and full MySQL integration.',
    tags: ['Node.js', 'Express', 'MySQL'],
    demo: '#', code: '#'
  },
  {
    icon: '💬',
    title: 'Chat Application',
    description: 'Real-time chat with WebSockets, persistent message storage, and user profiles.',
    tags: ['JavaScript', 'Node.js', 'MySQL'],
    demo: '#', code: '#'
  },
  {
    icon: '🔐',
    title: 'Auth System',
    description: 'Secure authentication with bcrypt, JWT tokens, password reset and MySQL user management.',
    tags: ['Node.js', 'MySQL', 'JavaScript'],
    demo: '#', code: '#'
  }
];

const grid = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${i * 0.1}s`;
  card.innerHTML = `
    <div class="project-img">${p.icon}</div>
    <div class="project-body">
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-links">
        <a href="${p.demo}" class="project-link">LIVE DEMO</a>
        <a href="${p.code}" class="project-link">SOURCE</a>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// ---- SCROLL FADE ----
const fadeEls = document.querySelectorAll('.section-title, .skill-card, .about-tags, .contact-info');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
fadeEls.forEach(el => { el.classList.add('fade-in'); fadeObs.observe(el); });

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'SENDING...';
  btn.disabled = true;
  const body = {
    name:    form.name.value,
    email:   form.email.value,
    message: form.message.value
  };
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className = 'form-status success';
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    status.textContent = '✗ Something went wrong. Please try again.';
    status.className = 'form-status error';
  } finally {
    btn.textContent = 'SEND MESSAGE';
    btn.disabled = false;
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  }
});

// ---- CV DOWNLOAD ----
document.getElementById('downloadCV').addEventListener('click', e => {
  e.preventDefault();
  // Replace '/cv.pdf' with your actual CV file path
  const link = document.createElement('a');
  link.href = '/cv.pdf';
  link.download = 'My_CV.pdf';
  link.click();
});