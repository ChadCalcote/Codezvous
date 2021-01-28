import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import { BsSearch } from 'react-icons/bs'

const NavBar = ({ setAuthenticated }) => {
  const history = useHistory()

  const [keyword, setKeyword] = useState("")
  const [zipcode, setZipcode] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = {
      keyword,
      zipcode,
    };
    console.log(newSearch);
    handleInputReset();
  }

  const handleInputReset = () => {
    setKeyword("")
    setZipcode("")
  }

	return (
		<div className="navbarWrapper">
      <div className="header_left">
        <div className="home">
          <img className="header-logo"
          onClick={() => history.push('/')}
          src={"react-app/logo.png"} />
        </div>

        <div className="searchBar">
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder='Search by keyword'
            />
            <input
              type='text'
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              placeholder='Zip Code'
              defaultValue='78704'
            />
            <button className='searchButton' type='submit'>
              <BsSearch />
            </button>
          </form>
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
