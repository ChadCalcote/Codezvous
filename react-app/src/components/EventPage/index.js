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
import RSVP from '../RSVP';
import "./EventPage.css";

const EventPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [ event, setEvent ] = useState({});
    const [ galleryEvents, setGalleryEvents ] = useState([]);
    const [ numComments, setNumComments ] = useState([]);

    const { eventId } = params;

    const events = useSelector(reduxState => {
      return reduxState.events;
    });

    const group = useSelector(reduxState => {
      return reduxState.groups;
    });

    const users = useSelector(reduxState => {
      return reduxState.users;
    });

    const comments = useSelector(reduxState => {
      return reduxState.comments;
    });

    const currentUser = useSelector(reduxState => {
      return reduxState.session;
    });

    useEffect(() => {
      dispatch(fetchAllEvents());
      dispatch(fetchAllComments(eventId));
      dispatch(fetchEventUsers(eventId));
    }, []);

    useEffect(() => {
      dispatch(fetchAllComments(eventId));
    }, [CommentForm]);

    useEffect(() => {
      setNumComments(comments.length);
    }, [comments]);

    useEffect(() => {
      function chooseOneEvent(events) {
        const eventsArray = events.events
        if (Array.isArray(eventsArray)){
          setEvent(eventsArray.find(event => eventId == event.id));
        }
      };
      function chooseFourEvents(events) {
        const eventsArray = events.events
        if (Array.isArray(eventsArray)){
          setGalleryEvents(eventsArray.slice(0,3));
        }
      }
      chooseOneEvent({events});
      chooseFourEvents({events});
    }, [events]);

    useEffect(() => {
      dispatch(fetchOneGroup(event.group_id));
    }, [event]);

    useEffect(() => {
      if (Array.isArray(users)){
        setLeader(users.find(user => user.id == group.leader_id));
        setAttendees(users);
        console.log(users);
      }
    }, [users, group]);

    const [leader, setLeader] = useState({});
    const [attending, setAttending] = useState(false);
    const [commentHasText, setCommentHasText] = useState(false);
    const [attendees, setAttendees] = useState([]);

    return (
      <div className="event-page_wrapper">
        <div className="event-page">
          <div className="event-header">
            <div className="event-header_date">
              <h4>{formatDate(event.start_time, 'long')}</h4>
            </div>
            <div className="event-header_title">
              <h1>{event.event_name}</h1>
            </div>
            <div className="event-header_leader">
              {leader ? <UserImage className="leader-image" user={leader} />: <img src='../../Bars-0.7s-98px.gif'/>}
              <div className="hosted-by">
                Hosted by
                {leader ? <h3>{leader.username}</h3> : <img src='../../Bars-0.7s-98px.gif'/> }
              </div>
            </div>
          </div>
          <hr color="#2C2629"/>
          <div className="event-body">
            <div className="event-body_feed">
              <div id="event-body_feed_details">
                <h2 id="body-color">Details</h2>
                <p>{event.description}</p>
              </div>
                <h2 id="body-color">Attendees ({users.length})</h2>
              <div id="event-body_feed_attendees">
                { attendees.slice(0, 7).map(attendee => {
                  return <AttendeeCard user={attendee} />
                })}
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
                  <h4>Public Group</h4>
                </div>
                <div id="event-body_sidebar_details">
                  <div><BsClock className="icons"/>{formatDate(event.start_time, 'long')}</div>
                  <div>{`${formatTime(event.start_time)} to ${formatTime(event.end_time)}`} </div>
                  <br />
                  <div id="event-body_sidebar_location">
                    {event.virtual ? <><BsCameraVideo className="icons"/>Virtual event</> : <><div><BsGeoAlt className="icons"/>{event.address}</div><div>{event.city}, {event.state} {event.zip_code}</div></>}
                  </div>
                </div>
            </div>
          </div>
          <hr color="#2C2629"/>
          <div className="event-sim-events">
            <h2 id="body-color">Similar events nearby</h2>
            <EventGallery events={events} parent={"eventPage"}/>
          </div>
        </div>
        <footer className="event-footer">
          <div className="event-footer_contents">
            {event.start_time && event.end_time && <h3>{formatDate(event.start_time, "short")} • {formatTime(event.end_time, "short")}</h3>}
            <h2>{event.event_name}</h2>
            <RSVP event={event}/>
          </div>
        </footer>
      </div>
    );
}

export default EventPage;
