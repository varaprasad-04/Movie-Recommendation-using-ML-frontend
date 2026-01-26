import React from 'react';
import { Star } from 'lucide-react';

export const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div 
      className="group cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={onClick}
      data-testid="movie-card"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img 
          src={posterUrl} 
          alt={movie.title || movie.name}
          className="w-full h-[300px] sm:h-[350px] object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2" data-testid="movie-title">
              {movie.title || movie.name}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300" data-testid="movie-year">{releaseYear}</span>
              <div className="flex items-center gap-1" data-testid="movie-rating">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 px-1">
        <h3 className="text-white font-medium text-sm line-clamp-1">
          {movie.title || movie.name}
        </h3>
      </div>
    </div>
  );
};
