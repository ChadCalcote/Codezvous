import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EventPage from "../EventPage";
import { fetchAllUsers } from "../../store/users";
import { BsCameraVideo, BsGeoAlt } from 'react-icons/bs';
import "./index.css";

const event = {
  id: 23,
  event_name: "Showing of The Social Network",
  description:
    "Come join us to watch The Social Network starring Jesse Eisenberg depicting Mark Zuckerberg and the triumphs and trials of starting Facebook",
  address: "275 Easton Town Center",
  city: "Columbus",
  state: "Ohio",
  zip_code: 43219,
  virtual: false,
  type: "Movie",
  status: "upcoming",
  group_id: 41,
  image_url: "https://assets.fortnitecreativehq.com/wp-content/uploads/2019/02/04052712/Movie-theatre.jpg",
  start_time: "2021-04-12 12:05:00",
  end_time: "2021-04-12 14:50:00",
  createdAt: "2020-10-18T20:26:34.256Z",
  updatedAt: "2020-10-18T20:26:34.256Z",
};

const EventCard = ({  }) => {

  const users = useSelector(reduxState => {
    return reduxState.users
  })

  useEffect( () =>{
    dispatch(fetchAllUsers(event.eventId))
  },[dispatch])

  return (
    <div className="event-card">
      <div className="event-card_date">{event.start_time}</div>
      <div className="event-card_title">{event.event_name}</div>
      <BsCameraVideo />
      <div className="event-card_location">
        {event.virtual ? <><BsCameraVideo /><p>Virtual event</p></> : <><div><BsGeoAlt />{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
      </div>
      <div className="event-card_description">{event.description}</div>
      <div className="event-card_attendees">127 Attendees</div>
      <>RSVP COMPONENT</>
    </div>
  );
}

export default EventCard;