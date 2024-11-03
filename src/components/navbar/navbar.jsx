// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around py-3 md:max-w-md md:mx-auto md:rounded-t-lg">
      <NavLink to="/" className="flex flex-col items-center text-sm">
        <span role="img" aria-label="home" className="text-xl">🏠</span>
        <span className="mt-1">One Movie</span>
      </NavLink>
      {/* <NavLink to="/explore" className="flex flex-col items-center text-sm">
        <span role="img" aria-label="explore" className="text-xl">🔍</span>
        <span className="mt-1">Explore</span>
      </NavLink> */}
      <NavLink to="/lists" className="flex flex-col items-center text-sm">
        <span role="img" aria-label="lists" className="text-xl">📋</span>
        <span className="mt-1">Lists</span>
      </NavLink>
      <NavLink to="/about" className="flex flex-col items-center text-sm">
        <span role="img" aria-label="about" className="text-xl">ℹ️</span>
        <span className="mt-1">About</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
