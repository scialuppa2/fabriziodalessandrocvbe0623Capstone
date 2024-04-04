import React from 'react';
import SocialLink from './SocialLink';

const SocialLinks = () => {
  return (
    <div className="social-links">
      <SocialLink
        url="https://www.facebook.com/cesarecremoninifanpage"
        icon="/path/to/facebook-icon.png"
        alt="Facebook"
      />
      <SocialLink
        url="https://www.instagram.com/your-page"
        icon="/path/to/instagram-icon.png"
        alt="Instagram"
      />
      {/* Aggiungi altri SocialLink per altri social network */}
    </div>
  );
}

export default SocialLinks;
