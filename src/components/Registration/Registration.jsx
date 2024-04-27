import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Registration = () => {
  const navigate = useNavigate(); // Hook per la navigazione
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        navigate('/login'); // Reindirizza dopo 3 secondi
      }, 3000); // Ritarda il reindirizzamento di 3 secondi
      return () => clearTimeout(timeout); // Pulizia del timeout in caso di smontaggio del componente
    }
  }, [showAlert, navigate]);

  // Stato per memorizzare i valori dei campi del modulo
  const [userData, setUserData] = useState({
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Stato per memorizzare gli errori di validazione
  const [errors, setErrors] = useState({});

  // Funzione per gestire l'invio del modulo
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Controlla la validità dei campi del modulo
    const validationErrors = {};
    if (!userData.nome.trim()) {
      validationErrors.nome = "Il nome è obbligatorio";
    }
    if (!userData.cognome.trim()) {
      validationErrors.cognome = "Il cognome è obbligatorio";
    }
    if (!userData.username.trim()) {
      validationErrors.username = "Il nome utente è obbligatorio";
    }
    if (!userData.email.trim()) {
      validationErrors.email = "L'email è obbligatoria";
    } else if (!isValidEmail(userData.email)) {
      validationErrors.email = "L'email non è valida";
    }
    if (!userData.password.trim()) {
      validationErrors.password = "La password è obbligatoria";
    }
    if (!userData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Conferma la password";
    } else if (userData.password !== userData.confirmPassword) {
      validationErrors.confirmPassword = "Le password non corrispondono";
    }

    // Se ci sono errori di validazione, interrompi l'invio del modulo
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Genera l'hash della password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Invia i dati al server
      const response = await fetch('https://localhost:44314/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: userData.nome,
          cognome: userData.cognome,
          username: userData.username,
          email: userData.email,
          passwordHash: hashedPassword
        })
      });

      if (!response.ok) {
        throw new Error('Errore durante la registrazione');
      }

      // Resetta i valori dei campi del modulo dopo l'invio
      setUserData({
        nome: '',
        cognome: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({}); // Resetta gli errori di validazione

      // Gestire la risposta dal server dopo la registrazione
      const data = await response.json();
      console.log('Utente registrato con successo:', data);
      // Imposta lo stato di registrazione riuscita a true
      setShowAlert(true);
      console.log(showAlert);

    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    }
  };

  // Funzione per controllare se un'email è valida
  const isValidEmail = (email) => {
    // Espressione regolare per controllare il formato dell'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success" role="alert">
          Registrazione avvenuta con successo! Ora puoi accedere.
        </div>
      )}
      <div className='login'>
      <div className='d-flex flex-column'>
      <h2>Registrazione</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-2'>
          <label>Nome:</label>
          <input 
            type="text" 
            value={userData.nome} 
            onChange={(e) => setUserData({ ...userData, nome: e.target.value })} 
            required 
          />
          {errors.nome && <p className="error">{errors.nome}</p>}
        </div>
        <div className='m-2'>
          <label>Cognome:</label>
          <input 
            type="text" 
            value={userData.cognome} 
            onChange={(e) => setUserData({ ...userData, cognome: e.target.value })} 
            required 
          />
          {errors.cognome && <p className="error">{errors.cognome}</p>}
        </div>
        <div className='m-2'>
          <label>Username:</label>
          <input 
            type="text" 
            value={userData.username} 
            onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
            required 
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className='m-2'>
          <label>Email:</label>
          <input 
            type="email" 
            value={userData.email} 
            onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
            required 
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className='m-2'>
          <label>Password:</label>
          <input 
            type="password" 
            value={userData.password} 
            onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
            required 
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className='m-2'>
          <label>Conferma Password:</label>
          <input 
            type="password" 
            value={userData.confirmPassword} 
            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} 
            required 
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button className='btn button m-3' type="submit">Registrati</button>
      </form>
      </div>
      <div className='logToReg'>
      <p className='regClass'>Sei già registrato?</p>
      <Link className='regClass btn button' to="/login">Accedi qui</Link>
      </div>
      </div>
    </div>
  );
};

export default Registration;
