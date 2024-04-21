import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { AuthContext } from '../context/AuthContext';

function MyNavbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext); // Aggiungi user al contesto di autenticazione
  const navigate = useNavigate(); // Hook per la navigazione

  useEffect(() => {
    // Verifica se il token di accesso è presente nel localStorage
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true); // Imposta isLoggedIn a true se il token è presente
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    // Effettua il logout impostando isLoggedIn su false
    setIsLoggedIn(false);
    
    // Rimuovi il token di accesso dal localStorage
    localStorage.removeItem('accessToken');
    
    // Rimuovi eventuali altre informazioni sull'utente memorizzate nel localStorage
    localStorage.removeItem('user');
  
    // Salva lo stato di autenticazione aggiornato nel localStorage
    localStorage.setItem('isLoggedIn', false);
  
    // Reindirizza l'utente alla pagina di login o alla home
    navigate('/home');
  };
  
  

  return (
    <nav className="navbar navbar-dark navbar-expand-md p-0">
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
                <li className="nav-item">
                  <Link to="/eventi" className="nav-link">Eventi</Link>
                </li>
                <li className="nav-item">
                  <Link to="/quiz" className="nav-link">Quiz</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className='d-flex align-items-center'>
          {/* Visualizza il saluto accanto al pulsante di logout */}
          {isLoggedIn && user && (
            <span className="text-light me-3">Ciao, {user ? user.Nome : 'Utente'}<i className="fa fa-user m-2"></i></span>
          )}

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
