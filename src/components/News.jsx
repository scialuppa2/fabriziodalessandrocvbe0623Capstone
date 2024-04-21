import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Card, Button, Row, Col } from 'react-bootstrap';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento dei dati
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


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://gnews.io/api/v4/search?q=Cesare%20Cremonini&apikey=69cb4b5fa8010a44ccc80ae416642265');
        if (!response.ok) {
          throw new Error('Errore nel caricamento delle notizie');
        }
        const data = await response.json();
        setNews(data.articles.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Imposta lo stato di caricamento su false dopo che i dati sono stati recuperati o in caso di errore
      }
    };

    fetchNews();
  }, []);

  // Funzione per tornare all'inizio della pagina
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div>
      <h1 className="text-center">News</h1>
      {/* Pulsante per la musica */}
      <div className="d-flex align-items-center text-light m-4">
        <h6>Linda & Moreno <i className="fas fa-music m-1"></i></h6>
        <button onClick={handleToggleAudio} className="btn button py-2">
          <i className={`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg`} aria-hidden="true"></i>
        </button>
      </div>
      {loading ? (
        <Spinner /> // Mostra lo spinner durante il caricamento dei dati
      ) : (
        <div className="container mt-5">
          <Row>
            {news.map((article, index) => (
              <Col key={index} xs={12} className="d-flex justify-content-center">
                <Card style={{ width: '70%', height: '90%' }} className="text-light m-5 nws-card">
                  <div className="row">
                    <div className="col-md-6">

                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <Card.Img variant="top" src={article.image} className="imgNws-card img-fluid" />
                      </a>

                    </div>
                    <div className="col-md-6 d-flex flex-column">
                      <div className="card-body flex-grow-1">
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>{article.description}</Card.Text>
                      </div>
                      <div className="d-flex justify-content-center align-items-center m-4">
                        <Button className='btn button' href={article.url} target="_blank" rel="noopener noreferrer">Leggi</Button>
                      </div>
                    </div>

                  </div>
                </Card>

              </Col>
            ))}
          </Row>
        </div>
      )}
      {/* Torna su */}
      <div className="scroll-to-top d-flex justify-content-center mt-5">
        <button className='btn button' onClick={scrollToTop}>Torna su</button>
      </div>
      <audio id="audio">
        <source src="Linda&Moreno.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default News;
