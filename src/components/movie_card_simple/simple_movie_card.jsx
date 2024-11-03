// src/components/movie_card/SimpleMovieCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import './simple_movie_card.css';

const SimpleMovieCard = ({ movie }) => {
  return (
    <div className="simple_movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="simple_movie-poster"
      />
      <h3>{movie.title}</h3>
      <div className="rating-overlay">
        <p className="rating-text">
          {Math.round(movie.vote_average * 10) / 10}
          <FontAwesomeIcon icon={faStar} className="star-icon" />
        </p>
      </div>
      
    </div>
    
  );
};

export default SimpleMovieCard;
