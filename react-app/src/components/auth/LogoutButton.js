import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../services/auth";


const LogoutButton = ({setAuthenticated}) => {

  const history = useHistory();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    history.push("/")
    window.location.reload();
  };


  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
