import React from "react";
const UserImage = ({ image_url }) => {

// Fetch User
const User = useSelector(reduxState => {
  return reduxState.user
})
// Use User's image 

    return (
      <div className="user_photo">
        <img
          width="100px"
          src={image_url}
        />
      </div>
    );
}

export default UserImage;