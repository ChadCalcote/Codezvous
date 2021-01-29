import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Dropdown from '../Dropdown';
import logo from './logo.png';

import './NavBar.css';

const NavBar = ({ setAuthenticated }) => {
	const history = useHistory();

	return (
		<div className="navbarWrapper">
			<div className="header_left">
				<div className="home">
					<img
						className="header_logo"
						onClick={() => history.push('/')}
						src={logo}
					/>
				</div>
			</div>

			<div className="header_right">
				<div className="start_new_group">
					<NavLink to="/new-group" exact={true} activeClassName="active">
						Start a new group
					</NavLink>
				</div>
				<Dropdown />
			</div>
		</div>
	);
};

export default NavBar;
