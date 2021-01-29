import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEvents } from '../../store/events';
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import EventCard from '../EventCard'
import UserImage from '../UserImage';
import './EventGallery.css'

const EventGallery = () => {
    const dispatch = useDispatch();

    const events = useSelector(reduxState => {
        return reduxState.events
    })

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [dispatch])

    return (
        <div className="event-gallery">
            {!events && <h3>Loading....</h3>}
            {Array.isArray(events) && events.map(event => {
                return <EventCard event={event} key={event.id} />;
            })}
        </div>
    )
}

export default EventGallery;