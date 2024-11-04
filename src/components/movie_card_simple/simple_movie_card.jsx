
// src/components/movie_card/SimpleMovieCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

const SimpleMovieCard = ({ movie, onRemove }) => {
  return (
    <div className="relative simple_movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="simple_movie-poster"
      />
      <h3>{movie.title}</h3>
      <div className="rating-overlay">
        <p className="rating-text">
          {Math.round(movie.vote_average * 10) / 10}
          <FontAwesomeIcon icon={faStar} className="star-icon ml-1" />
        </p>
      </div>
      
      {/* Conditional Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default SimpleMovieCard;
