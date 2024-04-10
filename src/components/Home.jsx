import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';


const Home = () => {
  const navigate = useNavigate(); // Hook per la navigazione

  return (
    <div className="container">
      <div className="jumbotron text-center">
        <h1>Benvenuto su Since1999</h1>
        <div className='cover imgHome-card'>
            <p>Entra nella nostra Community !</p>
            <button onClick={() => navigate('/login')} className="btn button">Accedi qui</button>
        </div>
      </div>
      {/* Altri contenuti della Home Page */}

      <SocialLinks />


    </div>
  );
};

export default Home;
