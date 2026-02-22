import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;



const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : process.env.DB_HOST ? {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    } : null;

if (!poolConfig) {
    console.error("CRITICAL ERROR: No database connection parameters found (DATABASE_URL or DB_HOST).");
    // We throw an error that will be caught by the serverless function and reported to the UI
    throw new Error("Database configuration missing in environment variables. Please check Vercel settings.");
}

const pool = new Pool({
    ...poolConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

export default {
    query: (text, params) => pool.query(text, params),
};
