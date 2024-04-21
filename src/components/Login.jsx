import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setIsLoggedIn, login } = useContext(AuthContext);
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
        if (data.userId) {
          login(data.token, data.userId); // Passa l'ID dell'utente alla funzione login
        }
        navigate('/home');
      } else {
        console.error('Errore durante il login');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };
  

  return (
    <div className='login'>
      <div className='d-flex flex-column p-3'>
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
          <button className='btn button m-3' type="submit">Login</button>
        </form>
      </div>
      <div className='logToReg'>
        <p className='regClass'>Non sei ancora registrato?</p>
        <Link className='regClass btn button' to="/registration">Registrati qui</Link>
      </div>
    </div>
  );
};

export default Login;
