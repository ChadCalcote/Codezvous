import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroupUsers } from "../../store/users";
import { createUserGroup } from "../../store/userGroups";
import { getCurrentUser } from "../../store/session";
import "./index.css";

const GroupCard = ({ group, user }) => {
  // Fetch the number of group members
  // Fetch three group members
  // 
    const [isMember, setIsMember] = useState(false);
    const [numMembers, setNumMembers] = useState(0);
    const [previewMembers, setPreviewMembers] = useState([])
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session);

    const handleJoinClick = () =>{
        createUserGroup(currentUser.id, group.id);
    }

    useEffect(() => {
        if (Array.isArray(groupUsers)) {
            for (let i = 0; i < groupUsers.length; i++) {
                if (groupUsers[i].id === currentUser.id) {
                    setIsMember(true);
                    return;
                }
            }
        }
    }, [groupUsers, currentUser]);

    useEffect(() => {
        const getNumGroupMembers = async (groupId) =>{
          const response = await fetch(`/api/${groupId}/members/total`);
          const members = await response.json();
          setNumMembers(members);
        }
        const getSomeGroupMembers = async (groupId) =>{
          const response = await fetch(`/api/${groupId}/members/preview`);
          const members = await response.json();
          setPreviewMembers(members);
        }
        getIsMember(group.id, user.id)
        getNumGroupMembers(group.id)
        getSomeGroupMembers(group.id)
    }, [dispatch, group]);

    const showButtonHandler = () => {
        if (isMember){
            return (
                <>
                    You're a Member
                    {/* NEED A LEAVE THE GROUP BUTTON */}
                </>
            )
        }else {
            return (
                <button
                className="button"
                id="group-card_join-button"
                onClick={() => handleJoinClick()}
                >
                    Join!
                </button>
            )
        }
    }

    return (
        <a href={`/groups/${group.id}`}>
            <div className="group-card">
                <div className="group-card_1">
                    <div className="group-card_photo">
                        <img src={group.image_url} alt="group" />
                    </div>
                    <div className="group-card_name">
                       <strong>{group.group_name}</strong> 
                    </div>  
                </div>
                <div className="group-card_2">
                    <div className="group-card_members">
                    {numMembers > 0 ? `${numMembers} Members` : "Check us out!"}
                    </div>
                    {showButtonHandler()}             
                </div>
            </div>
        </a>
    );

};

export default GroupCard;