import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../Comment'
import './CommentFeed.css'

const CommentFeed = ({comments}) => {
    console.log("GREETINGS FROM THE COMMENT FEED")
    console.log("COMMENTS", comments)
    return (
        <div className="event-gallery">
            {!Array.isArray(comments) && <h3>Start the conversation</h3>}
            {Array.isArray(comments) && comments.map(comment => <Comment comment={comment} />)}
        </div>
    )
}

export default CommentFeed;