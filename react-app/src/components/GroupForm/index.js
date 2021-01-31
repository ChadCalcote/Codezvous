import React, { useState } from "react";
import "./GroupForm.css";

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
      <form className="group-form" onSubmit={onSubmit}>
        <div className="form-wrapper">
          <div>
            <label>Group Name</label>
            <br />
            <input
              type="text"
              name="groupName"
              onChange={(event) => setGroupName(event.target.value)}
              value={groupName}
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
            <label>Leader</label>
            <br />
            <input
              type="number"
              name="leader_id"
              onChange={(event) => setLeaderId(event.target.value)}
              value={leader_id}
            ></input>
          </div>
          <br />
          <button type="submit">Create Group</button>
        </div>
      </form>
    );
};

export default GroupForm;
