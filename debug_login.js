
import fs from 'fs';

async function testLogin() {
    // Get the email from the previous output if possible, or just hardcode last one created
    // simpler: create a new user and login
    const email = "debug_login_" + Date.now() + "@test.com";
    const password = "password123";

    try {
        console.log("Creating user for login test...");
        const signupRes = await fetch('http://localhost:5001/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Login Tester",
                email: email,
                phone: "0000000000",
                password: password
            })
        });

        if (!signupRes.ok) {
            throw new Error("Signup failed during login test: " + await signupRes.text());
        }

        console.log("User created. Attempting login...");
        const loginRes = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await loginRes.json();
        const output = `Login Status: ${loginRes.status}\nBody: ${JSON.stringify(data, null, 2)}`;
        fs.writeFileSync('debug_login_output.txt', output);
        console.log("Login test complete.");

    } catch (err) {
        fs.writeFileSync('debug_login_output.txt', `Login Test failed: ${err.message}`);
        console.error(err);
    }
}

testLogin();
