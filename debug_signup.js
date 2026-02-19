
import fs from 'fs';

async function testSignup() {
    try {
        const response = await fetch('http://localhost:5001/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: "Debug User",
                email: "debug_" + Date.now() + "@test.com",
                phone: "1234567890",
                password: "password123"
            })
        });

        const data = await response.json();
        const output = `Status Code: ${response.status}\nResponse Body: ${JSON.stringify(data, null, 2)}`;
        fs.writeFileSync('debug_output.txt', output);
        console.log("Debug output written to debug_output.txt");

    } catch (err) {
        const errorMsg = `Test failed: ${err.message}\n${err.stack}`;
        fs.writeFileSync('debug_output.txt', errorMsg);
        console.error(errorMsg);
    }
}

testSignup();
