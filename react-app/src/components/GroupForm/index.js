import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./GroupForm.css";


const GroupForm = () => {
  const history = useHistory();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const currentUser = useSelector(state => state.session);

  const createGroup = async (group_name, description, city, state, zip_code, image_url) => {
    const leader_id = currentUser.id
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const group = await createGroup(groupName, description, city, state, zipCode, imageUrl);
    setGroupName("");
    setDescription("");
    setCity("");
    setState("");
    setZipCode(0);
    setImageUrl("");
    history.push(`/groups/${group.id}`);
  };

  return (
    <form className="group-form" onSubmit={onSubmit}>
      <div className="form-wrapper">
        <div className="group-form-label">
          <label>Group Name</label>
        </div>
        <div className="group-form-input">
          <input
            type="text"
            name="groupName"
            onChange={(event) => setGroupName(event.target.value)}
            value={groupName}
          />
        </div>
        <div className="group-form-label">
          <label>Description</label>
        </div>
        <div className="group-form-input">
          <textarea
            className="description"
            type="text"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
        <div className="group-form-label">
          <label>City</label>
        </div>
        <div className="group-form-input">
          <input
            type="text"
            name="city"
            onChange={(event) => setCity(event.target.value)}
            value={city}
          />
        </div>
        <div className="group-form-label">
          <label>State</label>
        </div>
        <div className="group-form-input">
          <input
            type="text"
            name="state"
            onChange={(event) => setState(event.target.value)}
            value={state}
          />
        </div>
        <div className="group-form-label">
          <label>Zip Code</label>
        </div>
        <div className="group-form-input">
          <input
            name="zipCode"
            onChange={(event) => setZipCode(event.target.value)}
            value={zipCode}
          />
        </div>
        <div className="group-form-label">
          <label>Image URL</label>
        </div>
        <div className="group-form-input">
          <input
            type="text"
            name="imageUrl"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
          />
        </div>
        <button type="submit" className="group-form-submit-button">Create Group</button>
      </div>
    </form>
  );
};

export default GroupForm;
