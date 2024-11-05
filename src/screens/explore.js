import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faStar } from '@fortawesome/free-solid-svg-icons';

const STORAGE_KEYS = {
  CURRENT_INDEX: 'explore_currentIndex',
  CURRENT_PAGE: 'explore_currentPage',
  CURRENT_MOVIES: 'explore_movies',
  SKIPPED_MOVIES: 'skippedMoviesList',
  MY_MOVIES: 'myMoviesList',
  FILTERS: 'explore_filters'
};

const FILTER_OPTIONS = {
  sort_by: [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' }
  ],
  with_genres: [
    { value: '28', label: 'Action' },
    { value: '12', label: 'Adventure' },
    { value: '16', label: 'Animation' },
    { value: '35', label: 'Comedy' },
    { value: '80', label: 'Crime' },
    { value: '99', label: 'Documentary' },
    { value: '18', label: 'Drama' },
    { value: '10751', label: 'Family' },
    { value: '14', label: 'Fantasy' },
    { value: '36', label: 'History' },
    { value: '27', label: 'Horror' },
    { value: '10402', label: 'Music' },
    { value: '9648', label: 'Mystery' },
    { value: '10749', label: 'Romance' },
    { value: '878', label: 'Science Fiction' },
    { value: '10770', label: 'TV Movie' },
    { value: '53', label: 'Thriller' },
    { value: '10752', label: 'War' },
    { value: '37', label: 'Western' }
],
  'vote_average.gte': [
    { value: '7', label: '7+' },
    { value: '8', label: '8+' },
    { value: '9', label: '9+' }
  ],
  'primary_release_date.gte': [
    { value: '2020-01-01', label: '2020+' },
    { value: '2010-01-01', label: '2010+' },
    { value: '2000-01-01', label: '2000+' }
  ]
};

