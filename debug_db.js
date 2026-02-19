import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

console.log("Attempting to connect to:", connectionString.replace(/:[^:@]+@/, ':****@'));

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log("Successfully connected to database!");

        const res = await client.query('SELECT NOW()');
        console.log("Database time:", res.rows[0]);

        // Check if users table exists
        const tableRes = await client.query("SELECT to_regclass('public.users')");
        console.log("Users table check:", tableRes.rows[0]);

        client.release();
        process.exit(0);
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}

testConnection();
