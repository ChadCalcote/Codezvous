import React, { useEffect, useState } from 'react'
import GroupCard from '../GroupCard'
import loader from '../../Bars-0.7s-98px.gif'
import './GroupGallery.css'

const GroupGallery = ({ user, type, groups }) => {

  const [groupsToDisplay, setGroupsToDisplay] = useState([]);
  const [groupMemberships, setGroupMemberships ] = useState([]);
  // TODO: NEED TO CHANGE THIS TO ONLY MAKE THE STORE ONLY ONE OF THESE IN THE PARENT COMPONENT

  useEffect(() => {
    const fetchMemberships = async() => {
      const response = await fetch(`/api/users/${user.id}/user-groups`);
      const memberships = await response.json(); // returns an array with the group_ids of the groups the user belongs to
      setGroupMemberships(memberships)
    }
    fetchMemberships();
  }, [user])

  useEffect(() => {
    if (Array.isArray(groups) && Array.isArray(groupMemberships) && type === "all"){
      setGroupsToDisplay(groups.slice(0,19))
    }else if (Array.isArray(groups) && groupMemberships.length > 0 && type === "user"){
      // fetch groups that the user belongs to. (users_groups)
      setGroupsToDisplay(groups.filter(group => groupMemberships.includes(group.id)).slice(0,4));
    }
  }, [groups, type, groupMemberships])

  return (
    <div className="group-gallery">
      {!groups && <img src={loader} alt="loading..." />}
      {Array.isArray(groups) && groupsToDisplay.map(group => <GroupCard group={group} user={user} key={group.id} />)}
    </div>
  )
}

export default GroupGallery;