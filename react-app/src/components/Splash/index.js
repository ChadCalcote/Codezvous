import React from 'react';
import { useHistory } from 'react-router-dom';
import './Splash.css';


const Splash = () => {
  const history = useHistory();

  return (
    <div className="splash-page-wrapper">
      <h1>Hi! I'm splash page.</h1>
      <p>Lorem Ipsum...</p>
      <button onClick={() => history.push('/login')}>Log In</button>
      <button onClick={() => history.push('/signup')}>Sign Up</button>
    </div>

  )
}

export default Splash;
