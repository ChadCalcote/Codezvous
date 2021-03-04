import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/comments";
import { FiSend } from 'react-icons/all'
import './CommentForm.css'

const CommentFormReact = ({user, commentsDisplayed, setCommentsDisplayed}) => {

    const params = useParams();
    const dispatch = useDispatch();
    const { eventId } = params;
    
    const [comment, setComment] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault();

        const newComment = {
            user_id: user.id,
            body: comment,
            event_id: parseInt(eventId)
        };
        dispatch(createComment(newComment));
        setCommentsDisplayed([...commentsDisplayed, newComment])
        setComment("");
    }

    return (
      <div className="comment-form_wrapper">
        <form className="comment-form_form" onSubmit={onSubmit}>
            <textarea value={comment} onChange={event => setComment(event.target.value)} className="input-field"/>
          <button type="submit" className="submit-button"><FiSend /></button>
        </form>
      </div>
    );
}

export default CommentFormReact;
