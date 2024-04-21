import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const Eventi = () => {
    // Stato per memorizzare gli eventi ottenuti dalla chiamata API
    const [eventi, setEventi] = useState([]);
    const [loading, setLoading] = useState(true); // Aggiungi lo stato per gestire il caricamento
    const [modalData, setModalData] = useState(null); // Stato per i dati del modale
    const [modalOpen, setModalOpen] = useState(false); // Stato per gestire l'apertura e la chiusura del modale
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


    // Effettua la chiamata API una volta che il componente è montato
    useEffect(() => {
        fetch('https://localhost:44314/api/Eventi')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella fetch degli eventi');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono stati recuperati
                setEventi(data);
            })
            .catch(error => {
                setLoading(false); // Assicurati che setLoading(false) venga chiamato anche in caso di errore
                console.error('Errore nella fetch degli eventi:', error);
            });
    }, []);

    // Funzione per aprire il modale e impostare i dati del modale
    const openModal = (data) => {
        setModalData(data);
        setModalOpen(true);
    };

    // Funzione per chiudere il modale
    const closeModal = () => {
        setModalOpen(false);
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
                                <h5 className="modal-title">{modalData.Titolo} - {new Date(modalData.Data).toLocaleDateString()}</h5>
                                <button type="button" className="close btn button" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">X</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src={`/api/${modalData.ImageURL}`} alt={modalData.Titolo} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                                <p>"{modalData.Descrizione}"</p>
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
            <h1 className="text-center">Eventi in calendario</h1>
            <div className='design-section'>
                {/* Pulsante per la musica */}
                <div className="d-flex align-items-center text-light">
                    <h6>Interlude <i className="fas fa-music m-1"></i></h6>
                    <button onClick={handleToggleAudio} className="btn button py-2">
                        <i className={`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg`} aria-hidden="true"></i>
                    </button>
                </div>
                <div className="custom-timeline">
                    {eventi.sort((a, b) => new Date(a.Data) - new Date(b.Data)).map((evento, index) => (
                        <div key={evento.EventiID} className={`timeline-item ${index % 2 === 0 ? 'even' : 'odd'} ${index % 2 === 0 ? '' : 'reverse'}`}>
                            <div className="date-square">
                                <p className='data-box' onClick={() => openModal(evento)}>
                                    {new Date(evento.Data).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="timeline-content">
                                <h3>{evento.Titolo}</h3>
                                <img className='imgEvent-card' src={`/api/${evento.ImageURL}`} alt={evento.Titolo} onClick={() => openModal(evento)} />
                                <p>{evento.Luogo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modale */}
            {renderModal()}
            <audio id="audio">
                <source src="Interlude-.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            {/* Torna su */}
            <div className="scroll-to-top d-flex justify-content-center">
                <button className='btn button' onClick={scrollToTop}>Torna su</button>
            </div>
        </div>
    );


};

export default Eventi;
