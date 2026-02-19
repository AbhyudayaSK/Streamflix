import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className={`fixed top-0 w-full h-16 p-5 z-50 transition-all duration-500 ${show ? "bg-netflixDark" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
            <div className="flex justify-between items-center px-4 md:px-10 h-full">
                {/* Logo Area */}
                <div className="flex items-center space-x-8">
                    <h1 className="text-netflixRed text-2xl md:text-3xl font-bold cursor-pointer uppercase tracking-wider">Streamflix</h1>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex space-x-6 text-sm text-gray-300">
                        <li className="hover:text-white cursor-pointer transition">Home</li>
                        <li className="hover:text-white cursor-pointer transition">TV Shows</li>
                        <li className="hover:text-white cursor-pointer transition">Movies</li>
                        <li className="hover:text-white cursor-pointer transition">New & Popular</li>
                        <li className="hover:text-white cursor-pointer transition">My List</li>
                    </ul>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-6 text-white">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                    <span className="hidden md:inline cursor-pointer hover:text-gray-300 transition text-sm">Kids</span>
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />

                    <div className="flex items-center space-x-4 cursor-pointer group relative">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        {/* Logout Dropdown/Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
