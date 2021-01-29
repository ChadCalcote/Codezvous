import React, { useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { useDetectOutsideClick } from "./useDetectOutsideClick";

import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import './NavBar.css';

const NavBar = ({ setAuthenticated }) => {
	const history = useHistory();

	const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  // const [isActive, setIsActive] = useState(false)
	const onClick = () => setIsActive(!isActive);

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

				<div className="menu-container">
					<button className="menu_icon" onClick={onClick}>
						<CgProfile />
						{isActive ? <BsChevronUp /> : <BsChevronDown />}
					</button>
					<nav
						ref={dropdownRef}
						className={`menu ${isActive ? 'active' : 'inactive'}`}
					>
						<ul>
							<li className="nav-item">
								<NavLink to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/groups/1">
									Demo Groups
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/events/1">
									Demo Events
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/signup">
									Sign Up
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
