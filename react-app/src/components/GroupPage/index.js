import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneGroup } from "../../store/groups"
import { fetchGroupUsers } from "../../store/users";
import { getCurrentUser } from "../../store/session";
import { fetchGroupEvents } from "../../store/events";
import { createUserGroup } from "../../store/userGroups";
import { BsGeoAlt, BsPeople, BsPerson } from 'react-icons/bs';
import EventGallery from '../EventGallery';
import UserImage from '../UserImage';
import bigLoader from '../../Spinner-1s-237px.gif';
import "./GroupPage.css"

const GroupPage = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const { groupId } = params;

  const [leader, setLeader] = useState({});
  const [isLeader, setIsLeader] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [isMember, setIsMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [userGroupState, setUserGroupState] = useState([])

  const group = useSelector(state => state.groups); // Returning an object
  const groupUsers = useSelector(state => state.users); // Returning a list
  const currentUser = useSelector(state => state.session);
  const events = useSelector(state => state.events);
  const groupLeaderId = group.leader_id;

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

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    history.push({
      pathname: "/groups/create/event",
      state: {groupId}
    })
  }

  useEffect(() => {
    if (Array.isArray(groupUsers)) {
      setLeader(groupUsers.find((user) => {
        return user.id === groupLeaderId;
      }))
      setIsLeader(currentUser.id === groupLeaderId)
      setMembers(groupUsers);
    }
  }, [currentUser, groupUsers, groupLeaderId]);

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
  }, [dispatch, groupId])

  return (
    <div className="group-page">
      <div className="group-header">
        <div className="group-header-content">
          <div className="group-header_img">
            {!group.image_url && <img src={bigLoader} alt="loading..." />}
            {group && <img id="group-header_img" src={group.image_url} alt="group" />}
          </div>
          <div className="group-header_info">
            <div id="group-header_info_title">
              <h1>{group.group_name}</h1>
            </div>
            <div id="group-header_info_location">
              <BsGeoAlt />  {`${group.city}, ${group.state}`}
            </div>
            <div id="group-header_info_members">
              <BsPeople />  {`${numGroupUsers} members`}
            </div>
            <div id="group-header_info_leader">
              <BsPerson /> Organized by leader:
              {leader ? ` ${leader.username}` : null}
            </div>
            <div id="group-header_info_member_button">
              {isLeader ?
                <>
                  <h2>You're the leader</h2>
                  <div className="create-event-button">
                    <button onClick={handleCreateEvent}>Create Event</button>
                  </div>
                </>
                : isMember ?
                  <h2>You're a member</h2> : <button className="membership-button" onClick={onClick}>Join Us!</button>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="group-body">
        <div className="group-body_feed">
          <div id="group-body_feed_description">
            <h2> What we're about</h2>
            {group.description}
          </div>
          <div id="group-body_feed_events">
            <h2> Upcoming Events ({`${events.length}`})</h2>
            <EventGallery events={events} parent={"groupPage"} user={currentUser} />
          </div>
        </div>
        <div className="group-body_sidebar">
          <div className="group-body_sidebar_header">
            <div id="group-body_sidebar_organizer">
              <h3>Organizer</h3>
            </div>
            {leader ? <UserImage user={leader} /> : null}
            <h3>Members ({`${members.length}`})</h3>
          </div>
          <div id="group-body_sidebar_gallery">
            {members.length > 0 &&
              Array.isArray(members) &&
              members.slice(0, 12).map((user) => <UserImage user={user} key={user.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupPage;