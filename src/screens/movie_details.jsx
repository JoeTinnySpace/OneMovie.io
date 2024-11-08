
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos, fetchSimilarMovies, fetchOMDBData } from '../api/api';
import SimpleMovieCard from '../components/movie_card_simple/simple_movie_card'
import { LoadingMovie } from '../components/loaders/loading_movies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const imdb_link = 'https://www.imdb.com/title/'
const tmdb_link = 'https://www.themoviedb.org/movie/'
const youtube_link = 'https://www.youtube.com/watch?v='

const MovieDetails = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [omdbImdbData, setOmdbImdbData] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const movieData = await fetchMovieDetails(id);
        const movieVideosData = await fetchMovieVideos(id);
        const similarMoviesData = await fetchSimilarMovies(id);
        setMovieVideos(movieVideosData);
        setMovie(movieData);
        setSimilarMovies(similarMoviesData);

        try {
          if (movieData) {
            const omdbData = await fetchOMDBData(movieData.imdb_id);
            setOmdbImdbData(omdbData);
          }
        } catch {
          console.log(`Couldn't fetch from OMDB API`);
        }

      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);


  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };


  if (isLoading) {
    return (
      <div className="min-h-auto flex items-center justify-center">
        <LoadingMovie message={'Loading movie details...'} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-300 dark:text-white mb-4">
            Failed to load movie
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-300 dark:text-white mb-4">
            Movie Not Found
          </h1>
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const streaming_link = movie.homepage;
  var trailerLink = '';

  if (movieVideos.length) {
    const trailerLinkKey = movieVideos
      .filter(video => video.site === 'YouTube' && video.type === 'Trailer')
      .map(video => video.key)[0]; // id of the first matching trailer
    trailerLink = youtube_link + trailerLinkKey;
  }

  const release_year = new Date(movie.release_date).getFullYear();


  const MovieInfo = (
    // movie details
    <div className="text-white text-center sm:text-left sm:pl-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">{movie.title} ({release_year})</h1>
      <p className="text-gray-300 text-sm sm:text-lg italic mb-2">{movie.tagline}</p>

      <div className="flex sm:justify-start justify-center mb-2">
        <span className="mr-1 text-center">⏱</span>
        <span>{formatRuntime(movie.runtime)}</span>
      </div>


      <div className="flex justify-center sm:justify-start items-center gap-4 sm:gap-6 mb-2">

        {/* if omdb up ? omdb api : tmdb */}
        {omdbImdbData ?
          <>
            <a href={tmdb_link + movie.id} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-100">
              <span className="text-cyan-700 mr-1">TMDB</span>
              <span className="text-yellow-400 mr-1">★</span>
              <span>{movie.vote_average.toFixed(1)}</span>
              <span className='text-gray-500 pl-1'> ({movie.vote_count})</span>
            </a>
            <a href={imdb_link + movie.imdb_id} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-100">
              <span className="text-yellow-400 mr-1">IMDB</span>
              <span className="text-yellow-400 mr-1">★</span>
              <span>{omdbImdbData.imdbRating} </span>
              <span className='text-gray-500 pl-1'> ({omdbImdbData.imdbVotes})</span>
            </a>
          </>
          :
          <>
            <a href={tmdb_link + movie.id} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-100">
              <span className="text-cyan-700 mr-1">TMDB</span>
              <span className="text-yellow-400 mr-1">★</span>
              <span>{movie.vote_average.toFixed(1)}</span>
              <span className='text-gray-500 pl-1'> ({movie.vote_count})</span>
            </a>
            <a href={imdb_link + movie.imdb_id} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-100">
              <span className="text-yellow-400 mr-1">IMDB</span>
            </a>
          </>
        }

      </div>

      <div className="flex  flex-wrap justify-center sm:justify-start gap-2 mb-2">
        {movie.genres.map((genre) => (
          <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
            {genre.name}
          </span>
        ))}
      </div>
      {streaming_link ?
        <span className="flex text-gray-300 hover:text-gray-100 sm:justify-start justify-center mb-2">
          <a href={movie.homepage} target='_blank' rel='noreferrer'>
            Official website <FontAwesomeIcon icon={faPlay} />
          </a>
        </span> :
        ''
      }


      {trailerLink.length > 33 ?
        <div className="flex text-gray-300  hover:text-gray-100 sm:justify-start justify-center mb-2">
          <a href={trailerLink} target='_blank' rel='noreferrer'>
            YouTube Trailer
          </a>
        </div> :
        ''
      }
    </div>
  );


  return (
    <div className="min-h-screen py-8">
      {/* Back Button */}
      <button
        className="mb-8 text-gray-200 flex items-center gap-2 hover:text-gray-100 dark:hover:text-white"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
      {/* Hero Section */}
      <div
        className="w-full h-80 sm:h-96 bg-cover bg-center relative mb-4 sm:mb-8 rounded-2xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex flex-col sm:flex-row items-center sm:items-end pb-4 sm:pb-8 rounded-2xl">
          {/* Poster */}
          <div className="w-40 h-60 sm:w-64 sm:h-96 rounded-lg shadow-lg mb-4 sm:mb-0">
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className="object-cover max-w-full h-full "
              draggable="false"
            />
          </div>

          {/* Movie Info - Displayed in Hero Section only on desktop */}
          <div className="hidden sm:block">
            {MovieInfo}
          </div>
        </div>
      </div>

      {/* Movie Info - Displayed on mobile below Hero Section */}
      <div className="block sm:hidden mb-8 px-4 bg-gray-800 rounded-2xl p-4">
        {MovieInfo}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">

          {/* Overview Section */}
          <div className="sm:col-span-2">
            <div className="bg-gray-800 rounded-2xl shadow p-4">
              <h2 className="text-xl text-gray-200 sm:text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-500">{movie.overview}</p>
            </div>
          </div>

          {/* ad placement */}

          

          {/* Production Details */}
          <div>
            <div className="bg-gray-800 rounded-2xl shadow p-4">
              <h2 className="text-xl text-gray-200 sm:text-2xl font-semibold mb-4">Production Details</h2>
              <div className="space-y-2">
                {/* Release Date */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Release Date</h3>
                  <p className="text-gray-500">
                    {new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                {/* Directed by */}
                {omdbImdbData ?
                  <div>
                    <h3 className="text-sm font-medium text-gray-300">Directed by</h3>
                    <p className="text-gray-500">
                      {omdbImdbData.Director}
                    </p>
                  </div>
                  :
                  <></>
                }
                {/* Production Companies */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Production Companies</h3>
                  <ul className="mt-1 text-gray-500">
                    {movie.production_companies.map((company, index) => (
                      <li key={index}>{company.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TODO movie/{movie_id}/similar */}
        {/* similarMovies */}
        <div className="bg-gray-800 rounded-2xl shadow p-4">
          <h1 className="text-xl text-gray-200 sm:text-2xl font-semibold mb-4">Similar</h1>
          {similarMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {similarMovies.map((similarMovie) => (
                <SimpleMovieCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400"></p>
          )}
        </div>

      </div>


    </div>
  );

};


export default MovieDetails;