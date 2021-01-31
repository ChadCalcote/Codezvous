import { useParams } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, formatDate } from '../../dateFunctions';
import { BsClock, BsCameraVideo, BsGeoAlt } from 'react-icons/bs';
import { fetchAllEvents, fetchOneEvent } from "../../store/events";
import { fetchOneGroup } from "../../store/groups";
import { fetchSingleUser, fetchEventUsers } from "../../store/users";
import { fetchAllComments } from "../../store/comments";
import AttendeeCard from "../AttendeeCard";
import UserImage from '../UserImage';
import EventGallery from '../EventGallery';
import CommentForm from '../CommentForm';
import CommentFeed from '../CommentFeed';
import "./EventPage.css";

// List Out Data from Single Event
// List Out Data about Attendees
// List Out Data about Comments
    // Add, Edit, Delete Comments
// RSVP Button
// If User is Event Owner, Display Edit Form & Delete Button

const EventPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [ event, setEvent ] = useState({});
    const [ galleryEvents, setGalleryEvents ] = useState([]);
    const [ numComments, setNumComments ] = useState([]);

    const { eventId } = params;

    const events = useSelector(reduxState => {
      return reduxState.events
    })

    // const event = useSelector(reduxState => {
    //   eventsArray = { events }
    //   return reduxState.events
    // }).find(event => event.id = eventId)

    const group = useSelector(reduxState => {
      return reduxState.groups
    })

    const users = useSelector(reduxState => {
      return reduxState.users
    })

    const comments = useSelector(reduxState => {
      return reduxState.comments
    })

    const currentUser = useSelector(reduxState => {
      return reduxState.session
    })

// setup groups state to be the one group holding the event

    useEffect(() => {
      dispatch(fetchAllEvents())
      dispatch(fetchAllComments(eventId))
      dispatch(fetchEventUsers(eventId))
    }, [])

    useEffect(() => {
      setNumComments(comments.length)
    }, [comments])

    useEffect(() => {
      function chooseOneEvent(events) {
        const eventsArray = events.events
        if (Array.isArray(eventsArray)){
          setEvent(eventsArray.find(event => eventId == event.id))
        }
      }
      function chooseFourEvents(events) {
        const eventsArray = events.events
        if (Array.isArray(eventsArray)){
          setGalleryEvents(eventsArray.slice(0,3))
        }
      }
      chooseOneEvent({events})
      chooseFourEvents({events})
    }, [events])

    useEffect(() => {
      dispatch(fetchOneGroup(event.group_id))

    }, [event])

    useEffect(() => {
      if (Array.isArray(users)){
        setLeader(users.find(user => user.id == group.leader_id))
        setAttendees(users)
        console.log(users)
      }
    }, [users, group])


    // Set State
    const [leader, setLeader] = useState({}); //can the current user edit/delete the event
    const [attending, setAttending] = useState(false);
    const [commentHasText, setCommentHasText] = useState(false);
    const [attendees, setAttendees] = useState([])


    return (
      <div className="event-page">
        <div className="event-header">
          <div className="event-header_date">
            <h4>{formatDate(event.start_time, 'long')}</h4>
          </div>
          <div className="event-header_title">
            <h1>{event.event_name}</h1>
          </div>
          <div className="event-header_leader">
            {leader ? <UserImage className="leader-image" user={leader} />: "loading"}
            <div className="hosted-by">
              Hosted by
              {leader ? <h3>{leader.username}</h3> :"loading"}
            </div>
          </div>
        </div>
        <hr color="#2C2629"/>
        <div className="event-body">
          <div className="event-body_feed">
            <div id="event-body_feed_details">
              <h2 id="body-color">Details</h2>
              <p>{event.description}</p>
              {/* <video class="header-video" autoplay="true" loop="true" src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4"></video> */}
            </div>
            <div id="event-body_feed_attendees">
              <h2 id="body-color">Attendees ({users.length})</h2>
              {/* need to work on this */}
              <div className="top-row">
                { attendees.slice(0, 1).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
                <br />
                { attendees.slice(1, 2).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
                <br />
                { attendees.slice(2, 3).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
                <br />
                { attendees.slice(3, 4).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
              </div>
              <br />
              <div className="bottom-row">
                { attendees.slice(4, 5).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
                <br />
                { attendees.slice(5, 6).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
                <br />
                { attendees.slice(6, 7).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
                <br />
                { attendees.slice(7, 8).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
              </div>
              {/* TODO: Attendee Card => need to setup a useEffect/State for selecting users who are attending */}
            </div>
            <div id="event-body_feed_comments">
              <h2 id="body-color">Comments ({numComments? numComments : 0})</h2>
            </div>
            <CommentForm />
            <CommentFeed comments={comments} />
          </div>
          <div className="event-body_sidebar">
              <div id="event-body_sidebar_group">
                <img src={group.image_url} href={`/groups/${group.id}`} />
                <br />
                <a href={`/groups/${group.id}`}>{group.group_name}</a>
              </div>
              <div id="event-body_sidebar_details">
                <div><BsClock className="icons"/>{formatDate(event.start_time, 'long')}</div>
                <div>{`${formatTime(event.start_time)} to ${formatTime(event.end_time)}`} </div>
                <div id="event-body_sidebar_location">
                  {event.virtual ? <><BsCameraVideo className="icons"/>Virtual event</> : <><div><BsGeoAlt className="icons"/>{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
                </div>
              </div>
          </div>
        </div>
        <hr color="#2C2629"/>
        <div className="event-sim-events">
          <h2>Similar events nearby</h2>
          <EventGallery selectedEvents={galleryEvents}/>
          {/* event gallery with 4 random events */}
            {/* header tag */}
            {/* Event Components */}
        </div>
        <div className="event-footer">
            {/* <h3>{formatDate(event.start_time, "short")} - {formatTime(event.start_time)}</h3> */}
            <h2>{event.event_name}</h2>
            {/* Event Details  */}
            {/* RSVP COMPONENT  */}
        </div>
      </div>
    );


}

export default EventPage;
