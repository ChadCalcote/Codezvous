// React Dependencies
import React, { Fragment, useState } from "react";
// React Router Dependencies
import { useHistory } from "react-router-dom";
// Login Helper Function
import { login } from "../../services/auth";
import "./index.css";

const DemoButton = ({ setAuthenticated}) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login("demo@aa.io", "password");
    if (!user.errors) {
      setAuthenticated(true);
      history.push("/");
    } else {
      setErrors(user.errors);
    }
  };

  return (
    <Fragment>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <button className="demo" type="submit" onClick={onLogin}>
        DEMO
      </button>
    </Fragment>
  );
};

export default DemoButton;
