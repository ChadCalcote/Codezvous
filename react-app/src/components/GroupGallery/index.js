import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGroups } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import GroupCard from '../GroupCard'
import UserImage from '../UserImage';
import './GroupGallery.css'

const GroupGallery = ({ events }) => {

// Need to figure out how to display either groups the currently authenticated user belongs to
// OR all groups

    const renderSuggestedGroups = () => {
        const nonUserGroups = groups.filter(groups => user.)
        groups.slice(0,20).map(group => <GroupCard group={group} key={group.id} />)
    }

    return (
        <div className="group-suggested-gallery">
            {!groups && <h3>Loading....</h3>}
            {/* {Array.isArray(sectionEvents) && sectionEvents.map(event => <EventCard event={event} key={event.id} />)} */} */}
            {Array.isArray(groups) && groups.slice(0,20).map(group => <GroupCard group={group} key={group.id} />)}
        </div>
    )
}

export default GroupGallery;