/* ============================================
   selection.js — Hostel Selection & Comparison
   ============================================ */

// ---- Fallback Demo Hostels (shown when DB is empty or fails) ----
const demoHostels = [
  {
    id: 1001,
    name: 'Sunrise Hall',
    description: 'A bright, modern hostel with spacious rooms, landscaped gardens, and a vibrant community. Perfect for first-year students seeking comfort and convenience close to campus.',
    price: 8500,
    rating: 4.8,
    distance: '0.3 km',
    sharing_type: '2-Sharing & 3-Sharing',
    available_rooms: 15,
    total_rooms: 80,
    warden: 'Mr. Sharma',
    gender: 'Boys',
    facilities: ['AC Rooms', 'High-Speed WiFi', 'Mess Included', 'Laundry', 'CCTV', 'Gym', 'Study Room', '24×7 Water'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1008,
    name: 'Skyline Tower',
    description: 'A state-of-the-art high-rise hostel offering stunning campus views, modern rooms, and top-tier amenities. The premium choice for students who want the best.',
    price: 10000,
    rating: 4.8,
    distance: '0.1 km',
    sharing_type: '2-Sharing',
    available_rooms: 6,
    total_rooms: 60,
    warden: 'Mr. Kulkarni',
    gender: 'Co-ed',
    facilities: ['AC Rooms', 'High-Speed WiFi', 'Gym', 'Cafeteria', 'CCTV', 'Biometric Access', 'Rooftop Terrace', 'Laundry'],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1002,
    name: 'Greenview Residency',
    description: 'Set amidst lush greenery, this eco-friendly hostel combines nature with modern amenities. Known for its home-like atmosphere and excellent mess food.',
    price: 7200,
    rating: 4.6,
    distance: '0.5 km',
    sharing_type: '2-Sharing & 4-Sharing',
    available_rooms: 8,
    total_rooms: 60,
    warden: 'Mrs. Patel',
    gender: 'Girls',
    facilities: ['WiFi', 'Mess Included', 'Garden Area', 'CCTV', 'Common Room', 'RO Water', 'Warden On-site', 'Visitor Room'],
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1003,
    name: "Scholar's Den",
    description: 'Designed specifically for serious students — quiet study zones, fast internet, and focused environment. No distractions, just results.',
    price: 6800,
    rating: 4.5,
    distance: '0.7 km',
    sharing_type: '3-Sharing',
    available_rooms: 22,
    total_rooms: 100,
    warden: 'Dr. Mehta',
    gender: 'Co-ed',
    facilities: ['24×7 WiFi', 'Study Halls', 'Mess Included', 'Library Access', 'Printing Room', 'CCTV', 'Backup Power', 'AC Common Areas'],
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1004,
    name: 'The Urban Campus',
    description: 'A premium urban hostel with hotel-like finishes, rooftop terrace, and co-working spaces. Best suited for senior students and postgrads who want a modern lifestyle.',
    price: 12000,
    rating: 4.9,
    distance: '1.0 km',
    sharing_type: 'Single & 2-Sharing',
    available_rooms: 5,
    total_rooms: 50,
    warden: 'Mr. Kapoor',
    gender: 'Boys',
    facilities: ['AC Rooms', 'Rooftop Lounge', 'High-Speed Fiber', 'Smart TV', 'Gym', 'Laundry', 'Mess', 'CCTV', 'Biometric Access'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1005,
    name: 'Azure Residency',
    description: "A safe, well-maintained girls' hostel with strict security and a warm community feel. All meals included, with flexible timing and hygienic cooking standards.",
    price: 7800,
    rating: 4.7,
    distance: '0.4 km',
    sharing_type: '2-Sharing & 3-Sharing',
    available_rooms: 12,
    total_rooms: 70,
    warden: 'Mrs. Desai',
    gender: 'Girls',
    facilities: ['WiFi', 'All Meals Included', 'CCTV', 'Biometric Entry', 'Indoor Games', 'Hot Water', 'Laundry', 'Parent Visitor Room'],
    images: [
      'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1006,
    name: 'Campus View Block',
    description: 'Budget-friendly hostel with great campus connectivity. The perfect option for students looking for clean, affordable accommodation without compromising on essentials.',
    price: 5500,
    rating: 4.3,
    distance: '0.2 km',
    sharing_type: '4-Sharing & 6-Sharing',
    available_rooms: 30,
    total_rooms: 120,
    warden: 'Mr. Rao',
    gender: 'Co-ed',
    facilities: ['WiFi', 'Mess Included', 'CCTV', 'Common Room', 'Backup Power', 'RO Water', '24×7 Security', 'Laundry'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555854817-5b2337a8545c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503180077967-6be49b3e0f0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 1007,
    name: 'Maple Block',
    description: 'A well-organized 3-sharing hostel with dedicated study desks in each room and a peaceful environment ideal for engineering students.',
    price: 6200,
    rating: 4.4,
    distance: '0.6 km',
    sharing_type: '3-Sharing',
    available_rooms: 18,
    total_rooms: 90,
    warden: 'Mr. Verma',
    gender: 'Boys',
    facilities: ['WiFi', 'Mess Included', 'CCTV', 'Study Desk per Bed', 'Laundry', 'RO Water', 'Common Room', 'Backup Power'],
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    ]
  }
];

let hostels = [];
let compareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');

async function fetchHostels() {
  const grid = document.getElementById('hostelGrid');
  if (grid) renderSkeletons(grid, 6);

  try {
    const data = await DB.query('hostels');

    if (data && data.length > 0) {
      // Attach demo images to Supabase records (matched by name)
      const enriched = data.map(h => {
        const demo = demoHostels.find(d => d.name === h.name);
        return {
          ...h,
          facilities: h.facilities || (demo ? demo.facilities : []),
          images: demo ? demo.images : [demoHostels[0].images[0]]
        };
      });
      // Append demo hostels whose names are NOT already in Supabase
      const supabaseNames = new Set(data.map(h => h.name));
      const extras = demoHostels.filter(d => !supabaseNames.has(d.name));
      hostels = [...enriched, ...extras];
    } else {
      hostels = demoHostels;
    }
  } catch (e) {
    console.warn('DB error — showing demo hostels.');
    hostels = demoHostels;
    if (typeof showToast === 'function') showToast('Using offline demo data', 'info');
  }
  renderHostelCards();
  renderComparison();
}

function renderSkeletons(container, count) {
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="hostel-card skeleton-card">
      <div class="skeleton" style="height: 200px; border-radius: 0;"></div>
      <div class="hostel-card-body">
        <div class="skeleton" style="height: 24px; width: 60%; margin-bottom: 12px;"></div>
        <div class="skeleton" style="height: 16px; width: 40%; margin-bottom: 20px;"></div>
        <div class="skeleton" style="height: 60px; width: 100%; margin-bottom: 20px;"></div>
        <div class="skeleton" style="height: 36px; width: 120px;"></div>
      </div>
    </div>
  `).join('');
}

// ---- Navigate to Detail Page ----
function viewHostel(id) {
  const hostel = hostels.find(h => h.id === id);
  if (hostel) {
    sessionStorage.setItem('viewHostel', JSON.stringify(hostel));
    window.location.href = 'hostel-detail.html';
  }
}

// ---- Render Cards ----
function renderHostelCards() {
  const grid = document.getElementById('hostelGrid');
  if (!grid) return;

  if (hostels.length === 0) {
    grid.innerHTML = '<p class="text-center text-muted" style="padding:3rem; grid-column:1/-1;">No hostels available right now.</p>';
    return;
  }

  grid.innerHTML = hostels.map(h => {
    const isComparing = compareList.includes(h.id);
    const coverImg = (h.images && h.images[0]) || 'https://images.unsplash.com/photo-1555854817-5b2337a8545c?auto=format&fit=crop&w=800&q=80';
    const fewLeft = h.available_rooms <= 10;

    return `
    <div class="hostel-card" data-id="${h.id}" onclick="viewHostel(${h.id})" style="cursor:pointer;">
      <div class="hostel-card-img">
        <img src="${coverImg}" alt="${h.name}" loading="lazy">
        <div class="hostel-card-badges">
          ${fewLeft ? '<span class="hbadge hbadge-warn">Few Left</span>' : ''}
          <span class="hbadge hbadge-info">${h.gender || 'Co-ed'}</span>
        </div>
      </div>
      <div class="hostel-card-body">
        <div class="hostel-card-top">
          <div>
            <h3>${h.name}</h3>
            <div class="hostel-meta-row">
              <span>⭐ ${h.rating}</span>
              <span class="dot">·</span>
              <span>${h.distance} from campus</span>
              <span class="dot">·</span>
              <span>${h.sharing_type || '2-Sharing'}</span>
            </div>
          </div>
          <div class="hostel-price">
            <span class="price-num">₹${h.price.toLocaleString()}</span>
            <span class="price-mo">/mo</span>
          </div>
        </div>
        <p class="hostel-card-desc">${h.description}</p>
        <div class="hostel-tags">
          ${(h.facilities || []).slice(0, 4).map(f => `<span class="htag">${f}</span>`).join('')}
        </div>
        <div class="hostel-card-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary btn-sm" onclick="viewHostel(${h.id})">View Details</button>
          <button class="btn ${isComparing ? 'btn-accent' : 'btn-outline'} btn-sm compare-btn btn-icon" 
                  id="cmp-${h.id}" 
                  onclick="toggleCompare(${h.id})"
                  ${compareList.length >= 3 && !isComparing ? 'disabled' : ''}
                  title="${isComparing ? 'Remove from comparison' : 'Add to comparison'}">
            ${isComparing ? '✓' : '⚖'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');

  if (window.observeReveal) window.observeReveal();
  updateCompareBar();
}

// ---- Compare ----
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
    const names = compareList.map(id => hostels.find(h => h.id === id)?.name).filter(Boolean).join(' vs ');
    bar.innerHTML = `
      <div class="compare-bar-content">
        <span>⚖ Comparing <strong>${compareList.length}</strong> hostels: ${names}</span>
        <div class="compare-bar-actions">
          <a href="comparison.html" class="btn btn-accent btn-sm">View Comparison</a>
          <button class="btn btn-secondary btn-sm" onclick="clearCompare()">Clear</button>
        </div>
      </div>`;
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

// ---- Comparison Page ----
function renderComparison() {
  const container = document.getElementById('comparisonTable');
  if (!container) return;

  if (compareList.length < 2) {
    container.innerHTML = '<p class="text-center text-muted" style="padding:3rem;">Select at least 2 hostels to compare. <a href="selection.html">Browse Hostels →</a></p>';
    return;
  }

  const selected = compareList.map(id => hostels.find(h => h.id === id)).filter(Boolean);
  const fields = [
    { label: 'Price / Month', key: h => `₹${h.price.toLocaleString()}` },
    { label: 'Rating', key: h => `⭐ ${h.rating}` },
    { label: 'Distance', key: h => h.distance },
    { label: 'Sharing Type', key: h => h.sharing_type || '—' },
    { label: 'Gender', key: h => h.gender || '—' },
    { label: 'Available Rooms', key: h => h.available_rooms + ' rooms' },
    { label: 'Facilities', key: h => (h.facilities || []).join(', ') },
    { label: 'Warden', key: h => h.warden || '—' },
  ];

  container.innerHTML = `
    <div class="comparison-grid" style="grid-template-columns: 180px repeat(${selected.length}, 1fr);">
      <div class="comp-header"></div>
      ${selected.map(h => `
        <div class="comp-header">
          <img src="${(h.images && h.images[0]) || ''}" alt="${h.name}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">
          <h3>${h.name}</h3>
        </div>`).join('')}
      ${fields.map(f => `
        <div class="comp-label">${f.label}</div>
        ${selected.map(h => `<div class="comp-value">${f.key(h)}</div>`).join('')}`).join('')}
      <div class="comp-label">Action</div>
      ${selected.map(h => `
        <div class="comp-value">
          <button class="btn btn-primary btn-sm" onclick="selectHostel(${h.id})">Select This</button>
        </div>`).join('')}
    </div>`;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  fetchHostels();
});
