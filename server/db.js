
const { Pool } = pg;



const getPoolConfig = () => {
    if (process.env.DATABASE_URL) {
        return { connectionString: process.env.DATABASE_URL };
    }
    if (process.env.DB_HOST) {
        return {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
        };
    }
    return null;
};

const poolConfig = getPoolConfig();
let pool = null;

if (poolConfig) {
    pool = new Pool({
        ...poolConfig,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

export default {
    query: (text, params) => {
        if (!pool) {
            console.error("CRITICAL ERROR: No database connection parameters found.");
            throw new Error("Database configuration missing in environment variables. Please check Vercel settings.");
        }
        return pool.query(text, params);
    },
};
