import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;



const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    };

const pool = new Pool({
    ...poolConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

export default {
    query: (text, params) => pool.query(text, params),
};
