import React from "react";
import "./index.css";

function RSVP({ event, user, attendees, setAttendees, attending, setAttending }) {

  async function createRSVP(userid, eventid) {
    const response = await fetch(`/api/events/${eventid}/rsvps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userid
      }),
    });
    return await response.json()
  };

  async function handleClick () {
    await createRSVP(user.id, event.id);
    setAttending(true);
    setAttendees([...attendees, ...user]);
  };

  function showButton () {
    if (!attending){
      return <button className="RSVP-button" onClick={handleClick}>RSVP</button>;
    };
  };

    return <>{showButton()}</>
  }

export default RSVP;