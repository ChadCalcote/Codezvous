import React, { useEffect, useState } from 'react'
import GroupCard from '../GroupCard'
import loader from '../../Bars-0.7s-98px.gif'
import './GroupGallery.css'

const GroupGallery = ({ user, type, groups }) => {

  const [groupsToDisplay, setGroupsToDisplay] = useState([]);
  const [groupMemberships, setGroupMemberships ] = useState([]);

  useEffect(() => {
    const fetchMemberships = async() => {
      const response = await fetch(`/api/users/${user.id}/user-groups`);
      const memberships = await response.json();
      setGroupMemberships(memberships)
    }
    fetchMemberships();
  }, [user])

  useEffect(() => {
    if (Array.isArray(groups) && Array.isArray(groupMemberships) && type === "all"){
      setGroupsToDisplay(groups.filter(group => !groupMemberships.includes(group.id)).slice(0,19))
    }else if (Array.isArray(groups) && groupMemberships.length > 0 && type === "user"){
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