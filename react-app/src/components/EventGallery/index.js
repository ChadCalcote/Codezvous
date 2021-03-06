import React, { useEffect, useState } from 'react'
import {formatDate} from '../../dateFunctions';
import EventCard from '../EventCard'
import loader from  '../../Bars-0.7s-98px.gif'

const EventGallery = ({events, parent, user}) => {
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
                return eventDate === dayOne;
            }))

            setDayTwoEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate === dayTwo;
            }))

            setDayThreeEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate === dayThree;
            }))

            setDayFourEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate === dayFour;
            }))

            setDayFiveEvents(events.filter(event => {
                const eventDate = formatDate(event.start_time, "long")
                return eventDate === dayFive;
            }))
        }
    },[events, dayOne, dayTwo, dayThree, dayFour, dayFive])

    function gallerySwap() {
        if (parent === "home"){
            return (
                <div className="event-gallery">
                    <div className="event-gallery_day-one">
                        <h2>{dayOne}</h2>
                        {!events && <img src={loader} alt="loading..."/>}
                        {Array.isArray(dayOneEvents) && dayOneEvents.length === 0 && <h3>No events scheduled for this date</h3>}
                        {Array.isArray(dayOneEvents) && dayOneEvents.map(event => <EventCard event={event} user={user} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-two">
                        <h2>{dayTwo}</h2>
                        {!events && <img src={loader} alt="loading..."/>}
                        {Array.isArray(dayTwoEvents) && dayTwoEvents.length === 0 && <h3>No events scheduled for this date</h3>}
                        {Array.isArray(dayTwoEvents) && dayTwoEvents.map(event => <EventCard event={event} user={user} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-three">
                        <h2>{dayThree}</h2>
                        {!events && <img src={loader} alt="loading..."/>}
                        {Array.isArray(dayThreeEvents) && dayThreeEvents.length === 0 && <h3>No events scheduled for this date</h3>}
                        {Array.isArray(dayThreeEvents) && dayThreeEvents.map(event => <EventCard event={event} user={user} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-four">
                        <h2>{dayFour}</h2>
                        {!events && <img src={loader} alt="loading..."/>}
                        {Array.isArray(dayFourEvents) && dayFourEvents.length === 0 && <h3>No events scheduled for this date</h3>}
                        {Array.isArray(dayFourEvents) && dayFourEvents.map(event => <EventCard event={event} user={user} key={event.id} />)}
                    </div>
                    <div className="event-gallery_day-five">
                        <h2>{dayFive}</h2>
                        {!events && <img src={loader} alt="loading..."/>}
                        {Array.isArray(dayFiveEvents) && dayFiveEvents.length === 0 && <h3>No events scheduled for this date</h3>}
                        {Array.isArray(dayFiveEvents) && dayFiveEvents.map(event => <EventCard event={event} user={user} key={event.id} />)}
                    </div>
                </div>
            )
        }else if (parent === "groupPage"){
            return (
                <div className="event-gallery">
                    {!events && <img src={loader} alt="loading..."/>}
                    {Array.isArray(events) && events.map(event => <EventCard event={event} user={user} key={event.id} />)}
                </div>
            )
        }else if (parent === "eventPage"){
            return (
                <div className="event-gallery">
                    {!events && <img src={loader} alt="loading..."/>}
                    {Array.isArray(events) && events.slice(0,4).map(event => <EventCard event={event} user={user} key={event.id} />)}
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
