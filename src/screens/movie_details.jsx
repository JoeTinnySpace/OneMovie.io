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
import { faStar } from '@fortawesome/free-solid-svg-icons';


const MovieDetails = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
          try {
            const movieData = await fetchMovieDetails(id);
            setMovie(movieData);
          } catch (error) {
            console.error("Failed to fetch movie details:", error);
          }
        };
        getMovieDetails();
      }, [id]);


      return (
        <div className="movie-details-page p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {movie && (
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Rating:</strong> {movie.vote_average}{' '}
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  {movie.overview}
                </p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
    );
};


export default MovieDetails;