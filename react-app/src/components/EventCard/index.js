import React from "react";
import EventPage from "../EventPage";
import "./index.css";
import { BsCameraVideo } from 'react-icons/bs'
const EventCard = () => {

    return (
      <div className="event-card">
        <div className="event-card_date">Tue, Feb 2 5:30 PM</div>
        <div className="event-card_title">Event Title</div>
        <BsCameraVideo />
        <div className="event-card_virtual">Virtual Event</div>
        <div className="event-card_description">We love to code and raise hell!</div>
        <div className="event-card_attendees">127 Attendees</div>
        <>RSVP COMPONENT</>
      </div>
    );
}

export default EventCard;