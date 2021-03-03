import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import RSVP from "../RSVP"
import loader from  '../../Bars-0.7s-98px.gif'
import UserImage from "../UserImage";
import { formatDate, formatTime } from "../../dateFunctions";
import "./EventCard.css";

const EventCard = ({ event, user }) => {
  const dispatch = useDispatch();

  const [ attendees, setAttendees ] = useState([])
  const [ attending, setAttending ] = useState(false)

  useEffect(() =>{
    const fetchAttendees = async() => {
      const response = await fetch(`/api/events/${event.id}/attendees`)
      const attendees = await response.json()
      setAttendees(attendees)
    }
    fetchAttendees()
  },[])

  useEffect(() => {
    if(Array.isArray(attendees) && attendees.length > 0){
      setAttending(!!attendees.filter(attendee => attendee.id == user.id))
    }
  },[attendees])

  return (
    <div className="event-card">
      <a href={`/events/${event.id}`}>
      <div className="event-card_date">
        {!event.start_time && <img src={loader} alt="loading..."/>}
        {`${formatTime(event.start_time)} ${formatDate(event.start_time, 'long')}`} 
        <RSVP 
          hidden={attending}
          event={event} 
          user={user}
          attending={attending}
          setAttending={setAttending}
          attendees={attendees}
          setAttendees={setAttendees}
          />
        <div hidden={!attending}> 
          See you there.
        </div>
      </div>
      <div className="event-card-info">
        <div className="event-card_title">{event.event_name}</div>
        <div className="event-card_location">
          {event.virtual ?
              <>
                <BsCameraVideo />Virtual event
              </> 
            : 
                <div id="event-card_location_physical">
                  <BsGeoAlt />  
                  <div>
                    <div>
                      {event.address}
                    </div>
                    <div>
                      {event.city}, {event.state} {event.zip_code}
                    </div>
                  </div>
                </div>}
        </div>
        <div className="event-card_description">{event.description}</div>
        <div className="event-card_attendees">
          <div className="event-card_attendees_total">
            {attendees && attendees.length > 0 ? `${attendees.length} going` : "1 going"}
          </div>
          <div className="event-card_attendees_pics">
          {attendees.length > 0 ? attendees.slice(0, 3).map(user => <UserImage key={user.id} user={user}/>) : <BsPerson />}
          </div>
        </div>
      </div>
      </a>
    </div>
  );
}

export default EventCard;
