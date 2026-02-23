/* ============================================
   supabase.js — Supabase Client Configuration
   ============================================ */

const SUPABASE_URL = 'https://zrizbnbhhgfzvvzstfaj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8CF1S2hSinVhEX2RTD5_Vg__Sc1zobu';

// Initialize the Supabase client
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Database Wrapper for easier CRUD
 */
const DB = {
    // Select data from a table
    async query(table, filter = {}) {
        let query = _supabase.from(table).select('*');

        // Apply basic filters if provided
        for (const [key, value] of Object.entries(filter)) {
            query = query.eq(key, value);
        }

        const { data, error } = await query;
        if (error) {
            console.error(`Error querying ${table}:`, error);
            throw error;
        }
        return data;
    },

    // Insert data into a table
    async insert(table, data) {
        const { data: result, error } = await _supabase.from(table).insert([data]).select();
        if (error) {
            console.error(`Error inserting into ${table}:`, error);
            throw error;
        }
        return result[0];
    },

    // Update data in a table
    async update(table, id, data) {
        const { data: result, error } = await _supabase.from(table).update(data).eq('id', id).select();
        if (error) {
            console.error(`Error updating ${table}:`, error);
            throw error;
        }
        return result[0];
    },

    // Delete data from a table
    async delete(table, id) {
        const { error } = await _supabase.from(table).delete().eq('id', id);
        if (error) {
            console.error(`Error deleting from ${table}:`, error);
            throw error;
        }
        return true;
    }
};
