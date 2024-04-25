import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import News from './components/News';
import Cremoteca from './components/Cremoteca';
import Live from './components/Live';
import Eventi from './components/Eventi';
import MyQuiz from './components/Quiz';
import { quiz } from './quizData';
import ProfilePage from './components/ProfilePage';

function App() {
  const { isLoggedIn } = useContext(AuthContext); // Ottenere lo stato di autenticazione dal contesto

  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {isLoggedIn ? (
            <>
              <Route path="/news" element={<News />} />
              <Route path="/live" element={<Live />} />
              <Route path="/cremoteca" element={<Cremoteca />} />
              <Route path="/eventi" element={<Eventi />} />
              <Route path="/quiz" element={<MyQuiz quizData={quiz} />} />
              <Route path="/profilepage" element={<ProfilePage />} />
            </>
          ) : (
            <>
              <Route path="/news" element={<Login />} />
              <Route path="/live" element={<Login />} />
              <Route path="/cremoteca" element={<Login />} />
              <Route path="/eventi" element={<Login />} />
              <Route path="/quiz" element={<Login />} />
            </>
          )}
        </Routes>
        <MyFooter />
      </div>
    </Router>
  );
}

export default App;
