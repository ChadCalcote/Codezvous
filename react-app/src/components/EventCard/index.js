import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventPage from "../EventPage";
import { fetchEventUsers } from "../../store/users";
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import RSVP from "../RSVP"
import "./index.css";
import UserImage from "../UserImage";

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
  const dispatch = useDispatch();

  const users = useSelector(reduxState => {
    return reduxState.users;
  })

  useEffect( () =>{
    dispatch(fetchEventUsers(event.id));
  },[dispatch])

  return (
    <div className="event-card">
      <div className="event-card_date">{event.start_time}</div>
      <div className="event-card_title">{event.event_name}</div>
      <div className="event-card_location">
        {event.virtual ? <><BsCameraVideo /><p>Virtual event</p></> : <><div><BsGeoAlt />{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
      </div>
      <div className="event-card_description">{event.description}</div>
      <div className="event-card_attendees">
        <div className="event-card_attendees_pics">
        {users.length > 0 ? users.slice(0, 2).map(user => <UserImage image={user.image_url} />) : <BsPerson />}
        </div>
        <div className="event-card_attendees_total">
          {users.length > 0 ? `${users.length} going` : "1 going"}
        </div>
      </div>
      <RSVP />
    </div>
  );
}

export default EventCard;