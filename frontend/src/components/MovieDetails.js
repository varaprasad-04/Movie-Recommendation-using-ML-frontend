import React from 'react';
import { Star, X } from 'lucide-react';

export const MovieDetails = ({ movie, onClose }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="movie-details-modal"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
          data-testid="close-modal-btn"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="flex-shrink-0">
            <img 
              src={posterUrl} 
              alt={movie.title || movie.name}
              className="w-full md:w-64 rounded-lg shadow-xl"
            />
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2" data-testid="movie-details-title">
              {movie.title || movie.name}
            </h2>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-400" data-testid="movie-details-year">{releaseYear}</span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium" data-testid="movie-details-rating">{rating}</span>
              </div>
            </div>
            
            {movie.overview && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed" data-testid="movie-details-overview">
                  {movie.overview}
                </p>
              </div>
            )}
            
            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id} 
                      className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
