import React from 'react';

const SocialLink = ({ url, icon, alt }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={alt} />
    </a>
  );
}

export default SocialLink;
