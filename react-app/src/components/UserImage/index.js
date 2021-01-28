import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../store/users";

const UserImage = () => {
const params = useParams();
const dispatch = useDispatch();
const { userId } = params


// Fetch User
const user = useSelector(reduxState => {
  return reduxState.users
})

useEffect(() => {
  dispatch(fetchSingleUser(userId))

}, [dispatch])
// Use User's image 

    return (
      <div className="user_photo">
        {
          user.image_url ? <img width="100px" src={user.image_url}/> : null
        }
      </div>
    );
}

export default UserImage;