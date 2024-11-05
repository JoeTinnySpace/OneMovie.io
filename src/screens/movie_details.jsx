// {
//     "adult": false,
//     "backdrop_path": "/vOwezqxpHjBpA5nJIWbapm9Qtgd.jpg",
//     "belongs_to_collection": null,
//     "budget": 0,
//     "genres": [
//       {
//         "id": 28,
//         "name": "Action"
//       },
//       {
//         "id": 35,
//         "name": "Comedy"
//       },
//       {
//         "id": 80,
//         "name": "Crime"
//       }
//     ],
//     "homepage": "https://www.amazon.com/dp/B0DDJ31FYB",
//     "id": 616446,
//     "imdb_id": "tt9860566",
//     "origin_country": [
//       "US"
//     ],
//     "original_language": "en",
//     "original_title": "Brothers",
//     "overview": "A reformed criminal's attempt at going straight is derailed when he reunites with his sanity-testing twin brother on a road trip for the score of a lifetime. Dodging bullets, the law, and an overbearing mother along the way, they must heal their severed family bond before they end up killing each other.",
//     "popularity": 807.492,
//     "poster_path": "/Akweo95FGyDpucYVT81h0SbX8Ky.jpg",
//     "production_companies": [
//       {
//         "id": 1757,
//         "logo_path": "/fc9qw5GoTbyWGa0QcfbsZFzuMKQ.png",
//         "name": "Mad Chance",
//         "origin_country": "US"
//       },
//       {
//         "id": 120915,
//         "logo_path": null,
//         "name": "Brolin Productions",
//         "origin_country": "US"
//       },
//       {
//         "id": 923,
//         "logo_path": "/8M99Dkt23MjQMTTWukq4m5XsEuo.png",
//         "name": "Legendary Pictures",
//         "origin_country": "US"
//       },
//       {
//         "id": 107244,
//         "logo_path": null,
//         "name": "Estuary Films",
//         "origin_country": "US"
//       }
//     ],
//     "production_countries": [
//       {
//         "iso_3166_1": "US",
//         "name": "United States of America"
//       }
//     ],
//     "release_date": "2024-10-10",
//     "revenue": 0,
//     "runtime": 88,
//     "spoken_languages": [
//       {
//         "english_name": "English",
//         "iso_639_1": "en",
//         "name": "English"
//       }
//     ],
//     "status": "Released",
//     "tagline": "Family is a life sentence.",
//     "title": "Brothers",
//     "video": false,
//     "vote_average": 6.3,
//     "vote_count": 135
//   }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const imdb_link = 'https://www.imdb.com/title/'

const MovieDetails = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Failed to load movie
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
  const release_year = new Date(movie.release_date).getFullYear()

  const MovieInfo = (
    <div className="text-white text-center sm:text-left sm:pl-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">{movie.title} ({release_year})</h1>
      <p className="text-gray-300 text-sm sm:text-lg italic mb-4">{movie.tagline}</p>
      <div className="flex justify-center sm:justify-start items-center gap-4 sm:gap-6 mb-4">
        <a href={imdb_link + movie.imdb_id} target="_blank" rel="noopener noreferrer" className="flex items-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </a>
        <div className="flex items-center">
          <span className="mr-1">⏱</span>
          <span>{formatRuntime(movie.runtime)}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">📅</span>
          <span>{release_year}</span>
        </div>
      </div>
      <div className="flex justify-center sm:justify-start gap-2 mb-4">
        {movie.genres.map((genre) => (
          <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
            {genre.name}
          </span>
        ))}
      </div>
      {streaming_link ? 
       <div className="flex justify-center">
          <a href={movie.homepage} target='_blank' rel='noreferrer'>
          Watch on OTT  <FontAwesomeIcon icon={faPlay} />
          </a>
        </div>: 
        ''
        }

    </div>
  );


      return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
  {/* Hero Section */}
  <div
    className="w-full h-80 sm:h-96 bg-cover bg-center relative mb-4 sm:mb-8"
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      backgroundColor: 'rgba(0,0,0,0.8)'
    }}
  >
    <div className="max-w-6xl mx-auto px-4 h-full flex flex-col sm:flex-row items-center sm:items-end pb-4 sm:pb-8">
      {/* Poster */}
      <div className="w-40 h-60 sm:w-64 sm:h-96 bg-gray-700 rounded-lg shadow-lg mb-4 sm:mb-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="object-cover max-w-full h-full"
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
<div className="block sm:hidden mb-8 px-4 bg-gray-800 rounded-lg p-4">
  {MovieInfo}
</div>

  {/* Main Content */}
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
      {/* Overview Section */}
      <div className="sm:col-span-2">
        <div className=" bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-xl  text-gray-200 sm:text-2xl font-semibold mb-2 sm:mb-4">Overview</h2>
          <p className="text-gray-500 mb-4 sm:mb-6">{movie.overview}</p>
        </div>
      </div>


      
      {/* Production Details */}
      <div>
        <div className="bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg text-gray-200 sm:text-xl font-semibold mb-2 sm:mb-4">Production Details</h2>
          <div className="space-y-2 sm:space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 ">Release Date</h3>
              <p className='text-gray-500'>{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 dark:text-gray-400">Production Companies</h3>
              <ul className="mt-1 space-y-1 text-gray-500">
                {movie.production_companies.map((company, index) => (
                  <li key={index}>{company.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
            {/* Back Button */}
            <button 
              className="mt-8 text-gray-600 dark:text-gray-300 flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.history.back()}
            >
              ← Back to Movies
            </button>
          </div>
        </div>
      );
    
};


export default MovieDetails;