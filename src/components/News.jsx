import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Card, Button, Row, Col } from 'react-bootstrap';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento dei dati


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://gnews.io/api/v4/search?q=Cesare%20Cremonini&apikey=69cb4b5fa8010a44ccc80ae416642265');
        if (!response.ok) {
          throw new Error('Errore nel caricamento delle notizie');
        }
        const data = await response.json();
        setNews(data.articles.slice(0, 9));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Imposta lo stato di caricamento su false dopo che i dati sono stati recuperati o in caso di errore
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1 className="text-center">News</h1>
      {loading ? (
        <Spinner /> // Mostra lo spinner durante il caricamento dei dati
      ) : (
        <div className="container mt-5">
          <Row>
            {news.map((article, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="d-flex justify-content-center">
                <Card style={{ width: '20rem', marginBottom: '32px' }} className="text-light d-flex justify-content-between">
                  <div className='d-flex align-items-center justify-content-center my-2'>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <Card.Img variant="top" src={article.image} className="imgLive-card img-fluid" />
                    </a>

                  </div>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                  </Card.Body>
                  <div className='d-flex justify-content-center my-3'>
                    <Button className='button button-nws' variant="primary" href={article.url} target="_blank" rel="noopener noreferrer">Leggi</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default News;
