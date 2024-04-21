import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import { AuthContext } from '../context/AuthContext';


const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // Ottieni lo stato di accesso dall'AuthContext
  const [audioPlayed, setAudioPlayed] = useState(false);

  const handleToggleAudio = () => {
    const audio = document.getElementById('audio');
    if (audio) {
      if (audioPlayed) {
        audio.pause();
        audio.currentTime = 0;
      } else {
        audio.play();
      }
      setAudioPlayed(!audioPlayed); // Inverte lo stato della riproduzione audio
    }
  };

  return (
    <div className="container">
      <div className="jumbotron text-center">
        <h1>Benvenuto su Since1999</h1>
      </div>
      {/* Pulsante per la musica */}
      <div className="d-flex align-items-center text-light">
        <h6>Intro <i className="fas fa-music m-1"></i></h6>
        <button onClick={handleToggleAudio} className="btn button py-2">
          <i className={`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg`} aria-hidden="true"></i>
        </button>
      </div>
      <div className='polaroid-section'>
        <div className="photo-gallery">
          <div className="photo no-cell">
            <img src="Carousel/Since002.jpg" alt="Foto 2" />
          </div>
          <div className="photo no-cell">
            <img src="Carousel/Since001.jpg" alt="Foto 1" />
          </div>
          <div className="photo">
            <img src="Carousel/Since008.jpg" alt="Foto 8" />
          </div>
          <div className="photo">
            <img src="Carousel/Since007.jpg" alt="Foto 7" />
          </div>
          <div className="photo no-cell">
            <img src="Carousel/Since006.jpg" alt="Foto 6" />
          </div>
          <div className="photo">
            <img src="Carousel/Since005.jpg" alt="Foto 5" />
          </div>
          <div className="photo">
            <img src="Carousel/Since004.jpg" alt="Foto 4" />
          </div>
          <div className="photo no-cell">
            <img src="Carousel/Since003.jpg" alt="Foto 3" />
          </div>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center text-center'>
          {/* Aggiungi condizione ternaria per il messaggio di benvenuto */}
          {isLoggedIn ? (
            <h3 className="text-center">Bentornato nella nostra <br /> Community!</h3>
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center text-center'>

              <h3>Entra nella nostra <br /> Community!</h3>
              <button onClick={() => navigate('/login')} className="btn button" style={{ maxWidth: '150px' }}>Accedi qui</button>
            </div>
          )}
        </div>


      </div>

      <audio id="audio">
        <source src="Intro.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <SocialLinks />
    </div>
  );
};

export default Home;
