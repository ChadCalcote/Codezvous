import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const EventFormReact = () => {
    
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
    
    const onSubmit = async (e) => {
        e.preventDefault();
        await createEvent(eventName, description, address, city, state, zipCode, virtual, type, imageUrl, groupId, startTime, endTime, status)
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
        history.goBack()
    }

    return ( 
        <form className="event-form"onSubmit={onSubmit}>
            <div className="form-wrapper">
                <div>
                    <label>Event Name</label>
                    <br />
                    <input
                        type="text"
                        name="eventName"
                        onChange={(event) => setEventName(event.target.value)}
                        value={eventName}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Description</label>
                    <br />
                    <textarea
                        className="description"
                        type="text"
                        name="description"
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                    ></textarea>
                </div>
                <br />
                <div>
                    <label>Address</label>
                    <br />
                    <input
                        type="text"
                        name="address"
                        onChange={(event) => setAddress(event.target.value)}
                        value={address}
                    ></input>
                </div>
                <br />
                <div>
                    <label>City</label>
                    <br />
                    <input
                        type="text"
                        name="city"
                        onChange={(event) => setCity(event.target.value)}
                        value={city}
                    ></input>
                </div>
                <br />
                <div>
                    <label>State</label>
                    <br />
                    <input
                        type="text"
                        name="state"
                        onChange={(event) => setState(event.target.value)}
                        value={state}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Zip Code</label>
                    <br />
                    <input
                        type="number"
                        name="zipCode"
                        onChange={(event) => setZipCode(event.target.value)}
                        value={zipCode}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Virtual Event?</label>
                    <br />
                    <input
                        type="checkbox"
                        name="isVirtual"
                        checked={virtual}
                        onChange={(event) => setVirtual(event.target.value)}
                        value={virtual}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Event Type</label>
                    <br />
                    <select 
                        onChange={(event) => setType(event.target.value)}
                        value={type}
                    >
                        <option value=''>Select Event Type</option>
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
                <br />
                <div>
                    <label>Image URL</label>
                    <br />
                    <input
                        type="text"
                        name="imageUrl"
                        onChange={(event) => setImageUrl(event.target.value)}
                        value={imageUrl}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Group</label>
                    <br />
                    <input
                        type="number"
                        name="group_id"
                        onChange={(event) => setGroupId(event.target.value)}
                        value={groupId}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Choose a time for your meeting:</label>
                    <br />
                    <input type="datetime-local"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                        required
                        >
                    </input>
                </div>
                <br />
                <div>
                    <label>Choose a time for your meeting:</label>
                    <br />
                    <input type="datetime-local" 
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                        required
                        >
                    </input>
                </div>
                <br />
                <button className="event-form-submit-button" type="submit">Create Event</button>
            </div>
      </form>
    );
};

export default EventFormReact;