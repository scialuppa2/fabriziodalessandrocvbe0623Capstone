import React from 'react';

const SocialLink = ({ url, icon, alt }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img className='social-logo' src={icon} alt={alt} />
    </a>
  );
}

export default SocialLink;
