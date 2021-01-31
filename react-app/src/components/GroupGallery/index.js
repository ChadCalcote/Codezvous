<<<<<<< HEAD
=======
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGroups, fetchUserGroups } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import { BsCameraVideo, BsGeoAlt, BsPerson } from 'react-icons/bs';
import GroupCard from '../GroupCard'
import UserImage from '../UserImage';
import './GroupGallery.css'

const GroupGallery = ({ user, type }) => {

    const dispatch = useDispatch();
    const groups = useSelector(reduxState => {
        return reduxState.groups
    })

    useEffect(() => {
        if (type === "all"){
          dispatch(fetchAllGroups())  
        }else {
            dispatch(fetchUserGroups(user.id))
        }

    }, [dispatch])

    return (
        <div className="group-suggested-gallery">
            {!groups && <img src='../../Bars-0.7s-98px.gif'/>}
            {Array.isArray(groups) && type=="user" && groups.slice(0,4).map(group => <GroupCard group={group} key={group.id} />)}
            {Array.isArray(groups) && type=="all" && groups.slice(0,20).map(group => <GroupCard group={group} key={group.id} />)}
        </div>
    )
}

export default GroupGallery;
>>>>>>> main
