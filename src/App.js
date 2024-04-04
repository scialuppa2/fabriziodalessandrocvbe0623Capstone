import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import News from './components/News';
import Cremoteca from './components/Cremoteca';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Live from './components/Live';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Routes>
          <Route path="/home" element={<Home />} /> {/* Aggiungi questa route per la Home */}
          <Route path="/news" element={<News />} />
          <Route path="/cremoteca" element={<Cremoteca />} />
          <Route path="/live" element={<Live />} />

          {/* Altre route */}
        </Routes>
        <MyFooter />
      </div>
    </Router>
  );
}

export default App;
