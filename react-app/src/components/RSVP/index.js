import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./index.css";

// click handler to add user to event

function RSVP({ user, event }) {
  return <AwesomeButton type="submit">RSVP</AwesomeButton>;
}

export default RSVP;