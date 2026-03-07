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
  const protectedPages = ['dashboard.html', 'notifications.html', 'complaints.html'];
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
