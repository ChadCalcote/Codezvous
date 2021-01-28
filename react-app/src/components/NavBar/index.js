import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../SearchBar'
import './NavBar.css';

const NavBar = ({ setAuthenticated }) => {
  const history = useHistory()



	return (
		<div className="navbarWrapper">
      <div className="header_left">
        <div className="home">
          <img className="header-logo"
          onClick={() => history.push('/')}
          src={"react-app/logo.png"} />
        </div>
        <div className="searchbar">
          <SearchBar />
        </div>

      </div>

      <div className="header_right">
        <div className='start_new_group'>
          <NavLink to='/new-group' exact={true} activeClassName="active">
            Start a new group
          </NavLink>
        </div>
        <div className="login">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>

        <div className="logoutButton">
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>

        <div className="signup">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>

        </div>
      </div>
		</div>
	);
};

export default NavBar;
