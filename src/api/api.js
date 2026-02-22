const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Validates that the necessary environment variables are set.
 * returns {boolean}
 */
export const validateApiConfig = () => {
    if (!API_KEY || !API_BASE_URL) {
        console.error("API Configuration Error: Missing API_KEY or API_BASE_URL in .env file.");
        return false;
    }
    return true;
};

/**
 * Fetches movies from the API.
 * ensures requests are only made to the verified base URL.
 * 
 * @param {string} endpoint - The API endpoint (relative path).
 * @returns {Promise<any>}
 */
export const fetchMovies = async (endpoint) => {
    if (!validateApiConfig()) {
        throw new Error("API Configuration Invalid");
    }

    // Security Check: Ensure we aren't making requests to unauthorized domains if a full URL was somehow passed
    // We strictly prepend the base URL.
    const url = `${API_BASE_URL}${endpoint}`;

    if (!url.startsWith(API_BASE_URL)) {
        console.error(`Security Alert: Attempted fetch to unauthorized URL: ${url}`);
        throw new Error("Unauthorized API Source");
    }

    try {
        const separator = url.includes('?') ? '&' : '?';
        const response = await fetch(`${url}${separator}api_key=${API_KEY}&language=en-US`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`API Connected successfully: Fetched data from ${endpoint}`);
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
};

export const requests = {
    fetchTrending: `/trending/all/week`,
    fetchNetflixOriginals: `/discover/tv?with_networks=213`,
    fetchTopRated: `/movie/top_rated`,
    fetchActionMovies: `/discover/movie?with_genres=28`,
    fetchComedyMovies: `/discover/movie?with_genres=35`,
    fetchHorrorMovies: `/discover/movie?with_genres=27`,
    fetchRomanceMovies: `/discover/movie?with_genres=10749`,
    fetchDocumentaries: `/discover/movie?with_genres=99`,
};

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
