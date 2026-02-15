import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";
import { MovieDetails } from "../components/MovieDetails";
import { Loader } from "../components/Loader";
import { Footer } from "../components/Footer";
import {
  fetchPopularMovies,
  fetchGenres,
  fetchMoviesByGenre,
  searchMovie,
  getMovieDetails,
} from "../services/api";
import { toast } from "sonner";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [pageTitle, setPageTitle] = useState("Popular Movies");

  useEffect(() => {
    loadPopularMovies();
    loadGenres();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchPopularMovies();
      setMovies(data.movies || data.results || []);
      setPageTitle("Popular Action Movies");
      setSearchedMovie(null);
      setRecommendations([]);
    } catch (error) {
      toast.error("Failed to load popular movies");
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const data = await fetchGenres();
      setGenres(data.genres || data);
    } catch (error) {
      toast.error("Failed to load genres");
    }
  };

  const fetchRecommendationDetails = async (movieNames) => {
    if (!movieNames || movieNames.length === 0) return [];

    setLoadingRecommendations(true);
    try {
      // Fetch details for up to 10 recommendations to avoid too many API calls
      const limitedMovies = movieNames.slice(0, 10);
      const promises = limitedMovies.map((movieName) =>
        getMovieDetails(movieName),
      );
      const results = await Promise.all(promises);

      // Filter out null results (failed API calls)
      const validRecommendations = results.filter((movie) => movie !== null);
      return validRecommendations;
    } catch (error) {
      console.error("Error fetching recommendation details:", error);
      return [];
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre.id);
    setLoading(true);
    setSearchedMovie(null);
    setRecommendations([]);
    try {
      const data = await fetchMoviesByGenre(genre.id);
      setMovies(data.movies || data.results || []);
      setPageTitle(`${genre.name} Movies`);
    } catch (error) {
      toast.error(`Failed to load ${genre.name} movies`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a movie name");
      return;
    }

    setLoading(true);
    try {
      const data = await searchMovie(searchQuery);

      if (data.input_movie) {
        // Create movie object from search result
        const movie = {
          title: data.input_movie,
          poster_path: data.poster
            ? data.poster.replace("https://image.tmdb.org/t/p/w500", "")
            : null,
          poster: data.poster,
          overview: data.description,
        };

        setSearchedMovie(movie);

        // Fetch full recommendation details with images
        const recommendationDetails = await fetchRecommendationDetails(
          data.recommendations || [],
        );
        setRecommendations(recommendationDetails);

        setPageTitle(`Search Results for "${searchQuery}"`);
        setMovies([]);
        setSelectedGenre(null);
      } else {
        toast.error("Movie not found");
      }
    } catch (error) {
      toast.error("Failed to search movie. Please try another movie name.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = (movie) => {
    if (!movie || !movie.title) {
      toast.error("Invalid movie");
      return;
    }
    setSearchQuery(movie.title);
    handleSearchWithQuery(movie.title);
  };

  const handleSearchWithQuery = async (query) => {
    if (!query || query.trim() === "") {
      return;
    }

    setLoading(true);
    try {
      const data = await searchMovie(query);

      if (data.input_movie) {
        const movie = {
          title: data.input_movie,
          poster_path: data.poster
            ? data.poster.replace("https://image.tmdb.org/t/p/w500", "")
            : null,
          poster: data.poster,
          overview: data.description,
        };

        setSearchedMovie(movie);

        // Fetch full recommendation details with images
        const recommendationDetails = await fetchRecommendationDetails(
          data.recommendations || [],
        );
        setRecommendations(recommendationDetails);

        setPageTitle(`Search Results for "${query}"`);
        setMovies([]);
        setSelectedGenre(null);
      } else {
        toast.error(`No results found for "${query}"`);
      }
    } catch (error) {
      toast.error(`Failed to search for "${query}". Please try another movie.`);
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchedMovie(null);
    setRecommendations([]);
    setSelectedGenre(null);
    loadPopularMovies();
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="w-full pl-12 pr-24 py-4 bg-[#2a2a2a] border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                data-testid="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors z-10"
                  data-testid="clear-search-btn"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors z-10"
                data-testid="search-btn"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Genre Buttons */}
        {genres.length > 0 && !searchedMovie && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Browse by Genre
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadPopularMovies}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  !selectedGenre
                    ? "bg-red-600 text-white"
                    : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
                }`}
                data-testid="genre-all-btn"
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedGenre === genre.id
                      ? "bg-red-600 text-white"
                      : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
                  }`}
                  data-testid={`genre-btn-${genre.id}`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Searched Movie Details */}
        {searchedMovie && (
          <div className="mb-12" data-testid="searched-movie-section">
            <h2 className="text-2xl font-bold text-white mb-6">{pageTitle}</h2>
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="flex-shrink-0">
                  <img
                    src={
                      searchedMovie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`
                        : searchedMovie.poster ||
                          "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={searchedMovie.title || searchedMovie.name}
                    className="w-full md:w-64 rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-3xl font-bold text-white mb-2"
                    data-testid="searched-movie-title"
                  >
                    {searchedMovie.title || searchedMovie.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    {searchedMovie.release_date && (
                      <span className="text-gray-400">
                        {new Date(searchedMovie.release_date).getFullYear()}
                      </span>
                    )}
                    {searchedMovie.vote_average && (
                      <span className="text-yellow-400 font-semibold">
                        ⭐ {searchedMovie.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                  {searchedMovie.overview && (
                    <p
                      className="text-gray-300 leading-relaxed"
                      data-testid="searched-movie-overview"
                    >
                      {searchedMovie.overview}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {(recommendations.length > 0 || loadingRecommendations) && (
          <div className="mb-12" data-testid="recommendations-section">
            <h2 className="text-2xl font-bold text-white mb-6">
              Recommended Movies
            </h2>
            {loadingRecommendations ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                <span className="ml-3 text-gray-400">
                  Loading recommendations...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recommendations.map((movie, index) => (
                  <MovieCard
                    key={movie.id || index}
                    movie={movie}
                    onClick={() => handleRecommendationClick(movie)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Movies Grid */}
        {loading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <div>
            <h2
              className="text-2xl font-bold text-white mb-6"
              data-testid="page-title"
            >
              {pageTitle}
            </h2>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              data-testid="movies-grid"
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          </div>
        ) : (
          !searchedMovie && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies found</p>
            </div>
          )
        )}
      </main>

      {/* Movie Details Modal */}
      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
