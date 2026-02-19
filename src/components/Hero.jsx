import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { fetchMovies, requests, IMAGE_BASE_URL } from '../api/api';

const Hero = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Netflix Originals or Trending
                const request = await fetchMovies(requests.fetchNetflixOriginals);
                if (request && request.results) {
                    setMovie(
                        request.results[
                        Math.floor(Math.random() * request.results.length - 1)
                        ]
                    );
                }
            } catch (error) {
                console.error("Failed to load hero movie", error);
            }
        };
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    if (!movie) return <div className="h-[550px] w-full bg-netflixDark animate-pulse"></div>;

    return (
        <header
            className="relative h-[85vh] object-cover text-white"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("${IMAGE_BASE_URL}${movie?.backdrop_path || movie?.poster_path}")`,
                backgroundPosition: "center top",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-netflixDark z-0" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-netflixDark to-transparent z-10" />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

            <div className="relative z-20 flex flex-col justify-center h-full px-4 md:px-12 pt-[20vh] space-y-4 md:space-y-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-80 transition hover:scale-105 active:scale-95">
                        <Play className="fill-black w-5 h-5 md:w-6 md:h-6" />
                        <span>Play</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-500/50 transition hover:scale-105 active:scale-95 backdrop-blur-sm">
                        <Info className="w-5 h-5 md:w-6 md:h-6" />
                        <span>More Info</span>
                    </button>
                </div>

                <p className="text-sm md:text-lg max-w-xl text-shadow-md leading-relaxed text-gray-200">
                    {truncate(movie?.overview, 180)}
                </p>
            </div>
        </header>
    );
};

export default Hero;
