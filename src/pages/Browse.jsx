import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { requests, validateApiConfig } from '../api/api';

function Browse() {

    useEffect(() => {
        if (!validateApiConfig()) {
            alert("WARNING: API Key or Base URL missing in .env file. The app will not fetch data.");
        }
    }, []);

    return (
        <div className="app bg-[#141414] min-h-screen text-white overflow-x-hidden font-sans antialiased selection:bg-red-600 selection:text-white">
            <Navbar />
            <Hero />

            <div className="pb-10 -mt-20 relative z-20 space-y-4 pl-4 md:pl-10">
                <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
                <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <MovieRow title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </div>
        </div>
    );
}

export default Browse;
