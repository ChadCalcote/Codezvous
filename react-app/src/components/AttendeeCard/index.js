import React from 'react';
import "./AttendeeCard.css";
import UserImage from "../UserImage";

const AttendeeCard = ({user}) => {

    return (
        <div className="attendee-card">
            <div className="user-pic">
                <UserImage id="pic" user={user}/>
            </div>
            <div className="attendee-card_name">
                {user.username}
            </div>
            <div className="attendee-card_member">
                Member
            </div>
        </div>
    )
}

export default AttendeeCard;
