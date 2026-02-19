import React from 'react';
import { IMAGE_BASE_URL } from '../api/api';

const MovieCard = ({ movie, isLargeRow }) => {
    return (
        <div
            className={`cursor-pointer transition duration-200 transform hover:scale-105 opacity-100 hover:opacity-100 z-0 hover:z-50 relative group ${isLargeRow ? "min-w-[160px] md:min-w-[200px]" : "min-w-[200px] md:min-w-[240px]"}`}
        >
            <img
                className={`w-full h-full object-cover rounded-md shadow-lg group-hover:shadow-2xl transition duration-500`}
                src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name || movie.title}
                loading="lazy"
            />

            {/* Hover Content / Overlay (Optional simple version) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition duration-300 rounded-b-md">
                <p className="text-white text-xs md:text-sm font-semibold truncate">
                    {movie.title || movie.name || movie.original_name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-gray-300 mt-1">
                    <span className="text-green-400 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
                    <span>{movie.release_date || movie.first_air_date}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
