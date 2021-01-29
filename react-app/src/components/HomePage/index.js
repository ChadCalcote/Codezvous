import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEvents } from '../../store/events'
import { fetchAllGroups } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import EventGallery from '../EventGallery'
import GroupGallery from '../GroupGallery'
import "./HomePage.css";

const HomePage = () => {

    const [ galleryToDisplay, setGalleryToDisplay ] = useState("event")
    const [ eventListDisplayed, setEventListDisplayed ] = useState(true)
    const dispatch = useDispatch();

    const events = useSelector(reduxState => {
        return reduxState.events
    })

    const user = useSelector(reduxState => {
        return reduxState.session
    })
    let displayedGallery;
    useEffect(() => {
        dispatch(fetchAllEvents())
        dispatch(getCurrentUser())
    }, [dispatch])

    useEffect(()=>{
        function gallerySwap() {
            if (galleryToDisplay === "group"){
               return (
                <>
                    <GroupGallery user={user} type="all"/>            
                    <br />
                    <GroupGallery user={user} type="user"/>
                </>
                ) 
            }else {
                return (
                <>
                    <EventGallery />
                </> 
                )
            }
        }
        displayedGallery = gallerySwap()
    }, [galleryToDisplay])

    function handleToggleClick(e) {
        if (galleryToDisplay == "group") {
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
                <button className="toggle" id="group-toggle" hidden={!eventListDisplayed} onClick={()=>handleToggleClick()}>Groups</button>
                <button className="toggle" id="event-toggle" hidden={eventListDisplayed} onClick={()=>handleToggleClick()}>Calendar</button>
            </div>
            <div className="home-page_body">
                {displayedGallery}
            </div>
            <div className="home-page_sidebar">
            </div>
        </div>
    )
}

export default HomePage;
