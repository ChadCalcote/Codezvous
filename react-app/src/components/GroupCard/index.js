import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroupUsers } from "../../store/users";
import "./index.css";

const GroupCard = ({ group }) => {

    const dispatch = useDispatch();

    const users = useSelector((reduxState) => {
      return reduxState.users;
    });

    useEffect(() => {
      dispatch(fetchGroupUsers(group.id));
    }, [dispatch]);

    return (
        <div className="group-card">
            <div className="group-card_photo">
                <img src={group.image_url} alt="group image" />
            </div>
            <div className="group-card_name">
                {group.group_name}
            </div>
            <div className="group-card_members">
            {users.length > 0 ? `${users.length} Members`: "Check us out!"}
            </div>
        </div>
    );

};

export default GroupCard;