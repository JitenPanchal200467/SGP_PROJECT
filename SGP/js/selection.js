/* ============================================
   selection.js — Supabase Hostel Selection & Comparison
   ============================================ */

let hostels = []; // Will be populated from DB

// State
let compareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');

async function fetchHostels() {
  try {
    const { data, error } = await supabase.from('hostels').select('*');
    if (error) throw error;
    hostels = data;
    renderHostelCards();
    renderComparison();
  } catch (e) {
    console.error('Error fetching hostels:', e);
    showToast('Failed to load hostels', 'error');
  }
}

function renderHostelCards() {
  const grid = document.getElementById('hostelGrid');
  if (!grid || hostels.length === 0) return;

  grid.innerHTML = hostels.map(h => `
    <div class="card hostel-card" data-id="${h.id}">
      <div class="hostel-card-header">
        <div class="hostel-emoji">${h.image || '🏢'}</div>
        <div class="hostel-meta">
          <span class="badge badge-primary">${h.distance}</span>
          ${h.available_rooms <= 10 ? '<span class="badge badge-danger">Few Left!</span>' : ''}
        </div>
      </div>
      <h3>${h.name}</h3>
      <p class="hostel-desc">${h.description}</p>
      <div class="hostel-stats">
        <div class="stat">
          <span class="stat-label">Price</span>
          <span class="stat-value">₹${h.price.toLocaleString()}/mo</span>
        </div>
        <div class="stat">
          <span class="stat-label">Rating</span>
          <span class="stat-value">⭐ ${h.rating}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Available</span>
          <span class="stat-value">${h.available_rooms} rooms</span>
        </div>
      </div>
      <div class="hostel-facilities">
        ${(h.facilities || []).slice(0, 4).map(f => `<span class="facility-tag">${f}</span>`).join('')}
        ${h.facilities && h.facilities.length > 4 ? `<span class="facility-tag more">+${h.facilities.length - 4}</span>` : ''}
      </div>
      <div class="hostel-actions">
        <button class="btn btn-primary btn-sm" onclick="selectHostel(${h.id})">Book Now</button>
        <button class="btn btn-outline btn-sm compare-btn" id="cmp-${h.id}" 
                onclick="toggleCompare(${h.id})" 
                ${compareList.length >= 3 && !compareList.includes(h.id) ? 'disabled' : ''}>
          ${compareList.includes(h.id) ? '✓ Comparing' : '⚖️ Compare'}
        </button>
      </div>
    </div>
  `).join('');

  updateCompareBar();
}

function toggleCompare(id) {
  const idx = compareList.indexOf(id);
  if (idx > -1) {
    compareList.splice(idx, 1);
  } else {
    if (compareList.length >= 3) {
      showToast('You can compare up to 3 hostels', 'warning');
      return;
    }
    compareList.push(id);
  }
  sessionStorage.setItem('compareList', JSON.stringify(compareList));
  renderHostelCards();
}

function updateCompareBar() {
  const bar = document.getElementById('compareBar');
  if (!bar) return;

  if (compareList.length >= 2) {
    const names = compareList.map(id => hostels.find(h => h.id === id)?.name).join(' vs ');
    bar.innerHTML = `
      <div class="compare-bar-content">
        <span>⚖️ Comparing ${compareList.length} hostels: <strong>${names}</strong></span>
        <div class="compare-bar-actions">
          <a href="comparison.html" class="btn btn-accent btn-sm">View Comparison</a>
          <button class="btn btn-secondary btn-sm" onclick="clearCompare()">Clear</button>
        </div>
      </div>
    `;
    bar.classList.add('visible');
  } else {
    bar.classList.remove('visible');
  }
}

function clearCompare() {
  compareList = [];
  sessionStorage.setItem('compareList', JSON.stringify(compareList));
  renderHostelCards();
}

function selectHostel(id) {
  const hostel = hostels.find(h => h.id === id);
  if (hostel) {
    sessionStorage.setItem('selectedHostel', JSON.stringify(hostel));
    window.location.href = 'login.html';
  }
}

// Comparison page
function renderComparison() {
  const container = document.getElementById('comparisonTable');
  if (!container) return;

  if (compareList.length < 2) {
    container.innerHTML = '<p class="text-center text-muted" style="padding: 3rem;">Please select at least 2 hostels to compare. <a href="selection.html">Go back →</a></p>';
    return;
  }

  const selected = compareList.map(id => hostels.find(h => h.id === id)).filter(Boolean);
  const fields = [
    { label: 'Price / Month', key: h => `₹${h.price.toLocaleString()}` },
    { label: 'Rating', key: h => `⭐ ${h.rating}` },
    { label: 'Distance', key: h => h.distance },
    { label: 'Room Types', key: h => 'Available' }, // Not in DB yet but could be
    { label: 'Total Rooms', key: h => h.total_rooms },
    { label: 'Available', key: h => h.available_rooms + ' rooms' },
    { label: 'Facilities', key: h => (h.facilities || []).join(', ') },
    { label: 'Warden', key: h => h.warden },
  ];

  container.innerHTML = `
    <div class="comparison-grid" style="grid-template-columns: 180px repeat(${selected.length}, 1fr);">
      <div class="comp-header"></div>
      ${selected.map(h => `
        <div class="comp-header">
          <div class="comp-emoji">${h.image || '🏢'}</div>
          <h3>${h.name}</h3>
        </div>
      `).join('')}
      ${fields.map(f => `
        <div class="comp-label">${f.label}</div>
        ${selected.map(h => `<div class="comp-value">${f.key(h)}</div>`).join('')}
      `).join('')}
      <div class="comp-label">Action</div>
      ${selected.map(h => `
        <div class="comp-value">
          <button class="btn btn-primary btn-sm" onclick="selectHostel(${h.id})">Select This</button>
        </div>
      `).join('')}
    </div>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchHostels();
});
