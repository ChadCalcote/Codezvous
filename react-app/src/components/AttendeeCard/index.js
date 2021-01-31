import React from 'react';
import "./AttendeeCard.css";
import UserImage from "../UserImage";

const AttendeeCard = ({user}) => {

    return (
        <div className="attendee-card">
            <UserImage user={user}/>
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
