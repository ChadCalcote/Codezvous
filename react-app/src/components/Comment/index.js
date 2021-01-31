import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Comment = ({comment}) => {
    const dispatch = useDispatch()
    const [ user, setUser ] = useState({})
// TODO: Can we render the info of the user who made the post????
    // useEffect(() => {
    //     setUser(fetchSingleUser(comment.user_id))
    // }, [comment])

    return (
        <div className="comment" id={`comment-${comment.id}`}>
            <div className="comment-info">
                {/* <UserImage user={user} />
                {user.username}     */}
            </div>
            <div className="comment-body">
                {comment.body}
            </div>
        </div>
    )
}
export default Comment