import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGroups, fetchUserGroups } from '../../store/groups';
import GroupCard from '../GroupCard'
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

    }, [dispatch, type, user.id])

    return (
        <div className="group-suggested-gallery">
            {!groups && <h3>Loading....</h3>}
            {Array.isArray(groups) && type==="user" && groups.slice(0,4).map(group => <GroupCard group={group} key={group.id} />)}
            {Array.isArray(groups) && type==="all" && groups.slice(0,20).map(group => <GroupCard group={group} key={group.id} />)}
        </div>
    )
}

export default GroupGallery;