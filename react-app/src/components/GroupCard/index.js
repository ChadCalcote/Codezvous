import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUserGroup } from "../../store/userGroups";
import "./index.css";

const GroupCard = ({ group, user }) => {

  const [isMember, setIsMember] = useState(false);
  const [numMembers, setNumMembers] = useState(0);
  // const [previewMembers, setPreviewMembers] = useState([])
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session);

  const handleJoinClick = () => {
    const newUserGroup = {
      user_id: currentUser.id,
      group_id: group.id,
    };
    dispatch(createUserGroup(newUserGroup));
    setIsMember(true);
  }

  // useEffect(() => {
  //     if (Array.isArray(groupUsers)) {
  //         for (let i = 0; i < groupUsers.length; i++) {
  //             if (groupUsers[i].id === currentUser.id) {
  //                 setIsMember(true);
  //                 return;
  //             }
  //         }
  //     }
  // }, [groupUsers, currentUser]);

  useEffect(() => {
    const getNumGroupMembers = async (groupId) => {
      const response = await fetch(`/api/groups/${groupId}/members/total`);
      const members = await response.json();
      setNumMembers(members);
    }
    // const getSomeGroupMembers = async (groupId) =>{
    //   const response = await fetch(`/api/groups/${groupId}/members/preview`);
    //   const members = await response.json();
    //   setPreviewMembers(members);
    // }
    const getIsMember = async (userId, groupId) => {
      const response = await fetch(`/api/users/${userId}/groups/${groupId}`);
      const member = await response.json();
      setIsMember(member);
    }
    getIsMember(user.id, group.id)
    getNumGroupMembers(group.id)
    // getSomeGroupMembers(group.id)
  }, [dispatch, group.id, user.id]);

  const showButtonHandler = () => {
    if (isMember) {
      return (
        <>
          You're a Member
          {/* NEED A LEAVE THE GROUP BUTTON */}
        </>
      )
    } else {
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
    <div className="group-card">
      <div className="group-card_1">
        <a href={`/groups/${group.id}`}>
          <div className="group-card_photo">
            <img src={group.image_url} alt="group" />
          </div>
          <div className="group-card_name">
            <strong>{group.group_name}</strong>
          </div>
        </a>
      </div>
      <div className="group-card_2">
        <div className="group-card_members">
          {numMembers > 0 ? `${numMembers} Members` : "Check us out!"}
        </div>
        {showButtonHandler()}
      </div>
    </div>
  );

};

export default GroupCard;