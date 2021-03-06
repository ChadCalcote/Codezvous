import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../services/auth';
import './SignUpForm.css';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [zipCode, setZipCode] = useState(0);
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, imageUrl, zipCode);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const updateZipCode = (e) => {
    setZipCode(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <div className="form-wrapper">
          <div className="form-label">
            <label>User Name</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            />
          </div>
          <div className="form-label">
            <label>Email</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div className="form-label">
            <label>Profile Photo Url</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="imageUrl"
              onChange={updateImageUrl}
              value={imageUrl}
            />
          </div>
          <div className="form-label">
            <label>Zip Code</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="zipCode"
              onChange={updateZipCode}
              value={zipCode}
            />
          </div>
          <div className="form-label">
            <label>Password</label>
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            />
          </div>
          <div className="form-label">
            <label>Repeat Password</label>
          </div>
          <div className="form-input">
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            />
          </div>
          <button className="signup-buttons" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
