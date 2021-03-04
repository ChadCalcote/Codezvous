import React, { useEffect, useState } from 'react';
import UserImage from '../UserImage';
import './comment.css'

const Comment = ({ comment }) => {

    const [ user, setUser ] = useState({})

    useEffect(() => {
        const fetchUser = async()=> {
            const response = await fetch(`/api/users/${comment.user_id}`)
            const user = await response.json()
            setUser(user)
            }
        fetchUser()
    },[comment.user_id])

    return (
        <div className="comment" id={`comment-${comment.id}`}>
            <div className="comment-info">
                {user && <UserImage user={user} />}
                {user && user.username}
            </div>
            <div className="comment-body">
                {comment.body}
            </div>
        </div>
    )
}
export default Comment
