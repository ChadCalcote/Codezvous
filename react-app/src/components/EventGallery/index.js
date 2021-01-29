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

    function renderEvents(events) {
        const today = new Date(Date.now());
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 5);

        events.map(event => {
            const eventDate = new Date(event.start_time)
            let num = 0
            while( num < 20)
                if (eventDate >= today){
                    console.log("EVENT:", event)
                    return <EventCard event={event} key={event.id} />;
                }
                num ++
        })
    }

    return (
        <div className="event-gallery">
            {!events && <h3>Loading....</h3>}
            {Array.isArray(events) && events.map(event => <EventCard event={event} key={event.id} />)}
        </div>
    )
}

export default EventGallery;