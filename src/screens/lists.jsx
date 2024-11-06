
import React, { useEffect, useState } from 'react';
import SimpleMovieCard from '../components/movie_card_simple/simple_movie_card';
import { fetchMovies, fetchMovieDetails } from '../api/api';

// const EDITORSPICK_MOVIE_ID_LINK = '';
const EDITORSPICK_MOVIE_ID_LINK = 'https://raw.githubusercontent.com/JoeTinnySpace/OneMovie.io/main/editorspick.json'

const Lists = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [myMoviesList, setMyMoviesList] = useState([]);
  const [error, setError] = useState(null);
  const [localStorageError, setLocalStorageError] = useState(null);
  const [editorMovies, setEditorMovies] = useState([]);

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

  useEffect(() => {
    const fetchEditorsPickIds = async () => {
      try {
        const response = await fetch(EDITORSPICK_MOVIE_ID_LINK); // URL to your JSON file
        const { editorsPickIds } = await response.json();
        const editorMovies = await Promise.all(
          editorsPickIds.map(async (id) => await fetchMovieDetails(id))
        );
        setEditorMovies(editorMovies);
      } catch (err) {
        console.error('Failed to load Editor\'s Pick movies:', err);
      }
    };
  
    fetchEditorsPickIds();
  }, []);
  


  const removeFromMyMoviesList = (movieId) => {
    const updatedList = myMoviesList.filter((movie) => movie.id !== movieId);
    setMyMoviesList(updatedList);
    localStorage.setItem('myMoviesList', JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 rounded-3xl">
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


        {/* Editor's Pick Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">Editor's Pick</h1>
          {editorMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {editorMovies.map((editorMovie) => (
                <SimpleMovieCard key={editorMovie.id} movie={editorMovie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Guess what? The Editor's too busy binge-watching
             TV shows to give you movie picks right now. Priorities, right? 😜.</p>
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
