import app from './server/index.js';
import fs from 'fs';

const PORT = process.env.PORT || 5001;

console.log("Resilient starter: Attempting to keep server alive...");

try {
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`RESILIENT SERVER: Running on http://localhost:${PORT}`);
        fs.appendFileSync('server_log.txt', `RESILIENT SERVER: Started on port ${PORT} at ${new Date().toISOString()}\n`);
    });

    server.on('error', (err) => {
        console.error("SERVER ERROR EVENT:", err);
        fs.appendFileSync('server_log.txt', `SERVER ERROR EVENT: ${err.stack}\n`);
    });

} catch (err) {
    console.error("CRITICAL BOOTSTRAP ERROR:", err);
    fs.appendFileSync('server_log.txt', `CRITICAL BOOTSTRAP ERROR: ${err.stack}\n`);
}

// Keep the process alive even if the server doesn't
setInterval(() => {
    // heartbeat
}, 10000);
