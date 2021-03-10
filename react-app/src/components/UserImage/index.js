import React from "react";
import smallLoader from '../../Spinner-1s-30px.gif';
import './UserImage.css'

const UserImage = ({ user, additionalClass }) => {

    return (
      <div className={`user_photo ${additionalClass? additionalClass : null}`}>
        {!user.image_url && <img src={smallLoader} alt="loading..." />}
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
