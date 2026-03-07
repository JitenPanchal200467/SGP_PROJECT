/* ============================================
   supabase.js — Supabase Client Configuration
   ============================================ */

// Note: Config is loaded via config.js (ES Module or Global)
// For production readiness, we check if CONFIG is available
const supabaseUrl = typeof CONFIG !== 'undefined' ? CONFIG.SUPABASE_URL : 'https://zrizbnbhhgfzvvzstfaj.supabase.co';
const supabaseKey = typeof CONFIG !== 'undefined' ? CONFIG.SUPABASE_ANON_KEY : 'sb_publishable_8CF1S2hSinVhEX2RTD5_Vg__Sc1zobu';

// Initialize the Supabase client
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

/**
 * Enhanced Database Wrapper with Toast integration
 */
const DB = {
    // Select data from a table
    async query(table, filter = {}) {
        try {
            let query = _supabase.from(table).select('*');

            // Apply basic filters if provided
            for (const [key, value] of Object.entries(filter)) {
                query = query.eq(key, value);
            }

            const { data, error } = await query;
            if (error) throw error;
            return data;
        } catch (err) {
            console.error(`Error querying ${table}:`, err);
            if (typeof showToast === 'function') showToast(`Failed to load ${table} data`, 'error');
            throw err;
        }
    },

    // Insert data into a table
    async insert(table, data) {
        try {
            const { data: result, error } = await _supabase.from(table).insert([data]).select();
            if (error) throw error;
            return result[0];
        } catch (err) {
            console.error(`Error inserting into ${table}:`, err);
            if (typeof showToast === 'function') showToast(`Failed to save to ${table}`, 'error');
            throw err;
        }
    },

    // Update data in a table
    async update(table, id, data) {
        try {
            const { data: result, error } = await _supabase.from(table).update(data).eq('id', id).select();
            if (error) throw error;
            return result[0];
        } catch (err) {
            console.error(`Error updating ${table}:`, err);
            if (typeof showToast === 'function') showToast(`Failed to update ${table}`, 'error');
            throw err;
        }
    },

    // Delete data from a table
    async delete(table, id) {
        try {
            const { error } = await _supabase.from(table).delete().eq('id', id);
            if (error) throw error;
            return true;
        } catch (err) {
            console.error(`Error deleting from ${table}:`, err);
            if (typeof showToast === 'function') showToast(`Failed to delete from ${table}`, 'error');
            throw err;
        }
    }
};
