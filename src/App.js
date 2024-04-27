import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import MyNavbar from './components/MyNavbar/MyNavbar';
import MyFooter from './components/MyFooter/MyFooter';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import News from './components/News/News';
import Cremoteca from './components/Cremoteca/Cremoteca';
import Live from './components/Live/Live';
import Eventi from './components/Eventi/Eventi';
import MyQuiz from './components/Quiz/Quiz';
import { quiz } from './quizData';
import ProfilePage from './components/ProfilePage/ProfilePage';

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
