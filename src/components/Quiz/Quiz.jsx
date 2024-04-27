import React, { useState } from 'react';
import Quiz from 'react-quiz-component';
import './Quiz.css';

const MyQuiz = ({ quizData }) => {
  const [showQuiz, setShowQuiz] = useState(true); // Stato per controllare la visualizzazione del quiz
  const [quizResults, setQuizResults] = useState(null); // Stato per memorizzare i risultati del quiz
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

  // Funzione per gestire il completamento del quiz e la memorizzazione dei risultati
  const handleQuizCompletion = (obj) => {
    console.log(obj);
    setQuizResults(obj); // Memorizza i risultati del quiz
    setShowQuiz(false); // Nascondi il quiz
  };

  // Funzione per gestire il riavvio del quiz
  const handleRestartQuiz = () => {
    setShowQuiz(true); // Mostra nuovamente il quiz
    setQuizResults(null); // Resetta i risultati del quiz
  };

  return (
    <>
      <h1 className='text-center'>Since1999 quiz!</h1>
      {/* Pulsante per la musica */}
      <div className="d-flex align-items-center text-light m-3">
        <h6>Cercando Camilla <i className="fas fa-music m-1"></i></h6>
        <button onClick={handleToggleAudio} className="btn button py-2">
          <i className={`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg`} aria-hidden="true"></i>
        </button>
      </div>
      <div className='d-flex justify-content-center'>
        {/* Visualizza il componente Quiz solo se showQuiz è true */}
        {showQuiz && (
          <Quiz
            quiz={quizData}
            showDefaultResult={false}
            onComplete={handleQuizCompletion}
            shuffle={true}
          />
        )}
        {/* Visualizza i risultati del quiz solo se showQuiz è false e i risultati sono disponibili */}
        {!showQuiz && quizResults && (
          // Esempio: Calcola la percentuale di risposte corrette
          <div className='react-quiz-container'>
            <h2>Risultati del Quiz</h2>
            <p>Numero di domande: {quizResults.numberOfQuestions}</p>
            <p>Risposte corrette: {quizResults.numberOfCorrectAnswers}</p>
            <p>Risposte sbagliate: {quizResults.numberOfIncorrectAnswers}</p>
            <p>Punti effettuati: {quizResults.correctPoints}/{quizResults.totalPoints}</p>
            {/* Calcola la percentuale di risposte corrette solo se i risultati sono disponibili */}
            <p>Percentuale di risposte corrette: {quizResults.numberOfQuestions !== 0 ? ((quizResults.numberOfCorrectAnswers / quizResults.numberOfQuestions) * 100).toFixed(2) : 0}%</p>
            {/* Aggiungi altre informazioni o suggerimenti qui */}
            <button className='btn button' onClick={handleRestartQuiz}>Restart Quiz</button>
          </div>
        )}
        <audio id="audio">
        <source src="CercandoCamilla.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      </div>
    </>
  );
};

export default MyQuiz;
