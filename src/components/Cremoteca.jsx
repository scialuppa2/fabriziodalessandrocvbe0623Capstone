import React, { useState, useEffect } from 'react';
import Spinner from './Spinner'; // Importa il componente Spinner

const Cremoteca = () => {
  const [songs, setSongs] = useState([]);
  const [currentPreview, setCurrentPreview] = useState(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true); // Aggiungi lo stato per gestire il caricamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=CesareCremonini", {
          method: "GET",
          headers: {
            'X-RapidAPI-Key': 'a8a46e9563msh4b22334911e0cfcp1da315jsn1a8ea6d4de9b',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
          }
        });

        if (!response.ok) {
          throw new Error('Errore nella richiesta');
        }
        
        const data = await response.json();
        setSongs(data.data);
        setLoading(false); // Imposta lo stato del caricamento su false quando i dati sono stati caricati
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
  }, [currentPreview]);

  const handlePreviewPlay = (previewUrl) => {
    if (currentPreview !== null && currentPreview !== previewUrl) {
      const currentAudio = document.getElementById(currentPreview);
      currentAudio.pause();
    }
    setCurrentPreview(previewUrl);
  };

  const handlePlayPause = (index) => {
    const audio = document.getElementById(`audio-${index}`);
    if (index === currentPlayingIndex) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
        document.querySelector(`#prog-bar-${index} .prog-bar-inner`).classList.add('playing');
      } else {
        audio.pause();
        setIsPlaying(false);
        document.querySelector(`#prog-bar-${index} .prog-bar-inner`).classList.remove('playing');
      }
    } else {
      if (currentPlayingIndex !== null) {
        const currentAudio = document.getElementById(`audio-${currentPlayingIndex}`);
        currentAudio.pause();
        document.querySelector(`#prog-bar-${currentPlayingIndex} .prog-bar-inner`).classList.remove('playing');
      }
      audio.play();
      setCurrentPlayingIndex(index);
      setIsPlaying(true);
      document.querySelector(`#prog-bar-${index} .prog-bar-inner`).classList.add('playing');
    }
  };

  const handleProgressClick = (event, index) => {
    const progressBar = document.getElementById(`prog-bar-${index}`);
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = progressBar.clientWidth;
    const seekTime = (x / width) * songs[index].duration;
    const audio = document.getElementById(`audio-${index}`);
    audio.currentTime = seekTime;
  };

  return (
    <div>
      <h1 className="text-center">Cremoteca</h1>
      <div className="container">
        {loading ? (
          <Spinner /> // Mostra lo spinner durante il caricamento dei dati
        ) : (
          <div className="row">
            {songs.map((song, index) => (
              <div key={index} className="col-sm-12 col-md-6 col-xl-4 mb-4 d-flex justify-content-center">
                <div style={{ width: '20rem', height: '32rem' }} className="card">
                  <div className='d-flex align-items-center justify-content-center my-2'>
                    <img src={song.album.cover_medium} className="card-img-top img-fluid img-card"  alt={song.album.title} />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title">{song.title}</h6>
                    <div className="prog" id={`prog-bar-${index}`} onClick={(event) => handleProgressClick(event, index)}>
                      <div className="prog-time">
                        <p className="left">0:00</p>
                        <p className="right">0:30</p>
                      </div>
                      <div className="prog-bar">
                        <div className="prog-bar-inner"></div>
                      </div>
                    </div>
                    <ul className="player">
                      <button className="button button-lg" onClick={() => handlePlayPause(index)}>
                        <i className={`fas fa-${currentPlayingIndex === index && isPlaying ? 'pause' : 'play'} fa-lg`} aria-hidden="true"></i>
                        <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>
                    </ul>
                  </div>
                </div>
                <audio id={`audio-${index}`} controls style={{ display: 'none' }}>
                  <source src={song.preview} type="audio/mpeg" />
                  Il tuo browser non supporta l'elemento audio.
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cremoteca;
