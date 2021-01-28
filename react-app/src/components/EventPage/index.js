import { useParams } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { formatTime, formatDate } from '../../dateFunctions';
import { BsClock, BsCameraVideo, BsGeoAlt } from 'react-icons/bs'
import "./EventPage.css"
import { setEvents, fetchAllEvents } from "../../store/events"
import AttendeeCard from "../AttendeeCard";

// List Out Data from Single Event
// List Out Data about Attendees
// List Out Data about Comments
    // Add, Edit, Delete Comments
// RSVP Button
// If User is Event Owner, Display Edit Form & Delete Button

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

const EventPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { eventId } = params;

    const events = useSelector(reduxState => {
      return reduxState.events

    })

    useEffect(() => {
      dispatch(fetchAllEvents())
    }, [])

    // Set State
    const [leader, setLeader] = useState(false); //can the current user edit/delete the event
    const [attending, setAttending] = useState(false);
    const [commentHasText, setCommentHasText] = useState(false);

    return (
      <div className="event-page">
        <div className="event-header">
          <div className="event-header_date">
            <h4>{formatDate(event.start_time, 'long')}</h4>
          </div>
          <div className="event-header_title">
            <h1>{event.event_name}</h1>
          </div>
          <div className="event-header_leader">
            <p>Hosted by</p>
            Jimmy
            {/* {TODO: Need to setup a useEffect/State for selecting groupleader id to get name} */}
          </div>
        </div>
        <hr color="#2C2629"/>
        <div className="event-body">
          <div className="event-body_feed">
            <div id="event-body_feed_details">
              <h2>Details</h2>
              <p>{event.description}</p>
              {/* <video class="header-video" autoplay="true" loop="true" src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4"></video> */}
            </div>
            <div id="event-body_feed_attendees">
              <h2>Attendees (99{/* TODO: need to setup a useEffect/State for selecting users who are attending and sum*/})</h2> 
              {/* <AttendeeCard /> */}
              {/* TODO: Attendee Card => need to setup a useEffect/State for selecting users who are attending */}
            </div>
            <div id="event-body_feed_comments">
              <h2>Comments</h2>
              {/* TODO: Comment Component => will need to setup state for user/comments and pass in */}
              <form method="POST" action="/api/routeMcRouterson">
                <button>Add Comment</button>
                {/* TODO: Delete button and place in flask form */}
              </form>
            </div>
          </div>
          <div className="event-body_sidebar">
              <div id="event-body_sidebar_group">
                {/* TODO: Group_Id.image_url */}
                <p>{event.group_id}</p> {/*TODO: Group_Id => group_name*/ }
              </div>
              <div id="event-body_sidebar_details">
                <div><BsClock />{formatDate(event.start_time, 'long')}</div>
                <div>{`${formatTime(event.start_time)} to ${formatTime(event.end_time)}`} </div>
                <div id="event-body_sidebar_location">
                  {event.virtual ? <><BsCameraVideo /><p>Virtual event</p></> : <><div><BsGeoAlt />{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
                </div>
              </div>
          </div>
        </div>
        <hr color="#2C2629"/>
        <div className="event-sim-events">
          <h2>Similar events nearby</h2>
            {/* header tag */}
            {/* Event Components */}
        </div>
        <div className="event-footer">
            <h3>{formatDate(event.start_time, "short")} - {formatTime(event.start_time)}</h3>
            <h2>{event.event_name}</h2>
            {/* Event Details  */}
            {/* RSVP COMPONENT  */}
        </div>
      </div>
    );


}

export default EventPage;