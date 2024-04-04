import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function MyNavbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          <img src="/logo_since1999.png" alt="Logo del Brand" className="logo-img" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/news" className="nav-link">News</Link>
            </li>
            <li className="nav-item">
              <Link to="/live" className="nav-link">Live</Link>
            </li>
            <li className="nav-item">
              <Link to="/cremoteca" className="nav-link">Cremoteca</Link>
            </li>
            <li className="nav-item">
              <Link to="/merchandise" className="nav-link">Merchandise</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login / Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default MyNavbar;
