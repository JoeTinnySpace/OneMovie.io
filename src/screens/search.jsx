import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchSearchSuggestions, fetchMovieDetails } from '../api/api';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getSearchSuggestions = async () => {
            try {
                const suggestions = await fetchSearchSuggestions(searchQuery);
                setSearchSuggestions(suggestions);
            } catch (err) {
                console.error('Failed to fetch search suggestions:', err);
            }
        };

        if (searchQuery) {
            getSearchSuggestions();
        } else {
            setSearchSuggestions([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                if (selectedMovie) {
                    const movieDetails = await fetchMovieDetails(selectedMovie.id);
                    navigate(`/movie/${selectedMovie.id}`, { state: { movie: movieDetails } });
                }
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
            }
        };

        getMovieDetails();
    }, [selectedMovie, navigate]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="min-h-full bg-gray-900 text-white p-4 md:p-8 rounded-3xl">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        className="w-full bg-gray-800 border-gray-700 border rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-400 transition-all duration-300 ease-in-out transform" />
                    </div>
                </div>
                {searchSuggestions.length > 0 && (
                    <div className="bg-gray-800 rounded-md shadow-lg transition-all duration-300 ease-in-out transform">
                        <div className="max-h-96 overflow-y-auto">
                            {searchSuggestions.map((suggestion) => (
                                <div
                                    key={suggestion.id}
                                    className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center transition-all duration-300 ease-in-out transform"
                                    onClick={() => handleSelectMovie(suggestion)}
                                >
                                    <div className="w-16 h-24 bg-gray-700 rounded-md mr-4 flex-shrink-0 transition-all duration-300 ease-in-out transform">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                                            alt={suggestion.title}
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium truncate max-w-xs transition-all duration-300 ease-in-out transform">
                                            {suggestion.title}
                                        </h3>
                                        <p className="text-gray-400 transition-all duration-300 ease-in-out transform">
                                            {suggestion.release_date.slice(0, 4)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;