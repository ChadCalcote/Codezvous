import React, { useState } from "react";
import "./index.css";

const createEvent = async (event_name, description, city, state, zip_code, virtual, type, image_url, group_id) => {
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
      group_id
    }),
  });
  return await response.json();
};

const EventFormReact = () => {

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState();
    const [virtual, setVirtual] = useState("False");
    const [type, setType] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [groupId, setGroupId] = useState();


    const onSubmit = async(e) => {
        e.preventDefault();
        const event = await createEvent(eventName, description, address, city, state, zipCode, virtual, type, imageUrl, groupId)
        if (event.errors) {
            return "Event Did Not Create";
        } else {
            return "<h1>Event Posted</h1>";
        }
    }

    return (
      <form onSubmit={onSubmit}>
        <div>
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            onChange={(event) => setEventName(event.target.value)}
            value={eventName}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></input>
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          ></input>
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            onChange={(event) => setCity(event.target.value)}
            value={city}
          ></input>
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            onChange={(event) => setState(event.target.value)}
            value={state}
          ></input>
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="number"
            name="zipCode"
            onChange={(event) => setZipCode(event.target.value)}
            value={zipCode}
          ></input>
        </div>
        <div>
          <label>Virtual Event?</label>
          <input
            type="checkbox"
            name="isVirtual"
            checked={!virtual}
            onChange={(event) => setVirtual(event.target.value)}
            value={virtual}
          ></input>
        </div>
        <div>
          <label>Event Type</label>
          <select
            onChange={(event) => setType(event.target.value)}
            value={type}
          >
              <option value='workshop'>Workshop</option>
              <option value='competition'>Competition</option>
              <option value='networking'>Networking Event</option>
              <option value='film'>Film</option>
              <option value='job fair'>Job Fair</option>
              <option value='talk'>Talk</option>
              <option value='pairboarding'>Pairboarding</option>
              <option value='meetup'>Meetup</option>
              <option value='hackathon'>Hackathon</option>
              <option value='meet and greet'>Meet and Greet</option>
              <option value='ama'>AMA</option>
              <option value='interview'>Interview</option>
              <option value='panel'>Panel</option>
              <option value='conference'>Conference</option>
              <option value='seminar'>Seminar</option>
              <option value='hang'>Hang</option>
              <option value='mixer'>Mixer</option>
              <option value='social'>Social</option>
              <option value='info session'>Info Session</option>
              <option value='dance'>Dance</option>
              <option value='whiteboard'>Whiteboard</option>
              {/* <option value='virtual'>Virtual event</option> not sure about this one */}
          </select>
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
          ></input>
        </div>
        {/* <div>
          <label>Group</label>
          <input
            type="number"
            name="group_id"
            onChange={(event) => setGroupId(event.target.value)}
            value={groupId}
          ></input>
        </div> */}
        <button type="submit">Create Group</button>
      </form>
    );
};

export default EventFormReact;