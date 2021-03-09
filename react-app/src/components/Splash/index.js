import React from 'react';
import { useHistory } from 'react-router-dom';
import './Splash.css';


const Splash = () => {
  const history = useHistory();

  return (
    <div className="splash-page-wrapper">
        <video className="splash-page-video" autoplay="true" loop="true" src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4" >
          Your browser does not support video
        </video>
      <div className="splash-page-overlay">
        <h1>Welcome to Codezvous.</h1>
        <h4>" Find Codezvous so you can do more of what matters to you. Or create your own group and meet people near you who share your interests. "</h4>
        <div className="splash-page_buttons">
          <button onClick={() => history.push('/login')}>Click Here to Begin</button>
          <a href="/signup">Don't have an account?</a>
        </div>
      </div>
    </div>

  )
}

export default Splash;
