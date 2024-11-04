// Lists.js
import React, { useEffect, useState } from 'react';
import SimpleMovieCard from '../components/movie_card_simple/simple_movie_card'; // Import your movie card component
import { fetchMovies } from '../api/api'; // Ensure this points to your fetch function

const Lists = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [myMoviesList, setMyMoviesList] = useState([]);
  const [error, setError] = useState(null);
  const [localStorageError,setLocalStorageError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const nowPlaying = await fetchMovies('/movie/now_playing');
        setNowPlayingMovies(nowPlaying);
        const popularMovies = await fetchMovies('/movie/popular');
        setPopularMovies(popularMovies);
        
      } catch (err) {
        setError('Failed to fetch movies.'+{err});
      }

      const storedMovies = localStorage.getItem('myMoviesList');
      try{
        if (storedMovies) {
          setMyMoviesList(JSON.parse(storedMovies));
        } else{
          setLocalStorageError('Empty List')
        }
      }catch(err){  
        setLocalStorageError('Empty List')
      }
      
    };

    getMovies();
  }, []);

 
    const removeFromMyMoviesList = (movieId) => {
      const updatedList = myMoviesList.filter(movie => movie.id !== movieId);
      setMyMoviesList(updatedList);
      localStorage.setItem('myMoviesList', JSON.stringify(updatedList));
    };

  

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (

    <div className="p-4">
      <h1 className="text-left text-2xl font-semibold mb-6">My List</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {localStorageError ? (
              <div className="text-center text-500"> {localStorageError}</div>
            ) :(myMoviesList.map((myMovie) => (
          
          <SimpleMovieCard key={myMovie.id} movie={myMovie} onRemove={() => removeFromMyMoviesList(myMovie.id)} />
          )))
        }
          
      </div>

      <h1 className="text-left text-2xl font-semibold mb-6">Now Playing Movies</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {nowPlayingMovies.map((nowPlayingMovie) => (
          <SimpleMovieCard 
            key={nowPlayingMovie.id} 
            movie={nowPlayingMovie} 
          />
        ))}
      </div>

      <h1 className="text-left text-2xl font-semibold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {popularMovies.map((popularMovie) => (
          <SimpleMovieCard 
            key={popularMovie.id} 
            movie={popularMovie} 
          />
        ))}
      </div>
    </div>
  );
};

export default Lists;
