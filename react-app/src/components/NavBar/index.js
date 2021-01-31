import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Dropdown from '../Dropdown';
import logo from './logo.png';

import './NavBar.css';

const NavBar = ({ setAuthenticated }) => {
	const history = useHistory();

	return (
		<nav className="navbarWrapper">
			<div className="header_left">
				<div className="home">
					<img
						className="header_logo"
						onClick={() => history.push('/')}
						src={logo}
						alt=""
					/>
				</div>
			</div>

			<div className="header_right">
				<div className="create_group">
					<NavLink to="/create/group" exact={true} activeClassName="active">
						Start a new group
					</NavLink>
				</div>
				<Dropdown setAuthenticated={setAuthenticated}/>
			</div>
		</nav>
	);
};

export default NavBar;
