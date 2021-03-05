import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEvents } from '../../store/events'
import { fetchAllGroups } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import EventGallery from '../EventGallery'
import GroupGallery from '../GroupGallery'
import "./HomePage.css";

const HomePage = () => {
    
    const events = useSelector(state => state.events) // all events
    const user = useSelector(state => state.session) // current user
    const groups = useSelector(state => state.groups);

    // const [eventsShown, setEventsShown] = useState([...events]);
    const [ galleryToDisplay, setGalleryToDisplay ] = useState("event") // events or groups
    const [ eventListDisplayed, setEventListDisplayed ] = useState(true)
    
	// let EventsRegex = new RegExp(query, 'i');
	// const filterEvents = () => {
    //     if (query.length > 0) {
    //         let eventName = [...events].filter((event) => EventsRegex.test(event.event_name));
	// 		let eventDescription = [...events].filter(event => EventsRegex.test(event.description))
	// 		let eventAddress = [...events].filter(event => EventsRegex.test(event.address))
	// 		let eventCity = [...events].filter(event => EventsRegex.test(event.city))
	// 		let eventState = [...events].filter(event => EventsRegex.test(event.state))
	// 		let eventZipcode = [...events].filter(event => EventsRegex.test(event.zip_code))
    //         setEventsShown([...eventName, ...eventDescription, ...eventAddress, ...eventCity, ...eventState, ...eventZipcode,]);
	// 	} else if (query.length === 0) {
    //         setEventsShown([...events]);
	// 	}
	// };
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchAllEvents())
        dispatch(fetchAllGroups())
        dispatch(getCurrentUser())
    }, [dispatch])
    
    function gallerySwap() {
        if (galleryToDisplay === "group"){
            return (
            <div className="home-page-groups">  
                <div className="your-groups">
                    <h2 id="your-groups-header">Your Groups</h2>
                    <GroupGallery id="your-groups-gallery" user={user} groups={groups} type="user"/>
                </div>
                <hr id="group-break-bar" color="#5DACBD" />
                <div className="suggested-groups">
                    <h2 id="suggested-groups-header">Suggested Groups</h2>
                    <GroupGallery id="suggested-group-gallery" user={user} groups={groups} type="all"/>
                </div>
            </div>
            )
        } else if (events) {
            return (
            <div className="home-page-events">
                <EventGallery events={events} user={user} parent={"home"}/>
            </div>
            )
        }
    }

    function handleToggleClick(e) {
        if (galleryToDisplay === "group") {
            setGalleryToDisplay("event")
            setEventListDisplayed(true)
        } else {
            setGalleryToDisplay("group")
            setEventListDisplayed(false)
        }
    }

    return (
        <div className="home-page">
            <div className="home-page_header">
                <h1>Find your next event</h1>
                {/* <div className="searchbar">
                    <SearchBar
                        query={query}
                        setQuery={setQuery}
                    />
                </div> */}
                <div id="home-page_header_buttons">
                    <button className="toggle" id="group-toggle" disabled={!eventListDisplayed} onClick={()=>handleToggleClick()}><h2>Groups</h2></button>
                    <button className="toggle" id="event-toggle" disabled={eventListDisplayed} onClick={()=>handleToggleClick()}><h2>Calendar</h2></button>
                </div>
            </div>
            <div className="home-page_body">
                {gallerySwap()}
            </div>
            <div className="home-page_sidebar">
            </div>
        </div>
    )
}

export default HomePage;
