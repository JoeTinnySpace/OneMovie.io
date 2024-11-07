import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-900 text-white flex justify-around py-3 shadow-lg 
                    md:max-w-md md:mx-auto md:rounded-t-xl">
      <NavLink
        to="/"
        className={({ isActive }) => `flex flex-col items-center text-sm px-4 py-2 rounded-lg border ${isActive ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-blue-300 hover:border-blue-300'
          } transition-colors duration-200`}
      >
        <FontAwesomeIcon icon={faHome} className="text-xl mb-1" />
        <span>Discover</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => `flex flex-col items-center text-sm px-4 py-2 rounded-lg border ${isActive ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-blue-300 hover:border-blue-300'
          } transition-colors duration-200`}
      >
        <FontAwesomeIcon icon={faSearch} className="text-xl mb-1" />
        <span>Search</span>
      </NavLink>

      <NavLink
        to="/lists"
        className={({ isActive }) => `flex flex-col items-center text-sm px-4 py-2 rounded-lg border ${isActive ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-blue-300 hover:border-blue-300'
          } transition-colors duration-200`}
      >
        <FontAwesomeIcon icon={faList} className="text-xl mb-1" />
        <span>Lists</span>
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => `flex flex-col items-center text-sm px-4 py-2 rounded-lg border ${isActive ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-blue-300 hover:border-blue-300'
          } transition-colors duration-200`}
      >
        <FontAwesomeIcon icon={faInfoCircle} className="text-xl mb-1" />
        <span>About</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
