// api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';
const OMDB_BASE_URL = 'http://www.omdbapi.com/'
// const IMDB_BASE_URL = 'https://www.imdb.com/title/'

export const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        include_adult: 'false'
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    throw error; 
  }
};

// movie/movie_id?language=en-US
export const fetchMovieDetails = async (id) => {
  const endpoint = `/movie/${id}`
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      },
    });
    return response.data; 
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    throw error; 
  }
}


// movie/1051896/videos?language=en-US
export const fetchMovieVideos = async (id) => {
  const endpoint = `/movie/${id}/videos`
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    throw error; 
  }
}

export const fetchSearchSuggestions = async (query) => {
  const endpoint = '/search/movie';
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false
      }
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching search suggestions from ${endpoint}:`, error);
    throw error;
  }
};

//
export const fetchSimilarMovies = async (id) => {
  const endpoint = `/movie/${id}/similar`
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    throw error; 
  }
}

// http://www.omdbapi.com/?i=tt3896198&apikey=fcdf483
export const fetchOMDBData = async (imdb_id) => {
  const endpoint = `?i=${imdb_id}&apikey=${OMDB_KEY}`;
  // console.log(endpoint)
  try {
    const response = await axios.get(`${OMDB_BASE_URL}${endpoint}`, {
  
    });
    return response.data; 
  } catch (error) {
  }
}

//x path imdb rating on https://www.imdb.com/title/imdb_id/
// // /html/body/div[2]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[2]/div[1]/div/div[1]/a/span/div/div[2]/div[1]/span[1]
// export const fetchIMDBRatig = async (imdb_id) => {
//   const endpoint = `/${imdb_id}`;
//   console.log(endpoint)
//   try {
//     const response = await axios.get(`${IMDB_BASE_URL}${endpoint}`, {
  
//     });
//     return response.data; 
//   } catch (error) {
//   }
// }