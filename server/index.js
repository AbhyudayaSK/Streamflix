import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db.js'; // Ensure .js extension is present
import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import fs from 'fs';
const log = (msg) => fs.appendFileSync('server_log.txt', msg + '\n');

log("Starting server...");

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = "supersecretkey"; // In production, use process.env.SECRET_KEY

app.use(cors());
app.use(express.json());

// Initialize Database Table
const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20),
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database initialized: 'users' table ready.");
        log("Database initialized: 'users' table ready.");
    } catch (err) {
        console.error("Error initializing database:", err);
        log("Error initializing database: " + err);
    }
};

initDb();

// Routes

// SIGNUP
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required." });
    }

    try {
        // Check if user exists
        const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ error: "User already exists." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Insert user
        const newUser = await db.query(
            "INSERT INTO users (name, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
            [name, email, phone, hash]
        );

        res.status(201).json({ message: "User created successfully", user: newUser.rows[0] });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    log(`Server running on http://localhost:${PORT}`);
});
