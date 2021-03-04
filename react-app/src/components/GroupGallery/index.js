import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGroups, fetchUserGroups } from '../../store/groups';
import GroupCard from '../GroupCard'
import loader from  '../../Bars-0.7s-98px.gif'
import './GroupGallery.css'

const GroupGallery = ({ user, type }) => {

    const dispatch = useDispatch();
    const groups = useSelector(reduxState => {
        return reduxState.groups
    })
    // TODO: NEED TO CHANGE THIS TO ONLY MAKE THE STORE ON ONE OF THESE IN THE PARENT COMPONENT
    useEffect(() => {
        if (type === "all"){
          dispatch(fetchAllGroups())  
        }else {
            dispatch(fetchUserGroups(user.id))
        }
    }, [dispatch, type, user.id])

    return (
        <div className="group-gallery">
            {!groups && <img src={loader} alt="loading..."/>}
            {Array.isArray(groups) && type=="user" && groups.slice(0,4).map(group => <GroupCard group={group} user={user} key={group.id} />)}
            {Array.isArray(groups) && type=="all" && groups.slice(0,20).map(group => <GroupCard group={group} user={user} key={group.id} />)}
        </div>
    )
}

export default GroupGallery;