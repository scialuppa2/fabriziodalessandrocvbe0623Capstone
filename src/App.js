import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import News from './components/News';
import Cremoteca from './components/Cremoteca';
import Live from './components/Live';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per l'autenticazione

  useEffect(() => {
    // Verifica se il token di accesso è presente nel localStorage
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true); // Imposta isLoggedIn a true se il token è presente
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <AuthProvider>
        <MyNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/news"
              element={isLoggedIn ? <News /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/live"
              element={isLoggedIn ? <Live /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/cremoteca"
              element={isLoggedIn ? <Cremoteca /> : <Navigate to="/login" replace />}
            />

          </Routes>
        </AuthProvider>
        <MyFooter />
      </div>
    </Router>
  );
}

export default App;
