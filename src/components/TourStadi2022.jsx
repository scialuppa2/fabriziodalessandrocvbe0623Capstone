import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourStadi2022() {
  const [tourStadi, setTourStadi] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44314/api/TourStadi2022')
      .then(response => {
        setTourStadi(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {tourStadi.map(tour => (
        <div key={tour.ConcertID}>
          <h2>{tour.Title}</h2>
          <p>Date: {new Date(tour.Date).toLocaleDateString()}</p>
          <p>Location: {tour.Location}</p>
          <p>Description: {tour.Description}</p>
          <img src={tour.ImageURL} alt="Concert" />
        </div>
      ))}
    </div>
  );
}

export default TourStadi2022;
