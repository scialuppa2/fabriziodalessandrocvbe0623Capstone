import React from 'react';
import SocialLinks from './SocialLinks';
const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron text-center">
        <h1>Benvenuto su Since1999 !</h1>
        <img src="/Since1999_Home.png" alt="Big Presentation" className="img-fluid imgHome-card" />
      </div>
      {/* Altri contenuti della Home Page */}

      <SocialLinks />


    </div>
  );
};

export default Home;
