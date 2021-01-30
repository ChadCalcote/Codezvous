import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import './Dropdown.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/session';

const Dropdown = ({setAuthenticated}) => {

	const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);

	const dispatch = useDispatch();

	const currentUser = useSelector(reduxState => {
		return reduxState.session;
	})

	useEffect( () => {
		dispatch(getCurrentUser())
	}, []);

	if (currentUser.errors == undefined) {
		return (
			<div className="menu-container">
						<i className="menu_icon" onClick={onClick}>
							<CgProfile />
							{isActive ? <BsChevronUp /> : <BsChevronDown />}
						</i>
						<nav
							ref={dropdownRef}
							className={`menu ${isActive ? 'active' : 'inactive'}`}
						>
							<ul>
								<li className="nav-item">
									<NavLink to="/" onClick={onClick}>
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/groups/1" onClick={onClick}>
										Demo Groups
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/events/1" onClick={onClick}>
										Demo Events
									</NavLink>
								</li>
								<li classname="nav-item">
									<LogoutButton setAuthenticated={setAuthenticated} />
								</li>
							</ul>
						</nav>
					</div>
		);
	} else {
		return (
			<div className="menu-container">
						<i className="menu_icon" onClick={onClick}>
							<CgProfile />
							{isActive ? <BsChevronUp /> : <BsChevronDown />}
						</i>
						<nav
							ref={dropdownRef}
							className={`menu ${isActive ? 'active' : 'inactive'}`}
						>
							<ul>
								<li className="nav-item">
									<NavLink to="/" onClick={onClick}>
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/login" onClick={onClick}>
										Log In
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/signup" onClick={onClick}>
										Sign Up
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/groups/1" onClick={onClick}>
										Demo Groups
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/events/1" onClick={onClick}>
										Demo Events
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
		);
	}
};

export default Dropdown
