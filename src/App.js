import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import News from './components/News';
import Cremoteca from './components/Cremoteca';
import MyNavbar from './components/MyNavbar';
import TourStadi2022 from './components/TourStadi2022';

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/cremoteca" element={<Cremoteca />} />
          <Route path="/live" element={<TourStadi2022 />} />

          {/* Altre route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

