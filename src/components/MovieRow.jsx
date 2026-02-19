import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchMovies } from '../api/api';
import MovieCard from './MovieCard';

const MovieRow = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetchMovies(fetchUrl);
                setMovies(request.results);
            } catch (error) {
                console.error("Context: MovieRow fetch", error);
            }
        };
        fetchData();
    }, [fetchUrl]);

    const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-2 md:space-y-4 my-8 pl-4 md:pl-12 group">
            <h2 className="text-xl md:text-2xl font-semibold text-white/90 transition hover:text-white cursor-pointer mb-2">
                {title}
            </h2>

            <div className="relative group/row">
                {/* Left Arrow */}
                <div
                    className={`absolute top-0 bottom-0 left-0 bg-black/50 z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition hover:bg-black/70 ${!isMoved && "hidden"}`}
                    onClick={() => handleClick("left")}
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </div>

                {/* Movie Container */}
                <div
                    ref={rowRef}
                    className="flex items-center space-x-3 md:space-x-4 overflow-x-scroll scrollbar-hide hide-scrollbar transition-transform duration-500"
                >
                    {movies.map((movie) => (
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <MovieCard key={movie.id} movie={movie} isLargeRow={isLargeRow} />
                        )
                    ))}
                </div>

                {/* Right Arrow */}
                <div
                    className="absolute top-0 bottom-0 right-0 bg-black/50 z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition hover:bg-black/70"
                    onClick={() => handleClick("right")}
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
};

export default MovieRow;
