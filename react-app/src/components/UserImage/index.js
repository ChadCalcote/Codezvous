import React from "react";
import { useState, useEffect } from "react";

const UserImage = ({ user }) => {

const [ imageLoaded, setImageLoaded ] = useState("loading...")
const [ imageErrored, setImageErrored ] = useState("")

const handleImageLoaded = () => setImageLoaded("loaded")

const handleImageErrored = () => setImageErrored("failed to load")

function displayUserImage (user){
  return (
    <div className="user-pic">
      <img width="100px" 
        src={user.image_url}
        onLoad={handleImageLoaded}
        onError={handleImageErrored}
        alt=""
      />
    </div>
  )
}

// // Fetch User
// const user = useSelector(reduxState => {
//   return reduxState.users
// })

  // useEffect(() => {
  //   displayUserImage(user)

  // }, [user])
// // Use User's image 

    return (
      <div className="user_photo">
        {user.image_url ?  displayUserImage(user) : null
        }
      </div>
    );
}

export default UserImage;