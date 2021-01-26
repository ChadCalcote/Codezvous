import { useParams } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
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
  start_time: "2021-04-12 12:05:00 America/Chicago",
  end_time: "2021-04-12 14:50:00 America/Chicago",
  createdAt: "2020-10-18T20:26:34.256Z",
  updatedAt: "2020-10-18T20:26:34.256Z",
};

const EventPage = () => {
    const params = useParams();

    const { eventId } = params;

    // Set State
    const [leader, setLeader] = useState(false);
    const [attending, setAttending] = useState(false);
    const [commentHasText, setCommentHasText] = useState(false);

    return (
      <div className="event-page">
        <h1>Event Page!</h1>
        <div className="event-header">
          <div className="event-header_date"></div>
          <div className="event-header_title"></div>
          <div className="event-header_leader"></div>
        </div>
        <div className="event-body">
          <div className="event-body_feed">
            <div id="event-body_feed_details"></div>
            <div id="event-body_feed_attendees"></div>
            <div id="event-body_feed_comments"></div>
          </div>
          <div className="event-body_sidebar">
              <div id="event-body_sidebar_group"></div>
              <div id="event-body_sidebar_details"></div>
          </div>
          <div className="event-body_sim-events">
              {/* header tag */}
              {/* Event Components */}
          </div>
        </div>
        <div className="event-footer">
            {/* Event Details  */}
            {/* RSVP COMPONENT  */}
        </div>
      </div>
    );


}

export default EventPage;