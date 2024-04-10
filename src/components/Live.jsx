import React, { useState, useRef, useEffect } from 'react';
import TourStadi2022 from './TourStadi2022';
import TourIndoor2022 from './TourIndoor2022';

const Live = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const selectedTourRef = useRef(null);

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
      {/* Mostra il componente selezionato in base al tour scelto */}
      <div className="col-md-12 mt-4" ref={selectedTourRef}>
        {selectedTour === 'stadi' && <TourStadi2022 />}
        {selectedTour === 'indoor' && <TourIndoor2022 />}
      </div>
    </div>
  );
};

export default Live;
