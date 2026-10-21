/* ============================================================
   LESEDI'S PORTFOLIO — main.js
   ============================================================ */

/* ============================================================
   MATRIX RAIN CANVAS
   ============================================================ */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789<>/\\[]{}';

  let cols, drops;
  const fontSize = 13;

  function setup() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px Courier New`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x    = i * fontSize;
      const y    = drops[i] * fontSize;

      // Gradient: bright head, dim tail
      if (drops[i] > 0) {
        ctx.fillStyle = '#00d4ff';
        ctx.fillText(char, x, y);
      }

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5 + Math.random() * 0.5;
    }
  }

  setup();
  setInterval(draw, 55);
  window.addEventListener('resize', setup);
})();


/* ============================================================
   TYPING ANIMATION
   ============================================================ */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const text     = 'SYSTEM ONLINE: WELCOME TO LESEDI\'S PORTFOLIO';
  const speed    = 55;   // ms per character
  let   index    = 0;
  let   started  = false;

  function type() {
    if (index <= text.length) {
      el.textContent = text.slice(0, index);
      index++;
      setTimeout(type, speed + Math.random() * 30);
    }
  }

  // Start after a short delay so page feels intentional
  setTimeout(type, 600);
})();


/* ============================================================
   NAVIGATION — smooth scroll + mobile toggle
   ============================================================ */
(function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      links && links.classList.remove('open');
      toggle && toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function onScroll() {
    const scrollY = window.scrollY + 80;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   SCROLL FADE-IN (Intersection Observer)
   ============================================================ */
(function initFade() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => observer.observe(t));
})();


/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // small delay so the section-entrance animation plays first
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
        }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
})();


/* ============================================================
   CONTACT FORM — client-side validation & feedback
   ============================================================ */
(function initForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFeedback('error', '> ERROR: All fields are required. Please fill in the form completely.');
      return;
    }

    if (!validateEmail(email)) {
      showFeedback('error', '> ERROR: Invalid email address format detected.');
      return;
    }

    // Simulated send (static site — no backend)
    showFeedback('success',
      `> TRANSMISSION SENT — Thanks, ${name}! Message queued. Note: This is a static site. ` +
      `To receive emails, connect a service like Formspree (see README).`
    );

    form.reset();
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFeedback(type, msg) {
    feedback.textContent = msg;
    feedback.className   = type;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();


/* ============================================================
   FAKE TERMINAL BOOT SEQUENCE (hero terminal panel)
   ============================================================ */
(function initBootSequence() {
  const terminalBody = document.getElementById('boot-terminal');
  if (!terminalBody) return;

  const lines = [
    { text: '> INITIALIZING SYSTEM...', delay: 200,  color: 'var(--blue-bright)' },
    { text: '> LOADING PROFILE: LESEDI', delay: 700,  color: 'var(--white)' },
    { text: '> STATUS: FIRST-YEAR IT STUDENT', delay: 1300, color: 'var(--white)' },
    { text: '> PASSION: TECHNOLOGY & CYBERSECURITY', delay: 1900, color: 'var(--white)' },
    { text: '> MODE: LEARNING & BUILDING', delay: 2500, color: 'var(--green-accent)' },
    { text: '> SYSTEM READY. WELCOME.', delay: 3200, color: 'var(--blue-bright)' },
    { text: '▋', delay: 3900, color: 'var(--blue-bright)', blink: true },
  ];

  lines.forEach(({ text, delay, color, blink }) => {
    setTimeout(() => {
      const span = document.createElement('span');
      span.textContent = text;
      span.style.cssText = `
        color: ${color};
        display: block;
        font-size: 0.78rem;
        line-height: 2;
        ${blink ? 'animation: blink-cursor 0.8s step-end infinite;' : ''}
      `;
      terminalBody.appendChild(span);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, delay);
  });
})();
