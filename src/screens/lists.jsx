// src/pages/Lists.js
import React, { useEffect, useState } from 'react';
import SimpleMovieCard from '../components/movie_card_simple/simple_movie_card';
import { fetchMovies } from '../api/api';

const Lists = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [myMoviesList, setMyMoviesList] = useState([]);
  const [error, setError] = useState(null);
  const [localStorageError, setLocalStorageError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const nowPlaying = await fetchMovies('/movie/now_playing');
        const popularMovies = await fetchMovies('/movie/popular');
        setNowPlayingMovies(nowPlaying);
        setPopularMovies(popularMovies);
      } catch (err) {
        setError(`Failed to fetch movies: ${err.message}`);
      }

      const storedMovies = localStorage.getItem('myMoviesList');
      try {
        if (storedMovies) {
          setMyMoviesList(JSON.parse(storedMovies));
        } else {
          setLocalStorageError('Your list is currently empty.');
        }
      } catch (err) {
        setLocalStorageError('Failed to load your list.');
      }
    };

    getMovies();
  }, []);

  const removeFromMyMoviesList = (movieId) => {
    const updatedList = myMoviesList.filter((movie) => movie.id !== movieId);
    setMyMoviesList(updatedList);
    localStorage.setItem('myMoviesList', JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="space-y-10">

        {/* Error Message */}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* My List Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">My List</h1>
          {localStorageError ? (
            <p className="text-center text-gray-400">{localStorageError}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {myMoviesList.map((myMovie) => (
                <SimpleMovieCard
                  key={myMovie.id}
                  movie={myMovie}
                  onRemove={() => removeFromMyMoviesList(myMovie.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Now Playing Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">Now Playing Movies</h1>
          {nowPlayingMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {nowPlayingMovies.map((nowPlayingMovie) => (
                <SimpleMovieCard key={nowPlayingMovie.id} movie={nowPlayingMovie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No movies currently playing.</p>
          )}
        </div>

        {/* Popular Movies Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">Popular Movies</h1>
          {popularMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {popularMovies.map((popularMovie) => (
                <SimpleMovieCard key={popularMovie.id} movie={popularMovie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No popular movies available.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Lists;
