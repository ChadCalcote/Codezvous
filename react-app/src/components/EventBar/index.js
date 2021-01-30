import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEvents } from '../../store/events';
import EventCard from '../EventCard'
import './EventBar.css'

const EventBar = ({eventsShown}) => {
    const dispatch = useDispatch();

    const events = useSelector(reduxState => {
        return reduxState.events
    })

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [dispatch])

    return (
        <div className="event-gallery">
            {!eventsShown && <h3>Loading....</h3>}
            {Array.isArray(eventsShown) && eventsShown.slice(0,4).map(event => <EventCard event={event} key={event.id} />)}
        </div>
    )
}

export default EventBar;