/* ============================================
   auth.js — Supabase Authentication
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Sync any pending booking from session storage to Supabase
    async function syncPendingBooking(user) {
        const pending = sessionStorage.getItem('selectedHostel');
        if (!pending) return;

        try {
            const h = JSON.parse(pending);
            if (h.id > 1000) return; // Skip demo hostels for DB sync

            await _supabase
                .from('users')
                .update({
                    hostel_id: h.id,
                    room_number: 'A-' + (100 + Math.floor(Math.random() * 900))
                })
                .eq('id', user.id);

            // Note: dashboard.js will re-fetch this on load, so we don't need to update local user here
        } catch (e) {
            console.error('Pending sync failed:', e);
        }
    }

    // Login handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            const loader = showLoading();
            try {
                // 1. Sign in via Supabase Auth
                const { data: authData, error: authError } = await _supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (authError) throw authError;

                // 2. Fetch profile from our 'users' table
                const profile = await DB.query('users', { id: authData.user.id });
                if (!profile || profile.length === 0) throw new Error('Profile not found');

                const userData = profile[0];
                await syncPendingBooking(userData);
                setUser(userData);

                showToast(`Welcome back, ${userData.name}!`, 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 800);

            } catch (error) {
                console.error('Login error:', error);
                showToast(error.message || 'Invalid login credentials', 'error');
            } finally {
                hideLoading(loader);
            }
        });
    }

    // Register handler
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const role = document.getElementById('regRole').value;
            const collegeId = document.getElementById('regCollegeId').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;

            if (!name || !email || !phone || !password) {
                showToast('Please fill in all required fields', 'error');
                return;
            }

            if (password !== confirm) {
                showToast('Passwords do not match', 'error');
                return;
            }

            const loader = showLoading();
            try {
                // 1. Sign up via Supabase Auth
                const { data: authData, error: authError } = await _supabase.auth.signUp({
                    email,
                    password
                });

                if (authError) throw authError;

                if (!authData.user) {
                    showToast('Check your email for confirmation link!', 'info');
                    return;
                }

                // 2. Create profile in our 'users' table
                const newUser = {
                    id: authData.user.id,
                    email,
                    name,
                    phone,
                    role,
                    college_id: collegeId
                };

                await DB.insert('users', newUser);

                await syncPendingBooking(newUser);
                setUser(newUser);
                showToast('Registration successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 800);

            } catch (error) {
                console.error('Registration error:', error);
                showToast(error.message || 'Registration failed', 'error');
            } finally {
                hideLoading(loader);
            }
        });
    }
});
