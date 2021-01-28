import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import { BsSearch } from 'react-icons/bs'

const NavBar = ({ setAuthenticated }) => {
	return (
		// <nav>
		//   <ul>
		//     <li>
		//       <NavLink to="/" exact={true} activeClassName="active">
		//         Home
		//       </NavLink>
		//     </li>
		//     <li>
		//       <NavLink to="/login" exact={true} activeClassName="active">
		//         Login
		//       </NavLink>
		//     </li>
		//     <li>
		//       <NavLink to="/sign-up" exact={true} activeClassName="active">
		//         Sign Up
		//       </NavLink>
		//     </li>
		//     <li>
		//       <NavLink to="/users" exact={true} activeClassName="active">
		//         Users
		//       </NavLink>
		//     </li>
		//     <li>
		//       <LogoutButton setAuthenticated={setAuthenticated} />
		//     </li>
		//   </ul>
		// </nav>

		<div className="navbarWrapper">

			<div className="home">
				<NavLink to="/" exact={true} activeClassName="active">
					Home
				</NavLink>
			</div>


      <div className="searchBar">
        <input type='text' defaultValue='Search for keywords' />
        <input type='text' defaultValue='City or Zip Code' />
        <BsSearch />
      </div>

      <div className="userWrapper">
        <div className="login">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>

        <div className="signup">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>

        <div className="logoutButton">
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
        </div>
      </div>

		</div>
	);
};

export default NavBar;
