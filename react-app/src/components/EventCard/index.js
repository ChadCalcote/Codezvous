import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventPage from "../EventPage";
import { fetchEventUsers } from "../../store/users";
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import RSVP from "../RSVP"
import "./index.css";
import UserImage from "../UserImage";
import { formatDate } from "../../dateFunctions";
import "../../../public/"

const EventCard = ({ event }) => {
  const dispatch = useDispatch();

  const users = useSelector(reduxState => {
    return reduxState.users;
  })

  useEffect( () =>{
    dispatch(fetchEventUsers(event.id));
  },[dispatch])

  return (
    <div className="event-card">
      <a href={`/events/${event.id}`}>
      <div className="event-card_date">
        {!event.start_time && <img src={"../../../public/Bars-0.7s-98px.gif"}>Loading...</>}
        {formatDate(event.start_time, 'long')}
      </div>
      <div className="event-card_title">{event.event_name}</div>
      <div className="event-card_location">
        {event.virtual 
          ? <><BsCameraVideo /><p>Virtual event</p></> 
          : <><div><BsGeoAlt />{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
      </div>
      <div className="event-card_description">{event.description}</div>
      <div className="event-card_attendees">
        <div className="event-card_attendees_total">
          {/* {users.length > 0 ? `${users.length} going` : "1 going"} */}
        </div>
        <div className="event-card_attendees_pics">
        {users.length > 0 ? users.slice(0, 3).map(user => <UserImage user={user}/>) : <BsPerson />}
        </div>
      </div>
      </a>
      <RSVP event={event}/>
    </div>
  );
}

export default EventCard;