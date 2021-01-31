import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroupUsers } from "../../store/users";
import { createUserGroup } from "../../store/userGroups";
import { getCurrentUser } from "../../store/session";
import "./index.css";

const GroupCard = ({ group }) => {

    const [isMember, setIsMember] = useState(false);

    const dispatch = useDispatch();

    const users = useSelector((reduxState) => {
        return reduxState.users;
    });

    const groupUsers = useSelector(reduxState => { 
        return reduxState.users;
    });

    const currentUser = useSelector(reduxState => {
        return reduxState.session;
    });

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
        dispatch(fetchGroupUsers(group.id));
        dispatch(getCurrentUser());
    }, [dispatch, setIsMember]);

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
                <div className="group-card_photo">
                    <img src={group.image_url} alt="group image" />
                </div>
                <div className="group-card_name">
                    {group.group_name}
                </div>
                <div className="group-card_members">
                    {users.length > 0 ? `${users.length} Members` : "Check us out!"}
                </div>
                {showButtonHandler()}
            </div>
        </a>
    );

};

export default GroupCard;