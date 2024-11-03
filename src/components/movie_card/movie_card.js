import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './movie_card.css'; // Assuming you have this CSS file for styling

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <h3>{movie.title} ({movie.release_date.slice(0, 4)})</h3>
      <p>
        {Math.round(movie.vote_average * 10) / 10} 
        <FontAwesomeIcon icon={faStar} className="star-icon" />
      </p>
    </div>
  );
};

export default MovieCard;