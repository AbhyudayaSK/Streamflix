import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            });

            // Store token (in a real app, use HttpOnly cookies or secure storage)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Optional: store user info

            navigate('/browse');
        } catch (err) {
            console.error('Login Error Detail:', err);

            if (!err.response) {
                setError('Network error: Unable to connect to the backend.');
            } else {
                // Safely handle cases where the error might be an object
                const data = err.response.data;
                if (typeof data === 'object' && data !== null) {
                    let message = data.error || data.message || JSON.stringify(data);
                    if (typeof message === 'object') message = JSON.stringify(message);
                    const details = data.details ? ` (Details: ${typeof data.details === 'object' ? JSON.stringify(data.details) : data.details})` : '';
                    setError(String(`${message}${details}`));
                } else {
                    setError(String(data) || 'Login failed');
                }
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-50%] left-[-20%] w-[70vw] h-[70vw] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="z-10 w-full max-w-md p-8 md:p-12 mx-4 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
                <h1 className="text-4xl font-light mb-8 text-white tracking-wide text-center">Welcome Back (V6)</h1>

                {error && <p className="text-red-400 text-sm mb-6 bg-red-900/20 p-3 rounded border border-red-500/20 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-4 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-white/30 transition-all border border-transparent focus:border-white/10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-white/30 transition-all border border-transparent focus:border-white/10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-4 rounded-lg mt-6 hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-900/30 transform hover:-translate-y-0.5">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-gray-400 text-sm text-center">
                    <p>New to Streamflix? <Link to="/signup" className="text-white hover:text-red-400 transition ml-1 font-medium">Create an account</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
