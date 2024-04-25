import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAccessToken = async () => {
      if (localStorage.getItem('accessToken')) {
        setIsLoggedIn(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
        }
      }
    };

    checkAccessToken();
  }, []);

  const login = async (accessToken, UserID) => {
    try {
      const response = await fetch(`https://localhost:44314/api/Users/${UserID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        delete userData.PasswordHash;
        setUser(userData);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
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
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
  };
  const fetchUserData = async (userID) => {
    try {
      const response = await fetch(`https://localhost:44314/api/Users/${userID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
  
      if (response.ok) {
        const userData = await response.json();
        // Aggiorna lo stato dell'utente con i nuovi dati ottenuti dal backend
        delete userData.PasswordHash;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.error('Errore durante il recupero dei dati dell\'utente');
      }
    } catch (error) {
      console.error('Errore durante il recupero dei dati dell\'utente:', error);
    }
  };
  

  const updateUserProfile = async ({ profileImage, UserID }) => {
    if (!(profileImage instanceof File)) {
      console.error('Errore: profileImage non è un oggetto File valido');
      return;
    }
  
    const formData = new FormData();
    formData.append('profileImage', profileImage);
  
    try {
      const response = await fetch(`https://localhost:44314/api/Users/${UserID}/ProfileImage`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });
  
      if (response.ok) {
        // Richiedi nuovamente i dati dell'utente dopo l'aggiornamento dell'immagine del profilo
      fetchUserData(UserID); // Supponendo che ci sia una funzione fetchUserData per ottenere i dati dell'utente
      } else {
        console.error('Errore durante il caricamento dell\'immagine del profilo');
      }
    } catch (error) {
      console.error('Errore durante il caricamento dell\'immagine del profilo:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
