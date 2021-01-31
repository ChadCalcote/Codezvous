<<<<<<< HEAD
=======
import React, { useEffect, useState } from 'react'
import { fetchAllEvents } from '../../store/events';
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import {formatDate} from '../../dateFunctions';
import EventCard from '../EventCard'
import UserImage from '../UserImage';
import './EventGallery.css'

const EventGallery = ({events, parent}) => {
    const DAY = 60 * 60 * 24 * 1000

    const [ dayOneEvents, setDayOneEvents ] = useState([])
    const [ dayTwoEvents, setDayTwoEvents ] = useState([])
    const [ dayThreeEvents, setDayThreeEvents ] = useState([])
    const [ dayFourEvents, setDayFourEvents ] = useState([])
    const [ dayFiveEvents, setDayFiveEvents ] = useState([])

    const dayOne = formatDate(new Date(Date.now()), "long")
    const dayTwo = formatDate(addADay(dayOne), "long");
    const dayThree = formatDate(addADay(dayTwo), "long");
    const dayFour = formatDate(addADay(dayThree), "long");
    const dayFive = formatDate(addADay(dayFour), "long")

    function addADay(date){
        const firstDay = new Date(date);
        const nextDay = new Date(firstDay.getTime() + DAY)
        return nextDay
    }

    useEffect(() =>{
        if (Array.isArray(events)){

            setDayOneEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate == dayOne;
            }))

            setDayTwoEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate == dayTwo;
            }))

            setDayThreeEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate == dayThree;
            }))

            setDayFourEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate == dayFour;
            }))

            setDayFiveEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate == dayFive;
            }))
        }
    },[events])

    function gallerySwap() {
        if (parent == "home"){
            return (
                <div className="event-gallery">
                    <div className="event-gallery_day-one">
                        <h2>{dayOne}</h2>
                        {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                        {Array.isArray(dayOneEvents) && dayOneEvents.map(event => <EventCard event={event} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-two">
                        <h2>{dayTwo}</h2>
                        {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                        {Array.isArray(dayTwoEvents) && dayTwoEvents.map(event => <EventCard event={event} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-three">
                        <h2>{dayThree}</h2>
                        {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                        {Array.isArray(dayThreeEvents) && dayThreeEvents.map(event => <EventCard event={event} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-four">
                        <h2>{dayFour}</h2>
                        {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                        {Array.isArray(dayFourEvents) && dayFourEvents.map(event => <EventCard event={event} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-five">
                        <h2>{dayFive}</h2>
                        {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                        {Array.isArray(dayFiveEvents) && dayFiveEvents.map(event => <EventCard event={event} key={event.id} />)}
                    </div>
                </div>
            )
        }else if (parent == "groupPage"){
            return (
                <div className="event-gallery">
                    {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                    {Array.isArray(events) && events.map(event => <EventCard event={event} key={event.id} />)}
                </div>
            )
        }else if (parent == "eventPage"){
            return (
                <div className="event-gallery">
                    {!events && <img src='../../Bars-0.7s-98px.gif'/>}
                    {Array.isArray(events) && events.slice(0,4).map(event => <EventCard event={event} key={event.id} />)}
                </div>
            )
        }
    }
    
    return (
        <div className="event-gallery">
            {gallerySwap()}
        </div>
    )
}

export default EventGallery;
>>>>>>> main
