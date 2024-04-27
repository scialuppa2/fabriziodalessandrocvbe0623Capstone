import React from 'react';
import SocialLink from './SocialLink';
import './SocialLink.css';

const SocialLinks = () => {
  return (
    <div className="social-links text-center">
      <h2>Segui le nostre Fanpage</h2>
      <div className='row justify-content-center'>
        <div className='col-sm-6 col-xl-3 my-2'>
          <div className='d-flex align-items-center justify-content-evenly'>
            <SocialLink
              url="https://www.facebook.com/cesarecremoninifanpage"
              icon="/icons8-facebook-100.png"
              alt="Facebook"
            />
            <p>Facebook</p>
          </div>
        </div>
        <div className='col-sm-6 col-xl-3 my-2'>
          <div className='d-flex align-items-center justify-content-evenly'>
            <SocialLink
              url="https://www.instagram.com/cesarecremonini_fanpage/"
              icon="icons8-instagram-100.png"
              alt="Instagram"
            />
            <p>Instagram</p>
          </div>
        </div>
        <div className='col-sm-6 col-xl-3 my-2'>
          <div className='d-flex align-items-center justify-content-evenly'>
            <SocialLink
              url="https://www.tiktok.com/@cesarecremonini_fanpage?_t=8ZPSzzK8HTR&_r=1"
              icon="icons8-tiktok-100.png"
              alt="TikTok"
            />
            <p>TikTok</p>
          </div>
        </div>
        <div className='col-sm-6 col-xl-3 my-2'>
          <div className='d-flex align-items-center justify-content-evenly'>
            <SocialLink
              url="https://www.youtube.com/channel/UCA_Eh4mNLQSZ-I3njCk2Hcg"
              icon="icons8-youtube-100.png"
              alt="YouTube"
            />
            <p>YouTube</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
