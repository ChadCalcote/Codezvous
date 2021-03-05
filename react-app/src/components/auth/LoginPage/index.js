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
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <br />
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <br />
          <div className="login-buttons">
            <DemoButton setAuthenticated={setAuthenticated} />
            <button className="authButton" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
