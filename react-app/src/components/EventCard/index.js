import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventUsers } from "../../store/users";
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import RSVP from "../RSVP"
import UserImage from "../UserImage";
import { formatDate, formatTime } from "../../dateFunctions";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();

  const [ users, setUsers ] = useState([])

  useEffect(() =>{
    const fetchUsers = async() => {
      const response = await fetch(`/api/events/${event.id}/attendees`)
      const users = await response.json()
      setUsers(users)
    }
    fetchUsers()
  },[])

  return (
    <div className="event-card">
      <a href={`/events/${event.id}`}>
      <div className="event-card_date">
        {!event.start_time && <img src='../../Bars-0.7s-98px.gif'/>}
        {formatDate(event.start_time, 'long')}
        {formatTime(event.start_time)}
      </div>
      <div className="event-card_title">{event.event_name}</div>
      <div className="event-card_location">
        {event.virtual ?
            <><BsCameraVideo /><p>Virtual event</p></> 

          : <><div><BsGeoAlt />{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
      </div>
      <div className="event-card_description">{event.description}</div>
      <div className="event-card_attendees">
        <div className="event-card_attendees_total">
          {users && users.length > 0 ? `${users.length} going` : "1 going"}
        </div>
        <div className="event-card_attendees_pics">
        {users.length > 0 ? users.slice(0, 3).map(user => <UserImage key={user.id} user={user}/>) : <BsPerson />}
        </div>
      </div>
      </a>
      <RSVP event={event}/>
    </div>
  );
}

export default EventCard;
