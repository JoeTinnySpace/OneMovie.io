// src/Navbar.js
import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Movio</h2>
      <button className="menu-icon" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#home" className="nav-link">Home</a></li>
        <li><a href="#explore" className="nav-link">Explore</a></li>
        <li><a href="#about" className="nav-link">For You</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

