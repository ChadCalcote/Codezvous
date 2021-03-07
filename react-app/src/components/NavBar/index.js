import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Dropdown from '../Dropdown';
import logo from './logo.png';

import './NavBar.css';

const NavBar = ({ authenticated, setAuthenticated }) => {
	const history = useHistory();

	return (
		<nav className="navbarWrapper">
			<div className="header_left">
				<div className="home">
					<img
						className="header_logo"
						onClick={() => history.push('/')}
						src={logo}
						alt="logo"
					/>
				</div>
			</div>
		{authenticated ? <div className="header_right">
			<div className="create_group">
			<NavLink to="/create-group" exact={true} authenticated={authenticated} activeClassName="active">
				Start a new group
			</NavLink>
			</div>
			<Dropdown setAuthenticated={setAuthenticated} />
			</div> : <Dropdown setAuthenticated={setAuthenticated} />}
		</nav>
	);
};

export default NavBar;
