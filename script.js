(function () {
  'use strict';

  // ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Theme toggle ----------
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }

  const storedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  // ---------- Sticky header on scroll ----------
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // ---------- Add numbers to nav links ----------
  document.querySelectorAll('.nav-link').forEach((link, i) => {
    link.innerHTML = '<span>0' + (i + 1) + '.</span>' + link.textContent.trim();
  });

  // ---------- Projects data ----------
  const projects = [
    {
      title: 'Hospital AI Assistant for X-ray Analysis',
      description: 'AI-powered web application that analyzes X-ray images to assist medical diagnostics. Features image upload, automated analysis, sample generation, and a clean reporting interface.',
      tech: ['Python', 'Flask', 'Machine Learning', 'OpenCV'],
      icon: 'fa-solid fa-x-ray',
      links: {
        github: 'https://drive.google.com/drive/u/0/folders/1oYZvlz_HzB0Rhpnb8evOV8VDEdr06IuR',
        demo: 'https://rakshithareddy28.pythonanywhere.com'
      }
    },
    {
      title: 'Dark Fashions',
      description: 'A fashion e-commerce web application with product browsing, cart, and checkout flows. Built with a Flask backend and a responsive, dark-themed front-end.',
      tech: ['Python', 'Flask', 'HTML', 'CSS'],
      icon: 'fa-solid fa-shirt',
      links: {
        github: 'https://drive.google.com/drive/folders/1vA9Y2Ss8bUz9Kc0VBe57U_wwUhKmp1xi',
        demo: 'https://dark-fashions.onrender.com'
      }
    }
  ];

  // ---------- Skills data ----------
  const skills = [
    { name: 'Python', icon: 'fa-brands fa-python' },
    { name: 'SQL', icon: 'fa-solid fa-database' },
    { name: 'Scikit-learn', icon: 'fa-solid fa-brain' },
    { name: 'TensorFlow / Keras', icon: 'fa-solid fa-microchip' },
    { name: 'Pandas / NumPy', icon: 'fa-solid fa-table' },
    { name: 'Matplotlib / Seaborn', icon: 'fa-solid fa-chart-line' },
    { name: 'Power BI', icon: 'fa-solid fa-chart-column' },
    { name: 'Git & GitHub', icon: 'fa-brands fa-git-alt' },
    { name: 'VS Code', icon: 'fa-solid fa-code' },
    { name: 'MySQL', icon: 'fa-solid fa-database' },
    { name: 'Jupyter Notebook', icon: 'fa-brands fa-python' },
    { name: 'MS Excel', icon: 'fa-solid fa-file-excel' }
  ];

  // ---------- Render projects ----------
  const projectsGrid = document.getElementById('projects-grid');
  projectsGrid.innerHTML = projects.map((p) => {
    const projectUrl = (p.links.demo || p.links.github).replace(/"/g, '&quot;');
    return (
      '<article class="project-card reveal" data-url="' + projectUrl + '">' +
        '<div class="project-header">' +
          '<span class="project-icon"><i class="' + p.icon + '"></i></span>' +
        '</div>' +
        '<h3 class="project-title">' + p.title + '</h3>' +
        '<p class="project-description">' + p.description + '</p>' +
        '<p class="project-tech">' + p.tech.join(' &#8231; ') + '</p>' +
        '<a href="' + projectUrl + '" class="btn btn-outline project-btn" target="_blank" rel="noopener">View Project <i class="fas fa-arrow-right"></i></a>' +
      '</article>'
    );
  }).join('');

  // Make the entire project card clickable
  projectsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card || e.target.closest('a')) return;
    window.open(card.dataset.url, '_blank', 'noopener');
  });

  // ---------- Render skills ----------
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = skills.map((s) =>
    '<div class="skill-item reveal">' +
      '<span class="skill-icon"><i class="' + s.icon + '"></i></span>' +
      '<span class="skill-name">' + s.name + '</span>' +
    '</div>'
  ).join('');

  // ---------- Reveal on scroll ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  document.querySelectorAll('.section-title').forEach((el) => {
    el.classList.add('visible');
  });

  // ---------- Contact form ----------
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      status.textContent = 'Please fill in all fields with a valid email.';
      status.classList.add('error');
      return;
    }

    // Demo: send with mailto fallback. Replace with your backend/form service.
    const mailto = 'mailto:rakshithareddy283@gmail.com?subject=' +
      encodeURIComponent('Portfolio contact from ' + name) +
      '&body=' + encodeURIComponent(message + '\n\nReply to: ' + email);

    status.classList.remove('error');
    status.textContent = 'Opening your email client...';
    window.location.href = mailto;
  });
})();