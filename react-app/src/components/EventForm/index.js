import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import "./EventForm.css";

const createEvent = async (event_name, description, address, city, state, zip_code, virtual, type, image_url, group_id, start_time, end_time, status) => {
  const response = await fetch("/api/events/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_name,
      description,
      address,
      city,
      state,
      zip_code,
      virtual,
      type,
      image_url,
      group_id,
      start_time,
      end_time,
      status
    }),
  });
  return await response.json();
};

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

const EventFormReact = () => {
  const location = useLocation()
  const history = useHistory()
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState();
  const [virtual, setVirtual] = useState(false);
  const [type, setType] = useState("Workshop");
  const [imageUrl, setImageUrl] = useState("");
  const [groupId, setGroupId] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session);

  useEffect(() => {
    setGroupId(location.state.groupId)
  },[location])

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newEvent = await createEvent(eventName, description, address, city, state, zipCode, virtual, type, imageUrl, groupId, startTime, endTime, status)
    if (!newEvent.errors) {
    setEventName("")
    setDescription("")
    setAddress("")
    setCity("")
    setState("")
    setZipCode("")
    setVirtual(false)
    setType("")
    setImageUrl("")
    setGroupId("")
    setStartTime("")
    setEndTime("")
    setStatus("Ongoing")
    await createRSVP(user.id, newEvent.id);
    history.push(`/events/${newEvent.id}`);
  } else {
      setErrors(newEvent.errors);
    }
  }

  return (
    <form className="event-form" onSubmit={onSubmit}>
      <div className="form-wrapper">
        <div className="event-form-label">
          <label>Event Name</label>
        </div>
        <div className="event-form-input">
          <input
            type="text"
            name="eventName"
            onChange={(event) => setEventName(event.target.value)}
            value={eventName}
          />
        </div>
        <div className="event-form-label">
          <label>Description</label>
        </div>
        <div className="event-form-input">
          <textarea
            className="description"
            type="text"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className="event-form-label">
          <label>Address</label>
        </div>
        <div className="event-form-input">
          <input
            type="text"
            name="address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          />
        </div>
        <div className="event-form-label">
          <label>City</label>
        </div>
        <div className="event-form-input">
          <input
            type="text"
            name="city"
            onChange={(event) => setCity(event.target.value)}
            value={city}
          />
        </div>
        <div className="event-form-label">
          <label>State</label>
        </div>
        <div className="event-form-input">
          <input
            type="text"
            name="state"
            onChange={(event) => setState(event.target.value)}
            value={state}
          />
        </div>
        <div className="event-form-label">
          <label>Zip Code</label>
        </div>
        <div className="event-form-input">
          <input
            type="number"
            name="zipCode"
            onChange={(event) => setZipCode(event.target.value)}
            value={zipCode}
          />
        </div>
        <div className="virtual event-form-label">
          <label>Virtual Event?</label>
          <input
            type="checkbox"
            name="isVirtual"
            checked={virtual}
            onChange={(event) => setVirtual(!!event.target.value)}
            value={virtual}
          />
        </div>
        <div className="event-form-label">
          <label>Event Type</label>
        </div>
        <div className="event-form-input">
          <select
            onChange={(event) => setType(event.target.value)}
            value={type}
          >
            <option value="">Select Event Type</option>
            <option value="workshop">Workshop</option>
            <option value="competition">Competition</option>
            <option value="networking">Networking Event</option>
            <option value="film">Film</option>
            <option value="job fair">Job Fair</option>
            <option value="talk">Talk</option>
            <option value="pairboarding">Pairboarding</option>
            <option value="meetup">Meetup</option>
            <option value="hackathon">Hackathon</option>
            <option value="meet and greet">Meet and Greet</option>
            <option value="ama">AMA</option>
            <option value="interview">Interview</option>
            <option value="panel">Panel</option>
            <option value="conference">Conference</option>
            <option value="seminar">Seminar</option>
            <option value="hang">Hang</option>
            <option value="mixer">Mixer</option>
            <option value="social">Social</option>
            <option value="info session">Info Session</option>
            <option value="dance">Dance</option>
            <option value="whiteboard">Whiteboard</option>
            {/* <option value='virtual'>Virtual event</option> not sure about this one */}
          </select>
        </div>
        <div className="event-form-label">
          <label>Image URL</label>
          <div className="event-form-input"></div>
          <input
            type="text"
            name="imageUrl"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
          />
        </div>
        <div className="event-form-label">
          <label>Choose a start time for your event:</label>
        </div>
        <div className="event-form-input">
          <input
            type="datetime-local"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            required
          />
        </div>
        <div className="event-form-label">
          <label>Choose a end time for your event:</label>
        </div>
        <div className="event-form-input">
          <input
            type="datetime-local"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            required
          />
        </div>
        <div className="event-form_errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <button className="event-form-submit-button" type="submit">
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventFormReact;