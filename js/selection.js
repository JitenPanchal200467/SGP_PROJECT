/* ============================================
   selection.js — Hostel Selection & Comparison
   ============================================ */

// ---- Fallback Demo Hostels (shown when DB is empty or fails) ----
const demoHostels = [
  {
    id: 1001,
    name: 'Sahajanand Hostel',
    description: 'A premium hostel offering a blend of comfort and discipline. Known for its spacious rooms and excellent mess facilities.',
    price: 8750,
    rating: 4.7,
    distance: '0.4 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 25,
    total_rooms: 120,
    warden: 'Mr. Rajesh Patel',
    gender: 'Boys',
    facilities: ['AC/Non-AC Rooms', 'High-Speed WiFi', 'Mess Included', 'Laundry', 'CCTV', 'Gym', 'Study Room'],
    room_types: [
      { type: '3-Sharing AC',     price: 9200, available: 10, desc: 'AC room for 3 with individual desks' },
      { type: '4-Sharing AC',     price: 9200, available: 5,  desc: 'AC room for 4 students' },
      { type: '3-Sharing Non-AC', price: 8750, available: 5,  desc: 'Ventilated room for 3' },
      { type: '4-Sharing Non-AC', price: 8750, available: 5,  desc: 'Spacious Non-AC room for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555854817-5b2337a8545c?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
    ]
  },
  {
    id: 1002,
    name: 'Royal Care',
    description: 'Focuses on providing a home-like atmosphere with personalized care and top-notch security.',
    price: 7670,
    rating: 4.6,
    distance: '0.6 km',
    sharing_type: '3-Sharing',
    available_rooms: 15,
    total_rooms: 80,
    warden: 'Mr. Suresh Shah',
    gender: 'Boys',
    facilities: ['AC/Non-AC Rooms', 'WiFi', 'Mess', 'CCTV', '24x7 Water', 'Housekeeping'],
    room_types: [
      { type: '3-Sharing AC',     price: 8350, available: 10, desc: 'Premium AC room for 3' },
      { type: '3-Sharing Non-AC', price: 7670, available: 5,  desc: 'Comfortable Non-AC room for 3' }
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80'
    ]
  },
  {
    id: 1003,
    name: 'Shreedeep Residency',
    description: 'Modern living with a focus on student well-being and academic environment.',
    price: 8670,
    rating: 4.5,
    distance: '0.3 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 20,
    total_rooms: 100,
    warden: 'Mr. Manoj Varma',
    gender: 'Co-ed',
    facilities: ['AC Rooms', 'WiFi', 'Mess', 'Gym', 'CCTV', 'Laundry', 'Common Lounge'],
    room_types: [
      { type: '3-Sharing AC', price: 8670, available: 12, desc: 'Advanced AC room for 3' },
      { type: '4-Sharing AC', price: 8670, available: 8,  desc: 'Shared AC room for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    ]
  },
  {
    id: 1004,
    name: 'Nisarg Hostel',
    description: 'Premium accommodation known for its tranquil environment and elite facilities.',
    price: 10420,
    rating: 4.9,
    distance: '0.2 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 10,
    total_rooms: 60,
    warden: 'Mr. Arvind Mehta',
    gender: 'Boys',
    facilities: ['Luxury AC Rooms', 'High-Speed Fiber WiFi', 'Gourmet Mess', 'Gym', 'Biometric Access', 'Laundry'],
    room_types: [
      { type: '3-Sharing AC', price: 10420, available: 6, desc: 'Elite AC room for 3' },
      { type: '4-Sharing AC', price: 10420, available: 4, desc: 'Elite AC room for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
    ]
  },
  {
    id: 1005,
    name: 'Darshan Residency',
    description: 'Spacious rooms with a focus on providing diverse options for every budget.',
    price: 9170,
    rating: 4.4,
    distance: '0.7 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 30,
    total_rooms: 150,
    warden: 'Mr. K.P. Jani',
    gender: 'Co-ed',
    facilities: ['AC/Non-AC', 'WiFi', 'Mess', 'Playground', 'CCTV', 'RO Water'],
    room_types: [
      { type: '3-Sharing AC',     price: 9170, available: 10, desc: 'Standard AC for 3' },
      { type: '4-Sharing AC',     price: 9170, available: 10, desc: 'Standard AC for 4' },
      { type: '3-Sharing Non-AC', price: 9590, available: 5,  desc: 'Premium Non-AC for 3' },
      { type: '4-Sharing Non-AC', price: 9590, available: 5,  desc: 'Premium Non-AC for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80'
    ]
  },
  {
    id: 1006,
    name: 'Prince Hostel',
    description: 'Affordable yet modern, catering to the needs of tech-savvy students.',
    price: 7750,
    rating: 4.3,
    distance: '0.8 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 18,
    total_rooms: 90,
    warden: 'Mr. Rahul Rao',
    gender: 'Boys',
    facilities: ['AC/Non-AC', 'WiFi', 'Mess', 'Gaming Zone', 'CCTV', 'Laundry'],
    room_types: [
      { type: '3-Sharing AC',     price: 8000, available: 6, desc: 'AC room for 3' },
      { type: '4-Sharing AC',     price: 8000, available: 4, desc: 'AC room for 4' },
      { type: '3-Sharing Non-AC', price: 7750, available: 4, desc: 'Non-AC for 3' },
      { type: '4-Sharing Non-AC', price: 7750, available: 4, desc: 'Non-AC for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
    ]
  },
  {
    id: 1007,
    name: 'Om Residency',
    description: 'Budget-friendly with no compromise on hygiene and quality of stay.',
    price: 6850,
    rating: 4.2,
    distance: '1.2 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 40,
    total_rooms: 200,
    warden: 'Mr. Vinod Joshi',
    gender: 'Boys',
    facilities: ['AC/Non-AC', 'WiFi', 'Mess', 'Yoga Area', 'CCTV', '24x7 Support'],
    room_types: [
      { type: '3-Sharing AC',     price: 7500, available: 15, desc: 'AC for 3' },
      { type: '4-Sharing AC',     price: 7500, available: 10, desc: 'AC for 4' },
      { type: '3-Sharing Non-AC', price: 6850, available: 10, desc: 'Non-AC for 3' },
      { type: '4-Sharing Non-AC', price: 6850, available: 5,  desc: 'Non-AC for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1555854817-5b2337a8545c?w=800&q=80',
      'https://images.unsplash.com/photo-1503180077967-6be49b3e0f0a?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
    ]
  },
  {
    id: 1008,
    name: 'Patel Hostel',
    description: 'A well-established name in student housing, providing reliable services for decades.',
    price: 8350,
    rating: 4.5,
    distance: '0.5 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 22,
    total_rooms: 110,
    warden: 'Mr. B.K. Patel',
    gender: 'Co-ed',
    facilities: ['AC/Non-AC', 'WiFi', 'Gourmet Mess', 'Laundry', 'CCTV', 'Study Hall'],
    room_types: [
      { type: '3-Sharing AC',     price: 8350, available: 7, desc: 'AC room for 3' },
      { type: '4-Sharing AC',     price: 8350, available: 7, desc: 'AC room for 4' },
      { type: '3-Sharing Non-AC', price: 8850, available: 4, desc: 'Premium Non-AC for 3' },
      { type: '4-Sharing Non-AC', price: 8850, available: 4, desc: 'Premium Non-AC for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
    ]
  },
  {
    id: 1009,
    name: 'Aashirwad Residency',
    description: 'Simple, clean, and quiet — the perfect choice for focused studies.',
    price: 8250,
    rating: 4.4,
    distance: '0.9 km',
    sharing_type: '3-Sharing & 4-Sharing',
    available_rooms: 12,
    total_rooms: 60,
    warden: 'Mrs. Geeta Ben',
    gender: 'Girls',
    facilities: ['AC Rooms', 'WiFi', 'Vegetarian Mess', 'CCTV', 'Garden Area'],
    room_types: [
      { type: '3-Sharing AC', price: 8250, available: 8, desc: 'AC room for 3' },
      { type: '4-Sharing AC', price: 8250, available: 4, desc: 'AC room for 4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80'
    ]
  },
  {
    id: 1010,
    name: 'Pramukh Preet',
    description: 'Modern architecture with student-centric amenities and central location.',
    price: 8350,
    rating: 4.7,
    distance: '0.1 km',
    sharing_type: '3-Sharing',
    available_rooms: 8,
    total_rooms: 40,
    warden: 'Mr. Pankaj Trivedi',
    gender: 'Boys',
    facilities: ['AC Rooms', 'WiFi', 'Mess', 'Gym', 'CCTV', 'Biometric Entry'],
    room_types: [
      { type: '3-Sharing AC', price: 8350, available: 8, desc: 'Elite AC room for 3' }
    ],
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80'
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
      // Exclude specific hostels requested for removal
      const filteredData = data.filter(h => 
        !['Sunrise Hall', 'Greenview Residency', 'Skyline Tower'].includes(h.name)
      );
      
      // Attach demo images & room_types to Supabase records (matched by name)
      const enriched = filteredData.map(h => {
        const demo = demoHostels.find(d => 
          h.name.toLowerCase().includes(d.name.toLowerCase().replace(' hostel', '').replace(' hall', '').replace(' residency', '')) ||
          d.name.toLowerCase().includes(h.name.toLowerCase().replace(' hostel', '').replace(' hall', '').replace(' residency', ''))
        );
        return {
          ...h,
          facilities:  h.facilities  || (demo ? demo.facilities  : []),
          room_types:  h.room_types  || (demo ? demo.room_types  : [{ type: h.sharing_type || '2-Sharing', price: h.price, available: h.available_rooms, desc: '' }]),
          images:      (h.images && h.images.length > 0) ? h.images : (demo ? demo.images : demoHostels[0].images)
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

// Helper: build a cascading fallback image element
function hostelImgTag(imagesArr, alt, eager) {
  // Reliable Unsplash room photo as final guaranteed fallback
  const guaranteed = 'https://images.unsplash.com/photo-1555854817-5b2337a8545c?w=800&q=80';
  const primary    = (imagesArr && imagesArr[0]) ? imagesArr[0] : guaranteed;
  const secondary  = (imagesArr && imagesArr[1]) ? imagesArr[1] : guaranteed;
  const third      = (imagesArr && imagesArr[2]) ? imagesArr[2] : guaranteed;

  // Store fallbacks as data attributes; a global handler manages the chain
  return `<img
    src="${primary}"
    alt="${alt}"
    loading="${eager ? 'eager' : 'lazy'}"
    decoding="async"
    data-fb1="${secondary}"
    data-fb2="${third}"
    data-fb3="${guaranteed}"
    data-attempt="0"
    onload="this.classList.add('loaded')"
    onerror="hostelImgError(this)"
  >`;
}

// Global cascading fallback handler (avoids inline quote-escaping issues)
function hostelImgError(img) {
  const attempt = parseInt(img.dataset.attempt || '0', 10) + 1;
  img.dataset.attempt = attempt;
  const next = img.dataset['fb' + attempt];
  if (next) {
    img.src = next;
  } else {
    img.onerror = null;
    img.classList.add('loaded'); // show even if all fail
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

  grid.innerHTML = hostels.map((h, idx) => {
    const isComparing = compareList.includes(h.id);
    const fewLeft = h.available_rooms <= 10;
    const fromPrice = h.room_types
      ? Math.min(...h.room_types.map(r => r.price))
      : h.price;

    return `
    <div class="hostel-card" data-id="${h.id}" onclick="viewHostel(${h.id})" style="cursor:pointer;">
      <div class="hostel-card-img">
        ${hostelImgTag(h.images, h.name, idx < 4)}
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
              <span class="rating-badge">⭐ ${h.rating} <span class="review-count">(${h.review_count || Math.floor(Math.random() * 50) + 10} reviews)</span></span>
              <span class="dot">·</span>
              <span>${h.distance} from campus</span>
              <span class="dot">·</span>
              <span>${h.sharing_type || '2-Sharing'}</span>
            </div>
          </div>
          <div class="hostel-price">
            <span style="font-size:0.7rem;color:var(--text-muted);display:block;text-align:right;">from</span>
            <span class="price-num">₹${fromPrice.toLocaleString()}</span>
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
    { label: 'Starting Price', key: h => {
        const prices = (h.room_types || []).map(r => `${r.type}: ₹${r.price.toLocaleString()}`).join('<br>');
        return prices || `₹${h.price.toLocaleString()}`;
    }},
    { label: 'Rating',          key: h => `⭐ ${h.rating}` },
    { label: 'Distance',        key: h => h.distance },
    { label: 'Sharing Options', key: h => (h.room_types || []).map(r => r.type).join(', ') || h.sharing_type || '—' },
    { label: 'Gender',          key: h => h.gender || '—' },
    { label: 'Available Rooms', key: h => h.available_rooms + ' rooms' },
    { label: 'Facilities',      key: h => (h.facilities || []).join(', ') },
    { label: 'Warden',          key: h => h.warden || '—' },
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
          <button class="btn btn-primary btn-sm" onclick="viewHostel(${h.id})">View & Book</button>
        </div>`).join('')}
    </div>`;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  fetchHostels();
});
