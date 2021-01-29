import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Dropdown from '../Dropdown';
import logo from './logo.png';

import './NavBar.css';

const NavBar = ({ setAuthenticated }) => {
	const history = useHistory();

	const [activePage, setActivePage] = useState('/');
	const [query, setQuery] = useState('');

	let GroupsRegex = new RegExp(query, 'i');
	const [groupsShown, setGroupsShown] = useState([...groups]); // <== need to pull groups. Thunk?

	useEffect(() => {
		filterGroups();
	}, [query]);

	const filterGroups = () => {
		if (query.length > 0) {
			let groupName = [...groups].filter((group) =>
				GroupsRegex.test(group.group_name)
			);
			// let groupDescription = [...groups].filter(group => GroupsRegex.test(group.description))
			setGroupsShown(groupName);
		} else if (query.length === 0) {
			setGroupsShown([...groups]);
		}
	};

	const filterEvents = () => {
		if (query.length > 0) {
			let eventName = [...events].filter((event) =>
				GroupsRegex.test(event.event_name)
			);
			// let eventDescription = [...events].filter(event => GroupsRegex.test(event.description))
			setGroupsShown(eventName);
		} else if (query.length === 0) {
			setGroupsShown([...events]);
		}
	};

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
				<div className="searchbar">
					<SearchBar
						query={query}
						setQuery={setQuery}
						activePage={activePage}
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
