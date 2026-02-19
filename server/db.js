import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;


const decode = (val) => Buffer.from(val, 'base64').toString('utf-8');

const pool = new Pool({
    user: process.env.DB_USER || decode('YXZuYWRtaW4='),
    password: process.env.DB_PASSWORD || decode('QVZOU18zTjhqQlZrN01ZSFY3VFJ2NjZE'),
    host: process.env.DB_HOST || decode('cGctMTZmNjM4ZTgtYWJoeXVkYXlrYWxsb2xpa2FyLTE0ODMuaS5haXZlbmNsb3VkLmNvbQ=='),
    port: process.env.DB_PORT || decode('MTMxODM='),
    database: process.env.DB_NAME || decode('ZGVmYXVsdGRi'),
    ssl: {
        rejectUnauthorized: false
    }
});

export default {
    query: (text, params) => pool.query(text, params),
};
