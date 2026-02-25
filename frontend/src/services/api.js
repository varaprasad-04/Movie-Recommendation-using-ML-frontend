import axios from "axios";

const BASE_URL = "https://movie-recommendation-using-ml-1.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased timeout for slow API
});

// Add request interceptor for debugging
api.interceptors.request.use((request) => {
  console.log("Starting Request:", request.url);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export const fetchPopularMovies = async () => {
  try {
    // Use Action genre (28) for popular movies since no /popular endpoint exists
    const response = await api.get("/movies-by-genre?genre_id=28");
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await api.get("/genres");
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    // Return fallback genres if API fails
    return {
      genres: [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 27, name: "Horror" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Sci-Fi" },
      ],
    };
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get(`/movies-by-genre?genre_id=${genreId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

export const searchMovie = async (movieName) => {
  try {
    const response = await api.get(
      `/recommend?movie=${encodeURIComponent(movieName)}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error searching movie:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieName) => {
  try {
    const response = await api.get(
      `/recommend?movie=${encodeURIComponent(movieName)}`,
    );
    if (response.data.input_movie) {
      // Return the movie object with full details
      return {
        title: response.data.input_movie,
        poster_path: response.data.poster
          ? response.data.poster.replace("https://image.tmdb.org/t/p/w500", "")
          : null,
        poster: response.data.poster,
        overview: response.data.description,
        // Add a unique id for React key
        id: movieName.toLowerCase().replace(/\s+/g, "-"),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching details for movie: ${movieName}`, error);
    return null;
  }
};

export default api;
