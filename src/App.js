// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchMovies } from './api/api';
import Navbar from './components/navbar/navbar';
import MovieCard from './components/movie_card/movie_card';
import SimpleMovieCard from './components/movie_card_simple/simple_movie_card'
import './App.css';

const MovieApp = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const popular = await fetchMovies('/movie/popular');
        const nowPlaying = await fetchMovies('/movie/now_playing');
        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };

    getMovies();
  }, []);



  return (
    <div className="app-container">
      <Navbar />

      <h2 id="home">Now Playing</h2>
      <div className="movie-grid">
        {nowPlayingMovies.map((nowPlayingMovie) => (
          <SimpleMovieCard 
            key={nowPlayingMovie.id} 
            movie={nowPlayingMovie} 
          />
        ))}
      </div>

      <h2 id="home">Popular Movies</h2>
      <div className="movie-grid">
        {popularMovies.map((popularMovie) => (
          <MovieCard 
            key={popularMovie.id} 
            movie={popularMovie} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieApp;
