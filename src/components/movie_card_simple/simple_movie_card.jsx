// src/components/movie_card/SimpleMovieCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SimpleMovieCard = ({ movie, onRemove }) => {
  return (
    <div className="relative simple-movie-card rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-xl bg-gray-800 text-white">
      
      {/* Poster Image */}
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </Link>

      {/* Movie Title */}
      <div className="p-4 flex flex-col space-y-2">
        <Link to={`/movie/${movie.id}`} className="hover:underline focus:underline">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center text-yellow-400 space-x-1">
          <span>{Math.round(movie.vote_average * 10) / 10}</span>
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>

      {/* Conditional Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Remove movie"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default SimpleMovieCard;

