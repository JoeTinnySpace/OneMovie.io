

// MainPage.js
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api/api';

const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
      
  useEffect(() => {
    const storedIndex = parseInt(localStorage.getItem('currentIndex'), 10);
    const storedPage = parseInt(localStorage.getItem('currentPage'), 10);
    
    if (!isNaN(storedIndex)) setCurrentIndex(storedIndex);
    if (!isNaN(storedPage)) setCurrentPage(storedPage);
  }, []);

  
  // Fetch movies based on current page
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovies(`/discover/movie?include_adult=false&page=${currentPage}`);
        const skippedMovies = JSON.parse(localStorage.getItem('skippedMoviesList')) || [];
        const storedMovies = JSON.parse(localStorage.getItem('myMoviesList')) || [];

        const filteredMovies = movieData.filter(
          (movie) => !skippedMovies.some((skipped) => skipped.id === movie.id) &&
                     !storedMovies.some((watched) => watched.id === movie.id)
        );

        setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };
    
    getMovies();
  }, [currentPage]);

  // Save current index and page to localStorage
  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex);
    localStorage.setItem('currentPage', currentPage);
  }, [currentIndex, currentPage]);

  // Navigate to next movie and fetch new page if at end of list
  const handleNextMovie = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex === movies.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Update index to the first item of new movies once they load
  useEffect(() => {
    if (!loading && movies.length > 0 && currentIndex >= movies.length) {
      setCurrentIndex(0); // Only reset if movies are available
    }
  }, [movies, loading, currentIndex]);

  // Navigate to previous movie
  const handlePreviousMovie = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const excludeMovie = () => {
    const currentMovie = movies[currentIndex];
    const storedSkippedMovies = JSON.parse(localStorage.getItem('skippedMoviesList')) || [];
    
    if (!storedSkippedMovies.some((movie) => movie.id === currentMovie.id)) {
      const updatedSkippedMovies = [...storedSkippedMovies, currentMovie];
      localStorage.setItem('skippedMoviesList', JSON.stringify(updatedSkippedMovies));
    }
    handleNextMovie();
  };

  const saveToMyMoviesList = () => {
    const currentMovie = movies[currentIndex];
    const storedMovies = JSON.parse(localStorage.getItem('myMoviesList')) || [];
    
    if (!storedMovies.some((movie) => movie.id === currentMovie.id)) {
      const updatedMovies = [...storedMovies, currentMovie];
      localStorage.setItem('myMoviesList', JSON.stringify(updatedMovies));
      handleNextMovie();
    } else {
      console.log('Already Added');
      handleNextMovie();
    }
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="h-full w-full flex items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {movies.length > 0 && currentIndex < movies.length && (
        <div className="relative w-auto h-[70vh] flex items-center">
          <img
            src={`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`}
            alt={movies[currentIndex].title}
            className="object-cover w-full h-full"
            draggable="false"
          />

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-6 rounded-full"
            onClick={handlePreviousMovie}
            disabled={currentIndex === 0}
          >
            &larr;
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-6 rounded-full"
            onClick={handleNextMovie}
          >
            &rarr;
          </button>

          <button
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={excludeMovie}
          >
            Exclude
          </button>

          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={saveToMyMoviesList}
          >
            Add to My Movies
          </button>
        </div>
      )}
      {loading && <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500">Loading more movies...</div>}
    </div>
  );
};

export default Explore;
