import pg from 'pg';

const { Pool } = pg;



let pool = null;

const createPool = () => {
    if (pool) return pool;

    let poolConfig = null;
    if (process.env.DATABASE_URL) {
        poolConfig = { connectionString: process.env.DATABASE_URL };
    } else if (process.env.DB_HOST) {
        poolConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
        };
    }

    if (!poolConfig) {
        console.error("DATABASE ERROR: No connection parameters found in process.env");
        return null;
    }

    pool = new Pool({
        ...poolConfig,
        ssl: {
            rejectUnauthorized: false
        }
    });
    return pool;
};

export default {
    query: (text, params) => {
        const activePool = createPool();
        if (!activePool) {
            console.error("CRITICAL ERROR: Database configuration missing in environment variables.");
            throw new Error("Database configuration missing in environment variables. Please check Vercel settings.");
        }
        return activePool.query(text, params);
    },
};
