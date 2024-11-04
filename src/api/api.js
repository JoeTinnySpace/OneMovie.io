// src/api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Make sure to have your API key in .env file
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
    return response.data.results; // Return only the results array
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    throw error; // Rethrow error for further handling
  }
};
