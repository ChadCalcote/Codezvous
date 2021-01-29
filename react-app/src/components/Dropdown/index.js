import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './Dropdown.css';

const Dropdown = ({setAuthenticated}) => {
	return (
		<div>
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
	);
};

export default Dropdown
