import React, { useState, useRef, useEffect } from 'react';
import TourStadi2022 from './TourStadi2022';
import TourIndoor2022 from './TourIndoor2022';

const Live = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const selectedTourRef = useRef(null);
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

  const handleTourSelection = (tourType) => {
    setSelectedTour(tourType);
  };

  useEffect(() => {
    // Se c'è una selezione e l'elemento DOM del componente selezionato esiste
    if (selectedTour && selectedTourRef.current) {
      // Scorrere all'inizio dell'elemento del componente selezionato
      selectedTourRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTour]);

  return (
    <div className="container">
      <h1 className="text-center">LIVE TOURS</h1>
      <div className="row justify-content-around">
        {/* Pulsante per la musica */}
      <div className="d-flex align-items-center text-light my-4">
        <h6>Delfini <i className="fas fa-music m-1"></i></h6>
        <button onClick={handleToggleAudio} className="btn button py-2">
          <i className={`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg`} aria-hidden="true"></i>
        </button>
      </div>
        {/* Immagine per il tour degli stadi */}
        <div className="col-sm-6 col-md-4 m-1">
          <img
            src="/stadi_img.jpg"
            alt="Stadi 2022"
            className="img-fluid imgTour-card"
            onClick={() => handleTourSelection('stadi')}
          />
        </div>
        {/* Immagine per il tour indoor */}
        <div className="col-sm-6 col-md-4 m-1">
          <img
            src="/indoor_img.jpg"
            alt="Indoor 2022"
            className="img-fluid imgTour-card"
            onClick={() => handleTourSelection('indoor')}
          />
        </div>
      </div>
      
      <audio id="audio">
        <source src="Delfini.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {/* Mostra il componente selezionato in base al tour scelto */}
      <div className="col-md-12 mt-4" ref={selectedTourRef}>
        {selectedTour === 'stadi' && <TourStadi2022 />}
        {selectedTour === 'indoor' && <TourIndoor2022 />}
      </div>
    </div>
  );
};

export default Live;
