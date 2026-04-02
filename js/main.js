/* ============================================
   main.js — Shared Utilities
   ============================================ */

// Mobile nav toggle
function toggleNav() {
  const links = document.getElementById('navLinks');
  const toggle = document.getElementById('navToggle');
  links.classList.toggle('open');
  toggle.classList.toggle('active');
}

// Close nav on link click (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const links = document.getElementById('navLinks');
      if (links) links.classList.remove('open');
    });
  });

  // Highlight active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Check auth for protected pages
  const protectedPages = ['dashboard.html', 'notifications.html', 'complaints.html', 'booking.html'];
  if (protectedPages.includes(currentPage)) {
    const user = getUser();
    if (!user) {
      window.location.href = 'login.html';
    }
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Toast notifications
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '<span>✅</span>',
    error: '<span>❌</span>',
    warning: '<span>⚠️</span>',
    info: '<span>ℹ️</span>'
  };

  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-message">${message}</div>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global Loading Overlay
function showLoading(target = document.body) {
  const loader = document.createElement('div');
  loader.className = 'loading-overlay';
  loader.innerHTML = '<div class="loading-spinner"></div>';
  target.appendChild(loader);
  return loader;
}

function hideLoading(loader) {
  if (loader && loader.remove) {
    loader.remove();
  } else {
    document.querySelectorAll('.loading-overlay').forEach(el => el.remove());
  }
}

// Auth helpers
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('hostelHub_user'));
  } catch { return null; }
}

function setUser(user) {
  localStorage.setItem('hostelHub_user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('hostelHub_user');
  showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.href = 'index.html', 500);
}

// Update nav for auth state
document.addEventListener('DOMContentLoaded', () => {
  const user = getUser();
  const navLinks = document.getElementById('navLinks');
  if (user && navLinks) {
    // 1. Hide "Hostels" link if already assigned (it's no longer useful)
    if (user.hostel_id) {
      const hostelsLink = navLinks.querySelector('a[href="selection.html"]');
      if (hostelsLink) hostelsLink.style.display = 'none';
    }

    // 2. Replace Sign In button with Dashboard link
    const signInBtn = navLinks.querySelector('a[href="login.html"]');
    if (signInBtn) {
      signInBtn.outerHTML = `
          <a href="dashboard.html">📊 Dashboard</a>
        `;
    }
  }
});

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
// Global Scroll Reveal Observer
const scrollRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

function initScrollReveal() {
  document.querySelectorAll('.reveal').forEach(el => scrollRevealObserver.observe(el));
}

// Global helper to observe new elements
window.observeReveal = (el) => {
  if (el instanceof HTMLElement) {
    scrollRevealObserver.observe(el);
  } else {
    document.querySelectorAll('.reveal').forEach(e => scrollRevealObserver.observe(e));
  }
};

document.addEventListener('DOMContentLoaded', initScrollReveal);

// ============================================
// Preloader Logic
// ============================================
const Preloader = {
  // Always look up the element live to avoid stale references across page loads
  get el() { return document.getElementById('global-preloader'); },
  get bar() { return document.getElementById('preloader-bar'); },

  init() {
    this.createDOM();
    this.injectLottie();
    this.startProgress(2500);
    this.interceptLinks();

    // Auto-hide after 2.5 seconds on initial page load
    window.addEventListener('load', () => {
      setTimeout(() => this.hide(), 2500);
    });
    // Fallback: hide even if load fires late
    setTimeout(() => this.hide(), 4000);
  },

  createDOM() {
    if (document.getElementById('global-preloader')) return;

    const wrap = document.createElement('div');
    wrap.id = 'global-preloader';
    wrap.innerHTML = `
      <div id="preloader-lottie" class="preloader-lottie"></div>
      <div class="preloader-brand">Hostel<span style="color:#06B6D4">Hub</span></div>
      <div class="preloader-sub">Finding your perfect stay…</div>
      <div class="preloader-bar-wrap">
        <div id="preloader-bar" class="preloader-bar"></div>
      </div>
    `;
    document.body.insertBefore(wrap, document.body.firstChild);
  },

  injectLottie() {
    if (window.lottie) { this.loadAnimation(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js';
    script.onload = () => this.loadAnimation();
    document.head.appendChild(script);
  },

  loadAnimation() {
    const container = document.getElementById('preloader-lottie');
    if (!container || container._lottieLoaded) return;
    container._lottieLoaded = true;

    // Resolve path relative to the site root regardless of current page depth
    const base = window.location.pathname.split('/').slice(0, -1).join('/');
    const jsonPath = base ? base + '/js/preloader.json' : 'js/preloader.json';

    try {
      lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: jsonPath
      });
    } catch (_) {}
  },

  // Animate the progress bar over `duration` ms from 0 → 100%
  startProgress(duration) {
    const bar = this.bar;
    if (!bar) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / duration) * 100, 100);
      if (bar) bar.style.width = pct + '%';
      if (pct < 100) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  show(duration = 600) {
    const wrap = this.el;
    if (!wrap) return;
    wrap.classList.remove('hidden');
    this.startProgress(duration);
  },

  hide() {
    const wrap = this.el;
    if (wrap) wrap.classList.add('hidden');
  },

  interceptLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;
      if (link.hasAttribute('target')) return;
      const isSameOrigin = !link.hostname || link.hostname === window.location.hostname;
      if (isSameOrigin) {
        e.preventDefault();
        this.show(600);
        setTimeout(() => { window.location.href = href; }, 600);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Preloader.init());
