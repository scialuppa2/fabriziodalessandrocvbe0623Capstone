import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { AuthContext } from '../context/AuthContext';

function MyNavbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook per la navigazione

  useEffect(() => {
    // Verifica se il token di accesso è presente nel localStorage
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true); // Imposta isLoggedIn a true se il token è presente
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    // Effettua il logout impostando isAuthenticated su false
    setIsLoggedIn(false);
    // Rimuovi il token di accesso dal localStorage o da qualsiasi altra soluzione di archiviazione che stai usando
    localStorage.removeItem('accessToken');
    // Reindirizza l'utente alla pagina di login o alla home
    navigate('/login');
  };

  console.log(isLoggedIn)
  return (
    <nav className="navbar navbar-expand-md fixed-top p-0">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          <img src="/logo_since1999.png" alt="Logo del Brand" className="logo-img" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/news" className="nav-link">News</Link>
                </li>
                <li className="nav-item">
                  <Link to="/live" className="nav-link">Live</Link>
                </li>
                <li className="nav-item">
                  <Link to="/cremoteca" className="nav-link">Cremoteca</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className='d-flex'>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn button">Logout</button>
          ) : (
            <button onClick={() => navigate('/login')} className="btn button">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;
