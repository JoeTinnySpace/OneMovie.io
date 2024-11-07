// api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

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
