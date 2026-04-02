/* ============================================
   dashboard.js — Supabase Dashboard Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  let user = getUser();
  if (!user) return;

  // ---- 1. Sync User Profile from Supabase ----
  try {
    const profile = await DB.query('users', { id: user.id });

    if (profile && profile.length > 0) {
      const p = profile[0];
      // Merge live data into our local user object
      user = {
        ...user,
        name: p.name,
        phone: p.phone,
        college_id: p.college_id,
        avatar_url: p.avatar_url,
        hostel_id: p.hostel_id,
        room_number: p.room_number,
        // Added new fields for sync
        department: p.department,
        institute: p.institute,
        parent_name: p.parent_name,
        parent_phone: p.parent_phone,
        parent_mobile: p.parent_mobile,
        roommate_name: p.roommate_name,
        roommate_phone: p.roommate_phone
      };

      // If we have a hostel ID, fetch its name
      if (p.hostel_id) {
        const hData = await DB.query('hostels', { id: p.hostel_id });
        if (hData && hData.length > 0) user.hostel = hData[0].name;
      }

      setUser(user);
    }
  } catch (e) {
    console.warn('Profile sync failed, using cached data.');
  }

  // ---- 2. Populate UI ----
  updateDashboardUI(user);

  // ---- 3. Init Page Logic ----
  await initAttendance();
  initMessMenu();
  await initDashboardStats();
});

function updateDashboardUI(user) {
  const nameEl = document.getElementById('userName');
  const roleEl = document.getElementById('userRole');
  const hostelEl = document.getElementById('userHostel');
  const roomEl = document.getElementById('userRoom');

  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role === 'parent' ? '👨‍👩‍👧 Parent' : '🎓 Student';

  // Avatar Support
  const avatarElements = document.querySelectorAll('.user-avatar');
  avatarElements.forEach(el => {
    if (user.avatar_url) {
      el.innerHTML = `<img src="${user.avatar_url}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    } else {
      el.textContent = user.name ? user.name.charAt(0).toUpperCase() : '👤';
    }
  });

  // Header dynamic welcome
  const headerNamePlaceholder = document.querySelector('.dash-header h1 .text-gradient');
  if (headerNamePlaceholder) headerNamePlaceholder.textContent = user.name.split(' ')[0];

  // Resolve hostel name for UI
  let displayHostel = user.hostel || 'Not Assigned';
  const selectedHostelRaw = sessionStorage.getItem('selectedHostel');
  if (displayHostel === 'Not Assigned' && selectedHostelRaw) {
    try {
      const selected = JSON.parse(selectedHostelRaw);
      displayHostel = selected.name;
    } catch (e) { }
  }

  if (hostelEl) hostelEl.textContent = displayHostel;
  if (roomEl) roomEl.textContent = user.room_number ? 'Room ' + user.room_number : 'Not Assigned';

  // New fields population
  const deptEl = document.getElementById('userDept');
  const chipDept = document.getElementById('chipDept');
  if (deptEl && user.department) {
    deptEl.textContent = user.department;
    if (chipDept) chipDept.style.display = 'flex';
  }

  // Academic Records section
  const recDept = document.getElementById('recDept');
  const recInst = document.getElementById('recInst');
  const recCollege = document.getElementById('recCollege');
  if (recDept) recDept.textContent = user.department || '—';
  if (recInst) recInst.textContent = user.institute || '—';
  if (recCollege) recCollege.textContent = user.college_id || '—';

  // Emergency Contacts section
  const pName = document.getElementById('recParentName');
  const pPhone = document.getElementById('recParentPhone');
  const pMobile = document.getElementById('recParentMobile');

  if (pName) pName.textContent = user.parent_name || '—';
  if (pPhone) pPhone.innerHTML = user.parent_phone ? `<a href="tel:${user.parent_phone}" style="color:var(--text-muted); text-decoration:none;">📞 ${user.parent_phone}</a>` : '';
  if (pMobile) pMobile.innerHTML = user.parent_mobile ? `<a href="tel:${user.parent_mobile}" style="color:var(--primary-light); text-decoration:none;">📱 ${user.parent_mobile}</a>` : '';

  // ---- Automatic Roommate Discovery ----
  const roommateList = document.getElementById('roommateList');
  if (roommateList && user.hostel_id && user.room_number) {
    (async () => {
      try {
        const roommates = await _supabase
          .from('users')
          .select('name, phone')
          .eq('hostel_id', user.hostel_id)
          .eq('room_number', user.room_number)
          .neq('id', user.id); // Exclude self

        if (roommates.error) throw roommates.error;

        if (!roommates.data || roommates.data.length === 0) {
          roommateList.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-muted);">No roommates assigned yet</div>';
        } else {
          roommateList.innerHTML = roommates.data.map(r => `
            <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 8px; border-top: 1px solid var(--border); padding-top: 8px;">
              <strong style="color: var(--text-primary); font-size: 0.88rem;">${r.name}</strong>
              ${r.phone ? `<a href="tel:${r.phone}" style="color:var(--primary-light); text-decoration:none; font-size: 0.82rem;">📞 ${r.phone}</a>` : ''}
            </div>
          `).join('');
        }
      } catch (e) {
        console.error('Roommate discovery error:', e);
        roommateList.innerHTML = '<div style="font-size: 0.85rem; color: var(--danger);">Failed to load roommates</div>';
      }
    })();
  } else if (roommateList) {
    roommateList.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-muted);">Room not assigned</div>';
  }
}

// ---- Attendance Tracking ----
async function initAttendance() {
  const statusEl = document.getElementById('attendanceStatus');
  const toggleBtn = document.getElementById('attendanceToggle');
  const logList = document.getElementById('attendanceLog');
  const user = getUser();

  if (!statusEl || !toggleBtn || !user) return;

  // Fetch logs from Supabase
  async function fetchLogs() {
    const { data, error } = await _supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .order('time', { ascending: false });

    if (error) {
      console.error('Error fetching logs:', error);
      return [];
    }
    return data;
  }

  let logs = await fetchLogs();
  let isIn = logs.length > 0 ? logs[0].type === 'in' : true;

  function updateUI(currentLogs) {
    statusEl.innerHTML = isIn
      ? '<span class="status-dot online"></span> Currently In Campus'
      : '<span class="status-dot away"></span> Currently Outside';
    toggleBtn.textContent = isIn ? '🚪 Mark Going Out' : '🏠 Mark Coming Back';
    toggleBtn.className = isIn ? 'btn btn-secondary' : 'btn btn-accent';

    if (logList) {
      const today = new Date().toDateString();
      const todayLogs = currentLogs.filter(l => new Date(l.time).toDateString() === today);

      logList.innerHTML = todayLogs.length === 0
        ? '<li class="text-muted" style="padding: 1rem; text-align:center;">No activity today</li>'
        : todayLogs.map(l => `
          <li class="log-item">
            <span class="log-icon">${l.type === 'in' ? '🏠' : '🚪'}</span>
            <span class="log-text">${l.type === 'in' ? 'Checked In' : 'Went Out'}</span>
            <span class="log-time">${new Date(l.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </li>
        `).join('');
    }
  }

  toggleBtn.addEventListener('click', async () => {
    const newType = isIn ? 'out' : 'in';

    try {
      await DB.insert('attendance', { user_id: user.id, type: newType });

      isIn = !isIn;
      const updatedLogs = await fetchLogs();
      updateUI(updatedLogs);
      showToast(isIn ? 'Marked as IN campus' : 'Marked as going OUT', 'success');
      initDashboardStats(); // Refresh stats
    } catch (error) {
      // showToast is already called by DB wrapper
    }
  });

  updateUI(logs);
}

// ---- Mess Menu (Static for now, but could be DB-driven) ----
const messData = {
  monday: { breakfast: 'Poha, Tea, Banana', lunch: 'Dal Rice, Chapati, Salad, Curd', dinner: 'Paneer Butter Masala, Naan, Rice', special: 'Gulab Jamun' },
  tuesday: { breakfast: 'Idli Sambar, Coffee', lunch: 'Rajma Chawal, Papad, Buttermilk', dinner: 'Chole Bhature, Rice, Raita', special: 'Ice Cream' },
  wednesday: { breakfast: 'Bread Butter, Omelette, Juice', lunch: 'Kadhi Chawal, Chapati, Pickle', dinner: 'Veg Biryani, Raita, Salad', special: 'Jalebi' },
  thursday: { breakfast: 'Upma, Tea, Fruits', lunch: 'Sambar Rice, Chapati, Curd', dinner: 'Aloo Gobi, Dal, Chapati, Rice', special: 'Kheer' },
  friday: { breakfast: 'Paratha, Curd, Tea', lunch: 'Pav Bhaji, Rice, Salad', dinner: 'Mixed Veg, Dal Fry, Chapati', special: 'Rasmalai' },
  saturday: { breakfast: 'Dosa, Chutney, Coffee', lunch: 'Pulao, Raita, Papad', dinner: 'Noodles, Manchurian, Soup', special: 'Pastry' },
  sunday: { breakfast: 'Chole Bhature, Lassi', lunch: 'Special Thali', dinner: 'Pasta, Garlic Bread, Soup', special: 'Brownie with Ice Cream' }
};

const mealTimings = {
  breakfast: '7:30 AM – 9:30 AM',
  lunch: '12:30 PM – 2:30 PM',
  dinner: '7:30 PM – 9:30 PM'
};

function initMessMenu() {
  const menuContainer = document.getElementById('messMenu');
  const specialEl = document.getElementById('todaySpecial');
  if (!menuContainer) return;

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const todayMenu = messData[today];

  menuContainer.innerHTML = `
    <div class="mess-meals">
      <div class="meal-card">
        <div class="meal-header">
          <span class="meal-icon">🌅</span>
          <div>
            <h4>Breakfast</h4>
            <span class="meal-time">${mealTimings.breakfast}</span>
          </div>
        </div>
        <p>${todayMenu.breakfast}</p>
      </div>
      <div class="meal-card">
        <div class="meal-header">
          <span class="meal-icon">☀️</span>
          <div>
            <h4>Lunch</h4>
            <span class="meal-time">${mealTimings.lunch}</span>
          </div>
        </div>
        <p>${todayMenu.lunch}</p>
      </div>
      <div class="meal-card">
        <div class="meal-header">
          <span class="meal-icon">🌙</span>
          <div>
            <h4>Dinner</h4>
            <span class="meal-time">${mealTimings.dinner}</span>
          </div>
        </div>
        <p>${todayMenu.dinner}</p>
      </div>
    </div>
  `;

  if (specialEl) {
    specialEl.innerHTML = `
      <div class="special-content">
        <span class="special-icon">⭐</span>
        <div>
          <span class="special-label">Today's Special</span>
          <strong>${todayMenu.special}</strong>
        </div>
      </div>
    `;
  }
}

// ---- Dashboard Stats ----
async function initDashboardStats() {
  const user = getUser();
  if (!user) return;

  const logs = await DB.query('attendance', { user_id: user.id });

  const today = new Date().toDateString();
  const todayLogs = logs.filter(l => new Date(l.time).toDateString() === today);

  const totalDaysEl = document.getElementById('statTotalDays');
  const todayCountEl = document.getElementById('statTodayMoves');
  const lastActionEl = document.getElementById('statLastAction');

  // Calculate days since registration or mock
  const regDate = new Date(user.created_at || Date.now() - 5184000000);
  const diffDays = Math.floor((new Date() - regDate) / (1000 * 60 * 60 * 24));

  if (totalDaysEl) totalDaysEl.textContent = diffDays;
  if (todayCountEl) todayCountEl.textContent = todayLogs.length;
  if (lastActionEl) {
    const last = todayLogs[todayLogs.length - 1];
    lastActionEl.textContent = last
      ? new Date(last.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      : '--:--';
  }
}
