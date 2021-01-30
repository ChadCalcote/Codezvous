import { useParams } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { formatTime, formatDate } from '../../dateFunctions';
import "./GroupPage.css"
import { fetchAllGroups, fetchOneGroup } from "../../store/groups"
import { fetchGroupUsers } from "../../store/users";
import { getCurrentUser } from "../../store/session";
import { fetchGroupEvents } from "../../store/events";
import { createUserGroup } from "../../store/userGroups";
import { BsGeoAlt, BsPeople } from 'react-icons/bs';
import EventCard from '../EventCard';
import GroupCard from '../GroupCard';
import EventGallery from '../EventGallery';
import RSVP from '../RSVP';
import UserImage from '../UserImage';

// List Out Data from Single Event
// List Out Data about Attendees
// List Out Data about Comments
// const mockGroup = {
//     id: 1,
//     group_name: "The Awesome Group",
//     description: "This group is the most awesome group of coders in the entire world. our group is so great. We code. We do stuff together. We code together. We are awesome coding together.",
//     city: "Denver",
//     state: "CO",
//     zip_code: "80205",
//     image_url: "https://assets.fortnitecreativehq.com/wp-content/uploads/2019/02/04052712/Movie-theatre.jpg",
//     leader_id: "1",
//     createdAt: "2020-10-18T20:26:34.256Z",
//     updatedAt: "2020-10-18T20:26:34.256Z",
// };

// /groups/:groupId

// If leader is viewing page, edit and delete buttons already



const GroupPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { groupId } = params;

    const [leader, setLeader] = useState({});
    const [isLeader, setIsLeader] = useState(false);
    const [activeUser, setActiveUser] = useState({});
    const [isMember, setIsMember] = useState(false);
    const [members, setMembers] = useState([]);
    const [userGroupState, setUserGroupState] = useState([])

    // If session.userId === leader.id make edit/delete/add buttons available
    const group = useSelector(reduxState => { // Returning an Object
      return reduxState.groups
    });
    const groupUsers = useSelector(reduxState => { // Returning a list
      return reduxState.users
    });

    const currentUser = useSelector(reduxState => {
      return reduxState.session
    });

    const events = useSelector(reduxState => {
      return reduxState.events
    });

    const userGroup = useSelector(reduxState => {
      return reduxState.userGroups;
    });

    const groupLeaderId = group.leader_id; // 6

    const onClick = async (event) => {
      event.preventDefault();

      const newUserGroup = {
        user_id: currentUser.id,
        group_id: parseInt(groupId),
      };

      dispatch(createUserGroup(newUserGroup));
      setUserGroupState(newUserGroup);
      setIsMember(true);
    };

    useEffect(() => {
      if (Array.isArray(groupUsers)) {
        setLeader(groupUsers.find((user) => {
          return user.id === groupLeaderId;
        }))
        setMembers(groupUsers);
    }
      // dispatch(fetchGroupUsers(groupId));
    }, [groupUsers]);

    useEffect(() => {
      if (currentUser) {
        setActiveUser(currentUser)
      }
    }, [currentUser]);

    useEffect(() => {
      if (Array.isArray(groupUsers)) {

        for (let i = 0; i < groupUsers.length; i++) {
          if (groupUsers[i].id === currentUser.id) {
            setIsMember(true)
            return;
          }
        }
      }
    }, [groupUsers, currentUser]);

    const numGroupUsers = groupUsers.length;

    useEffect(() => {
      dispatch(fetchOneGroup(groupId));
      dispatch(fetchGroupUsers(groupId));
      dispatch(getCurrentUser());
      dispatch(fetchGroupEvents(groupId));
    }, [dispatch])

    console.log(members);

    return (
      <div className="group-page">
        <h1>Group Page!</h1>
        <div className="group-header">
          <div className="group-header_img">
            {!group && <h2>Loading....</h2>}
            {group && <img src={group.image_url} />}
          </div>
          <div className="group-header_title">
            <h1>{group.group_name}</h1>
          </div>
          <div className="group-header_location">
            <BsGeoAlt /> {`${group.city}, ${group.state}`}
          </div>
          <div className="group-header_members">
            <BsPeople /> {`${numGroupUsers} members`}
          </div>
          <div className="group-header_leader">
            Organized by leader:
            {leader ? leader.username : null}
          </div>
          <div className="group-header_member-button">
            {isMember && <h2>You're a member</h2>}
            {!isMember && <button onClick={onClick}>Join Us!</button>}
          </div>
        </div>
        <div className="group-body">
          <div className="group-body_feed">
            <div id="group-body_feed_description">{group.description}</div>
            <div id="group-body_feed_events">
              Group Events ({`${events.length}`})
              <EventGallery events={events} />
            </div>
          </div>
          <div className="group-body_sidebar">
            <div id="group-body_sidebar_organizer">Organizer</div>
            {/* UserImages */}
            <div id="group-body_sidebar_members">Member icons</div>
            {/* members (###) */}
            {/* UserImages */}
            Members ({`${members.length}`})
            {members.length > 0 &&  Array.isArray(members) && members.map((user) => <UserImage user={user} key={user.id} />)}
          </div>
          <div className="group-body_sim-events">
            Similar events
            {/* header tag */}
            {/* Event Components */}
          </div>
        </div>
      </div>
    );
}

export default GroupPage;