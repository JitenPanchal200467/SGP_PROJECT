/* ============================================
   auth.js — Supabase Authentication
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

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

            try {
                // 1. Sign in via Supabase Auth
                const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (authError) throw authError;

                // 2. Fetch profile from our 'users' table
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', authData.user.id)
                    .single();

                if (userError) throw userError;

                setUser(userData);
                showToast(`Welcome back, ${userData.name}!`, 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 800);

            } catch (error) {
                console.error('Login error:', error);
                showToast(error.message || 'Invalid login credentials', 'error');
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

            try {
                // 1. Sign up via Supabase Auth
                const { data: authData, error: authError } = await supabase.auth.signUp({
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
                    college_id: collegeId,
                    hostel_id: 1, // Default to Sunrise Hall for demo
                    room_number: 'A-' + Math.floor(100 + Math.random() * 400)
                };

                const { error: dbError } = await supabase.from('users').insert([newUser]);
                if (dbError) throw dbError;

                setUser(newUser);
                showToast('Registration successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 800);

            } catch (error) {
                console.error('Registration error:', error);
                showToast(error.message || 'Registration failed', 'error');
            }
        });
    }
});
