import React from "react";
import loader from '../../Bars-0.7s-98px.gif'
import './UserImage.css'

const UserImage = ({ user }) => {

    return (
      <div className="user_photo">
        {!user.image_url && <img src={loader} alt="loading..." />}
        {user.image_url &&  <img
        className="user-image"
        title={user.username}
        src={user.image_url}
        alt='user'
      />}
      </div>
    );
}

export default UserImage;
