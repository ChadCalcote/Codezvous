import { useParams } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { formatTime, formatDate } from '../../dateFunctions';
import "./GroupPage.css"
import { fetchAllGroups, fetchOneGroup } from "../../store/groups"
import { fetchGroupUsers } from "../../store/users";
import { BsGeoAlt, BsPeople } from 'react-icons/bs';
import EventCard from '../EventCard';
import GroupCard from '../GroupCard';
import RSVP from '../RSVP';

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

const GroupPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { groupId } = params;

    const [leader, setLeader] = useState({});
    const [isLeader, setIsLeader] = useState(false);

    // If session.userId === leader.id make edit/delete/add buttons available
    const group = useSelector(reduxState => {
      return reduxState.groups
    });
    const groupUsers = useSelector(reduxState => {
      return reduxState.users
    });

    const numGroupUsers = groupUsers.length;

    const groupLeader = () => {
      const leader = groupUsers.filter(user => {
        return user.id === 104;
    });

    return leader[0].username;
  }

    const checkForGroupLeader = () => {
        for (let user in groupUsers) {
            if (user.id === group.leader_id) {
                setLeader(user)
            }
        }
    }

    useEffect(() => {
      dispatch(fetchOneGroup(groupId));
      dispatch(fetchGroupUsers(groupId));
    }, [dispatch])
    console.log('GROUP', group)

    return (
      <div className="group-page">
        <h1>Group Page!</h1>
        <div className="group-header">
          <div className="group-header_img">
            {!group && <h2>Loading....</h2>}
            {group && <img src={group.image_url} />}
          </div>
          <div className="group-header_location">
              <h1>{group.group_name}</h1>
          </div>
          <div className="group-header_location">
              <BsGeoAlt /> {`${group.city}, ${group.state}`}
          </div>
          <div className="group-header_members">
              <BsPeople /> {`${numGroupUsers} members`}
          </div>
          <div className="group-header_leader"> Organized by leader: {groupUsers.length > 0 ? groupLeader() : null}</div>
          <div className="group-header_status-button">
            Button saying You're a member or Join?
          </div>
        </div>
        <div className="group-body">
          <div className="group-body_feed">
            <div id="group-body_feed_description">
                {group.description}
            </div>
            <div id="group-body_feed_events">
              upcoming events
              <EventCard />
              {/* event cards */}
              past events
              {/* event cards */}
            </div>
            {/* <div className="group-body_images">Images from the events???</div> */}
            {/* <div id="group-body_feed_discussion">Discussion</div> */}
            {/* maybe not as no seed or maybe need a new table?? */}
          </div>
          <div className="group-body_sidebar">
            <div id="group-body_sidebar_organizer">Organizer</div>
            <div id="group-body_sidebar_members">Member icons</div>
            {/* members (###) */}
            {/* member icons only */}
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