const Explore = () => {
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_MOVIES);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [currentIndex, setCurrentIndex] = useState(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX), 10);
    return !isNaN(stored) ? stored : 0;
  });
  
  const [currentPage, setCurrentPage] = useState(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE), 10);
    return !isNaN(stored) ? stored : 1;
  });

  const [filters, setFilters] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.FILTERS);
    return stored ? JSON.parse(stored) : {
      sort_by: 'popularity.desc',
      with_genres: [],
      'vote_average.gte': '',
      'primary_release_date.gte': ''
    };
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Refs for managing fetch states and debouncing
  const isFetchingRef = useRef(false);
  const lastFetchTimeRef = useRef(0);
  const abortControllerRef = useRef(null);
  const queuedPageRef = useRef(null);
  
  // Minimum time between fetches (in milliseconds)
  const FETCH_COOLDOWN = 500;

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_MOVIES, JSON.stringify(movies));
    localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex.toString());
    localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, currentPage.toString());
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  }, [movies, currentIndex, currentPage, filters]);

  const filterMovies = useCallback((movieData) => {
    const skippedMovies = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKIPPED_MOVIES)) || [];
    const storedMovies = JSON.parse(localStorage.getItem(STORAGE_KEYS.MY_MOVIES)) || [];
    
    return movieData.filter(
      (movie) => !skippedMovies.some((skipped) => skipped.id === movie.id) &&
                 !storedMovies.some((watched) => watched.id === movie.id)
    );
  }, []);

  const buildQueryString = useCallback((pageToFetch) => {
    const queryParams = new URLSearchParams({
      include_adult: 'false',
      page: pageToFetch.toString(),
      sort_by: filters.sort_by
    });

    if (filters.with_genres.length > 0) {
      queryParams.append('with_genres', filters.with_genres.join(','));
    }

    if (filters['vote_average.gte']) {
      queryParams.append('vote_average.gte', filters['vote_average.gte']);
    }

    if (filters['primary_release_date.gte']) {
      queryParams.append('primary_release_date.gte', filters['primary_release_date.gte']);
    }

    return queryParams.toString();
  }, [filters]);

  // Fetch movies with race condition protection
  const fetchMoreMovies = useCallback(async (pageToFetch) => {
    if (isFetchingRef.current) {
      queuedPageRef.current = pageToFetch;
      return;
    }

    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTimeRef.current;
    if (timeSinceLastFetch < FETCH_COOLDOWN) {
      setTimeout(() => {
        fetchMoreMovies(pageToFetch);
      }, FETCH_COOLDOWN - timeSinceLastFetch);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    isFetchingRef.current = true;
    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const queryString = buildQueryString(pageToFetch);
      const movieData = await fetchMovies(
        `/discover/movie?${queryString}`,
        { signal: abortControllerRef.current.signal }
      );
      
      const filteredMovies = filterMovies(movieData);
      
      setMovies(prevMovies => {
        if (pageToFetch === 1) return filteredMovies;
        return [...prevMovies, ...filteredMovies];
      });

      lastFetchTimeRef.current = Date.now();
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to fetch movies.');
      }
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
      abortControllerRef.current = null;

      if (queuedPageRef.current !== null) {
        const queuedPage = queuedPageRef.current;
        queuedPageRef.current = null;
        fetchMoreMovies(queuedPage);
      }
    }
  }, [filterMovies, buildQueryString]);

  useEffect(() => {
    fetchMoreMovies(currentPage);
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentPage, fetchMoreMovies]);

  useEffect(() => {
    if (!loading && movies.length > 0 && currentIndex >= movies.length) {
      setCurrentIndex(movies.length - 1);
    }
  }, [movies, loading, currentIndex]);

  const handleFilterChange = useCallback((filterKey, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterKey]: filterKey === 'with_genres' 
          ? (prev.with_genres.includes(value)
              ? prev.with_genres.filter(genre => genre !== value)
              : [...prev.with_genres, value])
          : value
      };
      
      // Reset page and movies when filters change
      setCurrentPage(1);
      setCurrentIndex(0);
      setMovies([]);
      
      return newFilters;
    });
  }, []);

  const handleNextMovie = useCallback(() => {
    if (loading) return;
    
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else if (!isFetchingRef.current) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentIndex, movies.length, loading]);

  const handlePreviousMovie = useCallback(() => {
    if (loading) return;
    
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }, [currentIndex, loading]);

  const handleMovieAction = useCallback((action) => {
    if (loading || movies.length === 0 || currentIndex >= movies.length) return;
    
    const currentMovie = movies[currentIndex];
    const storageKey = action === 'skip' ? STORAGE_KEYS.SKIPPED_MOVIES : STORAGE_KEYS.MY_MOVIES;
    const storedMovies = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    if (!storedMovies.some((movie) => movie.id === currentMovie.id)) {
      localStorage.setItem(storageKey, JSON.stringify([...storedMovies, currentMovie]));
    }

    setMovies(prevMovies => {
      const newMovies = prevMovies.filter(movie => movie.id !== currentMovie.id);
      if (newMovies.length === 0 && !isFetchingRef.current) {
        setCurrentPage(prev => prev + 1);
      }
      return newMovies;
    });

    setCurrentIndex(prevIndex => Math.max(0, prevIndex));
  }, [movies, currentIndex, loading]);

  const excludeMovie = useCallback(() => handleMovieAction('skip'), [handleMovieAction]);
  const saveToMyMoviesList = useCallback(() => handleMovieAction('save'), [handleMovieAction]);

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (movies.length === 0) return <div className="text-center">No movies available.</div>;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      

      
      {movies.length > 0 && currentIndex < movies.length && (
        <div className="relative w-auto h-[70vh] flex items-center">

{isFilterOpen && (
        <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 max-w-sm w-full">
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Sort By</label>
              <select
                value={filters.sort_by}
                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              >
                {FILTER_OPTIONS.sort_by.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Genres</label>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.with_genres.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('with_genres', option.value)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.with_genres.includes(option.value)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Minimum Rating</label>
              <select
                value={filters['vote_average.gte']}
                onChange={(e) => handleFilterChange('vote_average.gte', e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Any Rating</option>
                {FILTER_OPTIONS['vote_average.gte'].map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Release Year</label>
              <select
                value={filters['primary_release_date.gte']}
                onChange={(e) => handleFilterChange('primary_release_date.gte', e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Any Year</option>
                {FILTER_OPTIONS['primary_release_date.gte'].map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

          <img
            src={`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`}
            alt={movies[currentIndex].title}
            className="object-cover max-w-full h-full"
            draggable="false"
          />

          <Link to={`/movie/${movies[currentIndex].id}`}>
            <div className="absolute text-lg top-5 left-2 bg-yellow-600 text-white px-2 rounded-full">
              {movies[currentIndex].title} ( { movies[currentIndex].release_date.slice(0,4) } )
            </div>
          </Link>

          <div className="absolute text-lg top-5 right-2 bg-yellow-600 text-white px-2 rounded-full">
            {Math.round(movies[currentIndex].vote_average * 10) / 10} <FontAwesomeIcon icon={faStar} />
          </div>

          

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-6 rounded-full disabled:opacity-50"
            onClick={handlePreviousMovie}
            disabled={currentIndex === 0 || loading}
          >
            &larr;
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-6 rounded-full disabled:opacity-50"
            onClick={handleNextMovie}
            disabled={loading}
          >
            &rarr;
          </button>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="absolute bottom-4 left-10 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full ">
            {isFilterOpen ? <FontAwesomeIcon icon={faFilter}/> :  <FontAwesomeIcon icon={faFilter}/>}
          </button>

          <button
            className="absolute bottom-4 left-28 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
            onClick={excludeMovie}
            disabled={loading}
          >
            Skip
          </button>

          <button
            className="absolute bottom-4 right-[-3.5rem] transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
            onClick={saveToMyMoviesList}
            disabled={loading}
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
