import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Dropdown from '../Dropdown';
import './NavBar.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

const NavBar = ({ setAuthenticated }) => {
  const history = useHistory();

  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false);

	return (
		<div className="navbarWrapper">
			<div className="header_left">
				<div className="home">
					<img
						className="header-logo"
						onClick={() => history.push('/')}
						src={'./logo.png'}
					/>
				</div>
				<div className="searchbar">
					<SearchBar />
				</div>
			</div>

			<div className="header_right">
				<div className="start_new_group">
					<NavLink to="/new-group" exact={true} activeClassName="active">
						Start a new group
					</NavLink>
				</div>
        <div className="menu_icon" onClick={handleClick}>
          <i>
            <CgProfile />
            {click ? <BsChevronUp /> : <BsChevronDown />}
          </i>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/groups/1" className="nav-links" onClick={closeMobileMenu}>
              Demo Groups
            </NavLink>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <NavLink to="/events/1" className="nav-links" onClick={closeMobileMenu}>
              Demo Events
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/signup" className="nav-links" onClick={closeMobileMenu}>
              Sign Up
            </NavLink>
          </li>
        </ul>
			</div>
		</div>
	);
};

export default NavBar;
