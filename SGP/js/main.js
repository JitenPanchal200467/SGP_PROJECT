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
      navbar.style.background = 'rgba(11, 14, 23, 0.95)';
    } else {
      navbar.style.background = 'rgba(11, 14, 23, 0.8)';
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
  toast.className = 'toast';
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || icons.info} ${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
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
    // Replace Sign In button with Dashboard link + user name
    const signInBtn = navLinks.querySelector('a[href="login.html"]');
    if (signInBtn) {
      signInBtn.href = 'dashboard.html';
      signInBtn.textContent = '📊 Dashboard';
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
