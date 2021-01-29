import React, { useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import './Dropdown.css';

const Dropdown = ({setAuthenticated}) => {

	const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);

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
	);
};

export default Dropdown
