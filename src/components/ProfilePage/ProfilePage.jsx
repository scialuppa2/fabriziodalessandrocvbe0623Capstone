import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
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

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const saveProfileImage = (e) => {
    e.preventDefault();
    if (profileImage) {
      updateUserProfile({ profileImage, UserID: user.UserID });
    } else {
      console.error('Nessun file selezionato per il caricamento.');
    }
  };

  if (!user) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Il tuo profilo</h1>
      {/* Pulsante per la musica */}
      <div className="d-flex align-items-center text-light m-3">
        <h6>Intro Blu <i className="fas fa-music m-1"></i></h6>
        <button onClick={handleToggleAudio} className="btn button py-2">
          <i className={`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg`} aria-hidden="true"></i>
        </button>
      </div>
      <div className='profileContainer'>
        <div className='d-flex flex-column justify-content-around'>
        <p>Nome:  {user.Nome}</p>
        <p>Cognome:  {user.Cognome}</p>
        <p>Username:  {user.Username}</p>
        <p>Email:  {user.Email}</p>
        </div>
        <img className='imgProfile-card' src={`api/${user.ProfileImage}`} alt="Immagine del profilo" />

      </div>
      <div className='my-5'>
        <h3>Carica l'immagine del profilo</h3>
        <form encType='multipart/form-data'>
          <input className='m-3 text-light' type="file" accept="image/*" onChange={handleProfileImageChange} />
          <button className='btn button m-3' onClick={saveProfileImage}>Salva Immagine</button>
        </form>
      </div>
      <audio id="audio">
        <source src="IntroBlu.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default ProfilePage;
