import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Navbar */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
                <h1 className="text-netflixRed text-4xl font-bold uppercase tracking-wider">Netflix</h1>
                <Link to="/login" className="bg-netflixRed text-white px-4 py-1 rounded text-sm md:text-base font-medium hover:bg-red-700 transition">
                    Sign In
                </Link>
            </div>

            {/* Hero Content with Glassmorphism */}
            <div className="z-10 text-center px-4">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Unlimited movies, TV shows, and more.</h1>
                    <p className="text-xl md:text-2xl mb-6 font-light">Watch anywhere. Cancel anytime.</p>
                    <p className="text-lg md:text-xl mb-8">Ready to watch? Enter your email to create or restart your membership.</p>

                    <Link to="/signup">
                        <button className="bg-netflixRed text-white text-xl md:text-2xl px-8 py-4 rounded hover:bg-red-700 transition flex items-center justify-center mx-auto group">
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 group-hover:translate-x-1 transition">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
