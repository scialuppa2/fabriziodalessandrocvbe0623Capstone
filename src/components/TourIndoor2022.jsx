import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner'; // Importa il componente Spinner

function TourIndoor2022() {
  const [tourIndoor, setTourIndoor] = useState([]);
  const [loading, setLoading] = useState(true); // Aggiungi lo stato per gestire il caricamento

  useEffect(() => {
    axios.get('https://localhost:44314/api/TourIndoor2022')
      .then(response => {
        setTourIndoor(response.data);
        setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono stati recuperati
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Assicurati di impostare lo stato di caricamento su false anche in caso di errore
      });
  }, []);

  // Mostra lo spinner durante il caricamento dei dati
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-center">Palazzetti 2022</h1>
      <div className="container">
        <div className="row">
          {tourIndoor.map(tour => (
            <div key={tour.ConcertID} className="col-sm-12 col-md-6 col-xl-4 mb-4 d-flex justify-content-center">
              <div style={{ width: '20rem', height: '32rem' }} className="card">
                <div className='d-flex align-items-center justify-content-center my-2'>
                  <img src={tour.ImageURL} className="card-img-top img-fluid imgLive-card" alt="Concert" />
                </div>
                <div className="card-body d-flex flex-column justify-content-around">
                  <div>
                    <h5 className="card-title">{tour.Title}</h5>
                    <p className="card-text">{new Date(tour.Date).toLocaleDateString()}</p>
                    <p className="card-text">{tour.Location}</p>
                  </div>
                  <p className="card-text">{tour.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TourIndoor2022;
