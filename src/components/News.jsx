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
        setNews(data.articles.slice(0, 10));
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
              <Col key={index} xs={12} md={6} className="d-flex justify-content-center">
                <Card style={{ width: '28rem', height: '16rem' }} className="text-light m-5">
                  <div className="row g-0">
                    <div className="col-md-6">

                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <Card.Img variant="top" src={article.image} className="imgNws-card img-fluid" />
                      </a>

                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <Card.Title>{article.title}</Card.Title>
                        <div className='d-flex justify-content-center m-4'>
                          <Button className='btn button' href={article.url} target="_blank" rel="noopener noreferrer">Leggi</Button>
                        </div>
                      </div>
                    </div>
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
