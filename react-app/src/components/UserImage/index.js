import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "../../store/users";

const UserImage = ({ user }) => {
const params = useParams();
const dispatch = useDispatch();
const { userId } = params

const [ imageLoaded, setImageLoaded ] = useState("loading...")

const handleImageLoaded = () => setImageLoaded("loaded")

const handleImageErrored = () => setImageErrored("failed to load")
// // Fetch User
// const user = useSelector(reduxState => {
//   return reduxState.users
// })

// useEffect(() => {
//   dispatch(fetchSingleUser(userId))

// }, [dispatch])
// // Use User's image 

    return (
      <div className="user_photo">
        {
          user.image_url ? <img width="100px" src={user.image_url}/> : null
        }
      </div>
    );
}

export default UserImage;