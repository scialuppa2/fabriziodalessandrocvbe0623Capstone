import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import './Cremoteca.css';

const Cremoteca = () => {
  const [songs, setSongs] = useState([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

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

        setLoading(false);
        const data = await response.json();
        setSongs(data.data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
  }, []);

  const handlePlayPause = (index) => {
    const audio = document.getElementById(`audio-${index}`);
    if (index === currentPlayingIndex) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      if (currentPlayingIndex !== null) {
        const currentAudio = document.getElementById(`audio-${currentPlayingIndex}`);
        currentAudio.pause();
      }
      audio.play();
      setCurrentPlayingIndex(index);
    }
  };

  const handleTimeUpdate = (index) => {
    const audio = document.getElementById(`audio-${index}`);
    const progressBar = document.getElementById(`prog-bar-inner-${index}`);
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  };

  return (
    <div>
      <h1 className="text-center">Cremoteca</h1>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {songs.map((song, index) => (
              <div key={index} className="col-sm-12 col-md-6 col-xl-4 mb-4 d-flex justify-content-center">
                <div style={{ width: '16rem', height: '26rem' }} className="card">
                  <div className='d-flex align-items-center justify-content-center my-2'>
                    <img src={song.album.cover_medium} className="card-img-top img-fluid img-card" alt={song.album.title} />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title">{song.title}</h6>
                    <div className="prog" id={`prog-bar-${index}`}>
                      <div className="prog-bar">
                        <div id={`prog-bar-inner-${index}`} className="prog-bar-inner"></div>
                      </div>
                    </div>
                    <ul className="player">
                      <button className="button-lg" onClick={() => handlePlayPause(index)}>
                        <i className={`fas fa-${currentPlayingIndex === index && isPlaying ? 'pause' : 'play'} fa-sm`} aria-hidden="true"></i>
                        <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>
                    </ul>
                  </div>
                </div>
                <audio id={`audio-${index}`} onTimeUpdate={() => handleTimeUpdate(index)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} controls style={{ display: 'none' }}>
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
