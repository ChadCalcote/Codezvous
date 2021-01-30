import React from "react";
import { logout } from "../../services/auth";
// import { useHistory } from 'react-router-dom';


const LogoutButton = ({setAuthenticated}) => {
  // const history = useHistory();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    window.location.reload();
  };


  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
