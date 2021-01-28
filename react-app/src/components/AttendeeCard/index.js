import React from 'react';
import "./index.css";
import UserImage from "../UserImage";

// Fetch Users

const AttendeeCard = () => {

    return (
        <div className="attendee-card">
            <UserImage />
            <div className="attendee-card_name">
                User Name
            </div>
            <div className="attendee-card_member">
                Member
            </div>
        </div>
    )
}

export default AttendeeCard;

