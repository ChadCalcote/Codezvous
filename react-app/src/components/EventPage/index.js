import { useParams } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
// List Out Data from Single Event
// List Out Data about Attendees
// List Out Data about Comments
    // Add, Edit, Delete Comments
// RSVP Button
// If User is Event Owner, Display Edit Form & Delete Button

const EventPage = () => {
    const params = useParams();

    const { eventId } = params;

    // Set State
    const [leader, setLeader] = useState(false);
    const [attending, setAttending] = useState(false);
    const [commentHasText, setCommentHasText] = useState(false);

    return (
      <>
        <h1>Event Page!</h1>
      </>
    );


}

export default EventPage;