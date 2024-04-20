import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function TourIndoor2022() {
  const [tourIndoor, setTourIndoor] = useState([]);
  const [loading, setLoading] = useState(true); // Aggiungi lo stato per gestire il caricamento
  const [modalData, setModalData] = useState(null); // Stato per i dati del modale
  const [modalOpen, setModalOpen] = useState(false); // Stato per gestire l'apertura e la chiusura del modale

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

  // Funzione per aprire il modale e impostare i dati del modale
  const openModal = (data) => {
    setModalData(data);
    setModalOpen(true);
    console.log("Modal aperto. Stato modalOpen:", modalOpen);
  };

  // Funzione per chiudere il modale
  const closeModal = () => {
    setModalOpen(false);
    console.log("Modal chiuso. Stato modalOpen:", modalOpen);
  };

  // Funzione per tornare all'inizio della pagina
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Mostra lo spinner durante il caricamento dei dati
  if (loading) {
    return <Spinner />;
  }

  // Modale
  const renderModal = () => {
    if (modalOpen && modalData) {
      return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalData.Title}</h5>
                <button type="button" className="close btn button" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={modalData.ImageURL} alt="Concert" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                <p>"{modalData.Description}"</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null; // Se il modale non è aperto o non ci sono dati, non renderizzare nulla
    }
  };

  return (
    <div>
      <h1 className="text-center">Palazzetti 2022</h1>
      <div className="container">
        <div className="row">
          {tourIndoor.map(tour => (
            <div key={tour.ConcertID} className="col-sm-12 col-md-6 col-xl-4 mb-4 d-flex justify-content-center">
              <div style={{ width: '20rem', height: '24rem' }} className="card" onClick={() => openModal(tour)}>
                <div className='d-flex align-items-center justify-content-center my-2'>
                  <img src={tour.ImageURL} className="card-img-top img-fluid imgLive-card" alt="Concert" />
                </div>
                <div className="card-body d-flex flex-column justify-content-around">
                  <div>
                    <h5 className="card-title">{tour.Title}</h5>
                    <p className="card-text">{new Date(tour.Date).toLocaleDateString()} - {tour.Location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modale */}
      {renderModal()}
      {/* Torna su */}
      <div className="scroll-to-top d-flex justify-content-center">
        <button className='btn button' onClick={scrollToTop}>Torna su</button>
      </div>
    </div>
  );
}

export default TourIndoor2022;
