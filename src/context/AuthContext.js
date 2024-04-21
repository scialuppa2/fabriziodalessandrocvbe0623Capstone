import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Leggi lo stato di autenticazione dal localStorage durante l'inizializzazione
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAccessToken = async () => {
      // Verifica se il token di accesso è presente nel localStorage
      if (localStorage.getItem('accessToken')) {
        setIsLoggedIn(true); // Imposta isLoggedIn a true se il token è presente
        // Recupera le informazioni sull'utente dal localStorage o da una richiesta API
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser); // Imposta le informazioni sull'utente nello stato
        }
      }
    };

    checkAccessToken();
  }, []);

  const login = async (accessToken, UserID) => {
    localStorage.setItem('accessToken', accessToken);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);

    try {
      const response = await fetch(`https://localhost:44314/api/Users/${UserID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        // Rimuovi la password dall'oggetto userData prima di memorizzarlo nel localStorage
        delete userData.PasswordHash;
        setUser(userData); // Imposta le informazioni sull'utente nello stato
        localStorage.setItem('user', JSON.stringify(userData)); // Salva le informazioni sull'utente nel localStorage
      } else {
        console.error('Errore durante il login');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
