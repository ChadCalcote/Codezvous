import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, formatDate } from '../../dateFunctions';
import { BsClock, BsCameraVideo, BsGeoAlt } from 'react-icons/bs';
import { fetchAllEvents } from "../../store/events";
import { fetchOneGroup } from "../../store/groups";
import { fetchEventUsers } from "../../store/users";
import { fetchAllComments } from "../../store/comments";
import UserImage from '../UserImage';
import AttendeeCard from "../AttendeeCard";
import EventGallery from '../EventGallery';
import CommentForm from '../CommentForm';
import CommentFeed from '../CommentFeed';
import RSVP from '../RSVP';
import bigLoader from '../../Spinner-1s-237px.gif';
import smallLoader from '../../Spinner-1s-30px.gif';
import "./EventPage.css";

const EventPage = () => {
  const history = useHistory();
  const params = useParams();
  const { eventId } = params;
  const dispatch = useDispatch();
  const [event, setEvent] = useState({});
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [numComments, setNumComments] = useState([]);
  const [commentsDisplayed, setCommentsDisplayed] = useState([]);
  const [leader, setLeader] = useState({});
  const [attendees, setAttendees] = useState([]);
  const [attending, setAttending] = useState(false);

  const events = useSelector(state => state.events);  // all events ever
  const group = useSelector(state => state.groups);  // 
  const users = useSelector(state => state.users);  // event attendees
  const comments = useSelector(state => state.comments); // event comments
  const currentUser = useSelector(state => state.session);
  const today = new Date()

  useEffect(() => {
    dispatch(fetchAllEvents()); // sets events redux.....triggers setSelectedEvents
    dispatch(fetchAllComments(eventId));
    dispatch(fetchEventUsers(eventId));
    async function fetchData() {
      const responseFromDb = await fetch(`/api/events/${eventId}`);
      const foundEvent = await responseFromDb.json();
      setEvent(foundEvent);
    }
    fetchData();
  }, [dispatch, eventId]);

  useEffect(() => {
    if (Array.isArray(comments)) {
      setNumComments(comments.length);
      setCommentsDisplayed(comments);
    }
  }, [comments]);

  useEffect(() => {
    function setSelectedEvents(events) {
      const eventsArray = events.events
      if (Array.isArray(eventsArray)) {
        setGalleryEvents(eventsArray.sort((a,b) => new Date(a.start_time) - new Date(b.start_time))
                                    .filter(event => new Date(event.start_time) > today)
                                    .slice(0, 6));  // sets gallery of 5 recommended events after today in chronological order
      }
    }
    if (events) {
      setSelectedEvents({ events }); //triggers redux state of group
    }
  }, [events, eventId]);

  useEffect(() => {
    if (event.group_id)
      dispatch(fetchOneGroup(event.group_id)); // sets redux state of groups to group hosting event....triggers group leader, attendees, attending
  }, [dispatch, event]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setLeader(users.find(user => user.id == group.leader_id)); //sets group leader
      setAttendees(users); //sets attendees to be users redux state
      if (users.find(user => user.id == currentUser.id)) {
        setAttending(true) //sets if user is attending event
      }
    }
  }, [users, currentUser.id, group.leader_id]);

  const deleteEventOnClick = async (e) => {
    const confirmation = window.confirm("Are you sure you want to delete this event?");

    if (confirmation) {
      await fetch(`/api/events/${eventId}`, { method: "DELETE" });
      history.push(`/groups/${group.id}`);
    } else {
      return null;
    }
  }

  return (
    <div className="event-page_wrapper">
      <div className="event-page">
        <div className="event-header">
          <div className="event-header-content">
            <div className="event-header_date">
              {!event && !event.start_time && <img src={smallLoader} alt="loading..." />}
              {event && event.start_time && <h4>{formatDate(event.start_time, 'long')}</h4>}
              {}
            </div>
            <div className="event-header_title">
              <h1>{event.event_name}</h1>
            </div>
            <div className="event-header_leader">
              {!leader && <img src={bigLoader} alt="loading..." />}
              {leader && <UserImage className="leader-image" user={leader} />}
              <div className="hosted-by">
                Hosted by
                {leader ? <h3>{leader.username}</h3> : <img src={smallLoader} alt="loading..." />}
              </div>
              </div>
            </div>
              {group.leader_id == currentUser.id ? <button className="delete-event_button" onClick={deleteEventOnClick}>
                <Link>Cancel Event</Link>
                </button>: null}
        </div>
        <hr color="#2C2629" />
        <div className="event-body-container">
          <div className="event-body">
            <div className="event-body_feed">
              <div id="event-body_feed_details">
                <h2 id="body-color">Details</h2>
                <p>{event.description}</p>
              </div>
              <h2 id="body-color">Attendees ({users.length})</h2>
              <div id="event-body_feed_attendees">
                {attendees.slice(0, 8).map(attendee => {
                  return <AttendeeCard user={attendee} key={attendee.id} />
                })}
              </div>
              <div id="event-body_feed_comments">
                <h2 id="body-color">Comments ({numComments ? numComments : 0})</h2>
              </div>
              <CommentForm commentsDisplayed={commentsDisplayed} setCommentsDisplayed={setCommentsDisplayed} user={currentUser} />
              <div className="comment-feeds">
                <CommentFeed comments={commentsDisplayed} />
              </div>
            </div>
            <div className="event-body_sidebar">
              <div id="event-body_sidebar_group">
                <img id="event-body_sidebar_group-image" src={group.image_url} href={`/groups/${group.id}`} alt='group' />
                <br />
                <a href={`/groups/${group.id}`}>{group.group_name}</a>
                <h4>Public Group</h4>
              </div>
              <div id="event-body_sidebar_details">
                <div><BsClock className="icons" />{formatDate(event.start_time, 'long')}</div>
                <div>{`${formatTime(event.start_time)} to ${formatTime(event.end_time)}`} </div>
                <br />
                <div id="event-body_sidebar_location">
                  {event.virtual ? <><BsCameraVideo className="icons" />Virtual event</> : <><div><BsGeoAlt className="icons" />{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
                </div>
              </div>
            </div>
          </div>
          <hr color="#2C2629" />
          <div className="event-sim-events">
            <h2 id="body-color">Similar events nearby</h2>
            <EventGallery events={galleryEvents} parent={"eventPage"} user={currentUser} />
          </div>
        </div>
      </div>
      <footer hidden={attending} className="event-footer">
        <div className="event-footer_contents">
          {event.start_time && event.end_time && <h3>{formatDate(event.start_time, "short")} • {formatTime(event.end_time, "short")}</h3>}
        </div>
        <div className="event-footer_contents">
          <h2>{event.event_name}</h2>
        </div>
        <div className="event-footer_contents">
          <h3 hidden={!attending}>You are attending this event.</h3>
          <RSVP
            event={event}
            user={currentUser}
            attendees={attendees}
            setAttendees={setAttendees}
            attending={attending}
            setAttending={setAttending}
          />
        </div>
      </footer>
    </div>
  );
}

export default EventPage;
