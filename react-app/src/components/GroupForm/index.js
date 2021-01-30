import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./index.css";

const createGroup = async (group_name, description, city, state, zip_code, image_url, leader_id) => {
  const response = await fetch("/api/groups/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      group_name,
      description,
      city,
      state,
      zip_code,
      image_url,
      leader_id
    }),
  });
  return await response.json();
};

const GroupForm = () => {

    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [leader_id, setLeaderId] = useState();


    const onSubmit = async(event) => {
        event.preventDefault();
        await createGroup(groupName, description, city, state, zipCode, imageUrl, leader_id)
        setGroupName("")
        setDescription("")
        setCity("")
        setState("")
        setZipCode(0)
        setImageUrl("")
        setLeaderId(0)
    }

    return (
      <form onSubmit={onSubmit}>
        <div>
          <label>Group Name</label>
          <input
            type="text"
            name="groupName"
            onChange={(event) => setGroupName(event.target.value)}
            value={groupName}
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
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
          ></input>
        </div>
        <div>
          <label>Leader</label>
          <input
            type="number"
            name="leader_id"
            onChange={(event) => setLeaderId(event.target.value)}
            value={leader_id}
          ></input>
        </div>
        <button type="submit">Create Group</button>
      </form>
    );
};

export default GroupForm;