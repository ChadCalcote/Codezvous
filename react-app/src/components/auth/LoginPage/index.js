import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../../services/auth";
import DemoButton from "../../DemoButton";
import "./LoginForm.css";


const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-container">
      <form className="login-form" onSubmit={onLogin}>
        <div className="form-wrapper">
          <div className="login-form_errors">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="login-form-label">
            <label htmlFor="email">Email</label>
          </div>
          <div className="login-form-input">
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="login-form-label">
            <label htmlFor="password">Password</label>
          </div>
          <div className="login-form-input">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="login-buttons">
            <button id="login-button" type="submit">Login</button>
            <DemoButton errors={errors} setErrors={setErrors} setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
