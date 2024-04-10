import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:44314/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.token);
        setIsLoggedIn(true); // Aggiorna lo stato di autenticazione
        navigate('/home');
      } else {
        console.error('Errore durante il login');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };


  return (
    <div className='container d-flex justify-content-evenly'>
      <div className='d-flex flex-column'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='m-2'>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='m-2'>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className='button m-2' type="submit">Login</button>
        </form>
      </div>
      <div className='d-flex flex-column justify-content-center'>
        <p className='regClass'>Non sei ancora registrato?</p>
        <Link className='regClass button button-nws' to="/registration">Registrati qui</Link>
      </div>
    </div>
  );
};

export default Login;
