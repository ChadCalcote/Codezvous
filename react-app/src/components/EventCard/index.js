import React, { useEffect, useState } from "react";
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import RSVP from "../RSVP"
import loader from  '../../Bars-0.7s-98px.gif'
import UserImage from "../UserImage";
import { formatDate, formatTime } from "../../dateFunctions";
import "./EventCard.css";

const EventCard = ({ event, user }) => {

  const [ attendees, setAttendees ] = useState([])
  const [ attendeesForImages, setAttendeesForImages ] = useState([])
  const [ attending, setAttending ] = useState(false)

  useEffect(() =>{
    const selectRandom = (array, num) =>{
      if (array.length <= num) return array;
      const newArr = [];
      const indicies = new Set();
      while (newArr.length < num){
        const index = Math.floor(Math.random() * array.length)
        if (!indicies.has(index)){
          newArr.push(array[index])        
          indicies.add(index);
        }
      }
      return newArr
    }
    const fetchAttendees = async() => {
      const response = await fetch(`/api/events/${event.id}/attendees`)
      const attendees = await response.json()
      setAttendeesForImages(selectRandom(attendees, 3))
      setAttendees(attendees)
    }
    fetchAttendees()
  },[event.id])

  useEffect(() => {
    if(Array.isArray(attendees) && attendees.length > 0){
      setAttending(attendees.map(attendee=>attendee.id).includes(user.id))
    }
  },[attendees, user.id])

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
          You are attending this event.
        </div>
      </div>
      <div className="event-card-info">
        <div className="event-card_title">{event.event_name}</div>
        <div className="event-card_location">
          {event.virtual ?
              <>
                <BsCameraVideo />{`  Virtual event`}
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
          {!attendeesForImages[0] && <img src={loader} alt="loading..."/>}
          {attendeesForImages[0] && attendeesForImages.map((user, i) => <UserImage key={i} user={user}/>)}
          </div>
        </div>
      </div>
      </a>
    </div>
  );
}

export default EventCard;
