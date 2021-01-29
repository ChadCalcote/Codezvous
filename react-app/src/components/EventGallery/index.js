import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEvents } from '../../store/events';
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import EventCard from '../EventCard'
import UserImage from '../UserImage';
import './EventGallery.css'

const EventGallery = ({eventsShown}) => {
    // const dispatch = useDispatch();

    // const events = useSelector(reduxState => {
    //     return reduxState.events
    // })

    // useEffect(() => {
    //     dispatch(fetchAllEvents())
    // }, [dispatch])



    // const todayDate = new Date(Date.now())
    // const dayTwo = addADay(todayDate)

    // function addADay(date){
    //     const copyofDate = new Date(Number(date));
    //     copyofDate.setDate(date.getDate() + 10)
    //     return copyofDate
    // }

    // function setDateSpan(events, startDay, endDay) {
    //     return events.filter(event => {
    //         const eventDate = new Date(event.start_time)
    //         return eventDate >= startDay && eventDate <= endDay
    //     })
    // }
    // function selectEvents(events, startDay, endDay) {
    //     const todayEvents = setDateSpan(events, startDay, endDay)
    //     console.log(todayEvents)
    //     todayEvents.map(event => {
    //         return <EventCard event={event} key={event.id} />;
    //     })
    // }

    // const sectionEvents = selectEvents(events, todayDate, dayTwo)

    return (
        <div className="event-gallery">
            {!eventsShown && <h3>Loading....</h3>}
            {/* {Array.isArray(sectionEvents) && sectionEvents.map(event => <EventCard event={event} key={event.id} />)} */}
            {Array.isArray(eventsShown) && eventsShown.slice(0,20).map(event => <EventCard event={event} key={event.id} />)}
        </div>
    )
}

export default EventGallery;
