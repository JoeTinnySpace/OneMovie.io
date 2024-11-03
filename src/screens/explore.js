// MainPage.js
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { fetchMovies } from '../api/api'; // Function to fetch movies

const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [excludeList, setExcludeList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData = await fetchMovies('/discover/movie');
        setMovies(movieData);
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };
    getMovies();
  }, []);

  // Navigate to previous or next movie
  const handleNextMovie = () => {
    if (currentIndex < movies.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePreviousMovie = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Add movie to `excludeList`
  const excludeMovie = () => {
    const currentMovie = movies[currentIndex];
    if (!excludeList.includes(currentMovie)) {
      setExcludeList([...excludeList, currentMovie]);
      handleNextMovie();
    }
  };

  // Save movie to `myMoviesList` in localStorage
  const saveToMyMoviesList = () => {
    const currentMovie = movies[currentIndex];
    const storedMovies = JSON.parse(localStorage.getItem('myMoviesList')) || [];
    if (!storedMovies.some((movie) => movie.id === currentMovie.id)) {
      const updatedMovies = [...storedMovies, currentMovie];
      localStorage.setItem('myMoviesList', JSON.stringify(updatedMovies));
      handleNextMovie();
    }
  };

  // Swipe and click handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextMovie,
    onSwipedRight: handlePreviousMovie,
    onSwipedUp: excludeMovie,
    onSwipedDown: saveToMyMoviesList,
    preventScrollOnSwipe: true,
  });

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="full-viewport w-screen flex items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
    <div className="h-screen w-screen flex items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative" {...swipeHandlers}>
    {movies.length > 0 && (
      <div className="relative w-full h-full flex items-center">
        {/* Movie Poster */}
        <img
          src={`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`}
          alt={movies[currentIndex].title}
          className="object-cover w-full h-full"
          draggable="false"
        />

          {/* Navigation Actions */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-3 rounded-full"
            onClick={handlePreviousMovie}
            disabled={currentIndex === 0}
          >
            &larr;
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-3 rounded-full"
            onClick={handleNextMovie}
            disabled={currentIndex === movies.length - 1}
          >
            &rarr;
          </button>

          {/* Add to Exclude List */}
          <button
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={excludeMovie}
          >
            Exclude 
          </button>

          {/* Save to My Movies List */}
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-md"
    
            onClick={saveToMyMoviesList}
          >
            Add to My Movies
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Explore;
