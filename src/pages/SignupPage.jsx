import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('/api/auth/signup', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-50%] left-[-20%] w-[70vw] h-[70vw] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="z-10 w-full max-w-md p-8 md:p-12 mx-4 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
                <h1 className="text-4xl font-light mb-8 text-white tracking-wide text-center">Join Streamflix</h1>

                {error && <p className="text-red-400 text-sm mb-6 bg-red-900/20 p-3 rounded border border-red-500/20 text-center">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="relative group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="w-full p-4 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-white/30 transition-all border border-transparent focus:border-white/10"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full p-4 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-white/30 transition-all border border-transparent focus:border-white/10"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full p-4 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-white/30 transition-all border border-transparent focus:border-white/10"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-4 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-white/30 transition-all border border-transparent focus:border-white/10"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-4 rounded-lg mt-6 hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-900/30 transform hover:-translate-y-0.5">
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-gray-400 text-sm text-center">
                    <p>Already have an account? <Link to="/login" className="text-white hover:text-red-400 transition ml-1 font-medium">Sign in now</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
