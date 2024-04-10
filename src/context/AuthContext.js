import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica se il token di accesso è presente nel localStorage
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true); // Imposta isLoggedIn a true se il token è presente
    }
  }, []);

  console.log("Stato di autenticazione:", isLoggedIn); // Controlla il valore di isLoggedIn


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
