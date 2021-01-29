import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EventGallery from '../EventGallery'
import "./HomePage.css";

const HomePage = () => {

    const [ galleryToDisplay, setGalleryToDisplay ] = useState("Event")
    const dispatch = useDispatch();

    const groups = useSelector(reduxState => {
        return reduxState.groups
    })

    const user = useSelector(reduxState => {
        return reduxState.session
    })

    useEffect(() => {
        dispatch(fetchAllGroups())
        dispatch(getCurrentUser())
    }, [dispatch])

    return (
        <div className="home-page">
            <div className="home-page_header">
                <button className="toggle" id="group-toggle"></button>
                <button className="toggle" id="event-toggle"></button>
            </div>
            <EventGallery events={userEvents.slice(0,3)}/>
            <br />
            <EventGallery events={allEvents}/>
            <div className="home-page_sidebar">
            </div>
        </div>
    )
}

export default HomePage;
