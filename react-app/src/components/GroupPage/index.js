import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneGroup } from "../../store/groups"
import { fetchGroupUsers } from "../../store/users";
import { getCurrentUser } from "../../store/session";
import { fetchGroupEvents } from "../../store/events";
import { createUserGroup } from "../../store/userGroups";
import { BsGeoAlt, BsPeople } from 'react-icons/bs';
import EventGallery from '../EventGallery';
import UserImage from '../UserImage';
import "./GroupPage.css"

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
      dispatch(fetchGroupUsers(groupId));
    };

    useEffect(() => {
      if (Array.isArray(groupUsers)) {
        setLeader(groupUsers.find((user) => {
          return user.id === groupLeaderId;
        }))
        setIsLeader(currentUser.id === groupLeaderId )
        setMembers(groupUsers);
      }

      if (currentUser) {
        setActiveUser(currentUser)
      }

      if (Array.isArray(groupUsers)) {

        for (let i = 0; i < groupUsers.length; i++) {
          if (groupUsers[i].id === currentUser.id) {
            setIsMember(true)
            return;
          }
        }
      }
    }, [currentUser, groupUsers, groupLeaderId]);

    useEffect(() => {
      dispatch(fetchOneGroup(groupId));
      dispatch(fetchGroupUsers(groupId));
      dispatch(getCurrentUser());
      dispatch(fetchGroupEvents(groupId));
    }, [dispatch, groupId])

    return (
      <div className="group-page">
        <h1>Group Page!</h1>
        <div className="group-header">
          <div className="group-header_img">
            {!group && <img src='../../Bars-0.7s-98px.gif'/>}
            {group && <img src={group.image_url} />}
          </div>
          <div className="group-header_title">
            <h1>{group.group_name}</h1>
          </div>
          <div className="group-header_location">
            <BsGeoAlt /> {`${group.city}, ${group.state}`}
          </div>
          <div className="group-header_members">
            <BsPeople /> {`${groupUsers.length} members`}
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
              <EventGallery events={events} parent={"groupPage"} />
            </div>
          </div>
          <div className="group-body_sidebar">
            <div id="group-body_sidebar_organizer">Organizer</div>
            {leader ? <UserImage user={leader}/>: null}
            <div id="group-body_sidebar_members">Member icons</div>
            Members ({`${members.length}`})
            {members.length > 0 &&
              Array.isArray(members) &&
              members.slice(0, 10).map((user) => <UserImage user={user} key={user.id} />)}
          </div>
        </div>
        <div>
          {isLeader 
          ? <Link to="create-event">Create Form</Link> : null }
        </div>
      </div>
    );
}

export default GroupPage;