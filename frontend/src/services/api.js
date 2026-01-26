import axios from 'axios';

const BASE_URL = 'https://movie-recommendation-using-ml-1.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export const fetchPopularMovies = async () => {
  try {
    // Use Action genre (28) for popular movies since no /popular endpoint exists
    const response = await api.get('/movies-by-genre?genre_id=28');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genres');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get(`/movies-by-genre?genre_id=${genreId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const searchMovie = async (movieName) => {
  try {
    const response = await api.get(`/recommend?movie=${encodeURIComponent(movieName)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching movie:', error);
    throw error;
  }
};

export default api;
