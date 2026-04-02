/* ============================================
   auth-booking.js — Auth for Book Now flow
   After login/register, completes the booking
   and redirects to dashboard.html
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Sync pending booking after auth
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
        } catch (e) {
            console.error('Pending booking sync failed:', e);
        }
    }

    // ---- LOGIN FORM ----
    const loginFormBooking = document.getElementById('loginFormBooking');
    if (loginFormBooking) {
        loginFormBooking.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('bookLoginEmail').value.trim();
            const password = document.getElementById('bookLoginPassword').value;

            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            const btn = document.getElementById('loginBookBtn');
            btn.disabled = true;
            btn.textContent = 'Signing in…';

            const loader = showLoading();
            try {
                // 1. Sign in via Supabase Auth
                const { data: authData, error: authError } = await _supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (authError) throw authError;

                // 2. Fetch profile
                const profile = await DB.query('users', { id: authData.user.id });
                if (!profile || profile.length === 0) throw new Error('Profile not found');

                const userData = profile[0];

                // 3. Sync booking then save user
                await syncPendingBooking(userData);
                setUser(userData);

                showToast(`Welcome back, ${userData.name}! Redirecting to checkout…`, 'success');
                setTimeout(() => window.location.href = 'booking.html', 900);

            } catch (error) {
                console.error('Booking login error:', error);
                showToast(error.message || 'Invalid login credentials', 'error');
                btn.disabled = false;
                btn.textContent = 'Sign In & Complete Booking →';
            } finally {
                hideLoading(loader);
            }
        });
    }

    // ---- REGISTER FORM ----
    const registerFormBooking = document.getElementById('registerFormBooking');
    if (registerFormBooking) {
        registerFormBooking.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('bRegName').value.trim();
            const email = document.getElementById('bRegEmail').value.trim();
            const phone = document.getElementById('bRegPhone').value.trim();
            const role = document.getElementById('bRegRole').value;
            const collegeId = document.getElementById('bRegCollegeId').value.trim();
            const password = document.getElementById('bRegPassword').value;
            const confirm = document.getElementById('bRegConfirm').value;

            if (!name || !email || !phone || !password) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            if (password !== confirm) {
                showToast('Passwords do not match', 'error');
                return;
            }

            const btn = document.getElementById('registerBookBtn');
            btn.disabled = true;
            btn.textContent = 'Creating account…';

            const loader = showLoading();
            try {
                // 1. Sign up via Supabase Auth
                const { data: authData, error: authError } = await _supabase.auth.signUp({
                    email,
                    password
                });
                if (authError) throw authError;

                if (!authData.user) {
                    showToast('Check your email for a confirmation link!', 'info');
                    return;
                }

                // 2. Create profile in 'users' table
                const newUser = {
                    id: authData.user.id,
                    email,
                    name,
                    phone,
                    role,
                    college_id: collegeId
                };

                await DB.insert('users', newUser);

                // 3. Sync booking then save user
                await syncPendingBooking(newUser);
                setUser(newUser);

                showToast('Account created! Redirecting to checkout…', 'success');
                setTimeout(() => window.location.href = 'booking.html', 900);

            } catch (error) {
                console.error('Booking register error:', error);
                showToast(error.message || 'Registration failed', 'error');
                btn.disabled = false;
                btn.textContent = 'Create Account & Book →';
            } finally {
                hideLoading(loader);
            }
        });
    }
});
