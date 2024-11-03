// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Lists from './screens/lists'
import Explore from './screens/explore'
import About from './screens/about'

const MovieApp = () => {
  

  return (
    <Router>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex justify-center items-center px-4 py-8 md:px-8 lg:px-16">
        <div className="w-full max-w-3xl">  
          <Routes>
            <Route path="/" element={ <Explore/>  } />
            <Route path="/lists" element={ <Lists/> } />
            <Route path="/about" element={< About/> } />
          </Routes>
        </div>
      </main>
      
      <div className="flex justify-center w-full bg-gray-800 text-white py-3 md:max-w-md md:mx-auto md:rounded-t-lg">
          <Navbar />
        </div>
      
    </div>
  </Router>
);
};

export default MovieApp;
