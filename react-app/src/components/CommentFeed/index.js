import React from 'react';
import Comment from '../Comment';
import './CommentFeed.css';

const CommentFeed = ({comments}) => {
    return (
        <div className="event-gallery">
            {!Array.isArray(comments) && <h3>Start the conversation</h3>}
            {Array.isArray(comments) && comments.map(comment => <Comment comment={comment} />)}
        </div>
    )
}

export default CommentFeed;