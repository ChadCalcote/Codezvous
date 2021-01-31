import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from "../../store/session";
import { fetchUserRSVPs } from "../../store/rsvps";
import "./index.css";

function RSVP({ event }) {
  const dispatch = useDispatch();

  const [ attending, setAttending ] = useState(false);

  const user = useSelector(reduxState => {
    return reduxState.session;
  })

  const rsvps = useSelector(reduxState => {
    return reduxState.RSVPs
  })

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

  useEffect(()=>{
    dispatch(getCurrentUser);
  },[dispatch]);

  useEffect(()=>{
    dispatch(fetchUserRSVPs(user.id))
  },[user])

  useEffect(() => {
    if (Array.isArray(rsvps)) {
      for (let i=0; i< rsvps.length; i++){
        if (rsvps[i].id === user.id) {
          setAttending(true)
          return;
        }
      } 
    }
  },[rsvps, user])

  async function handleClick () {
    await createRSVP(user.id, event.id);
    setAttending(true);
  };

  function showButton () {
    if (attending){
      return "See you there!"
    }else {
      return <button onClick={handleClick}>RSVP</button>;
    };
  };

    return <>{showButton()}</>
  }

export default RSVP;