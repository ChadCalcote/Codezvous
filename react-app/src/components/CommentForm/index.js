import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment, fetchAllComments } from "../../store/comments";
import { getCurrentUser } from "../../store/session";
import { FaSatellite, FiSend } from 'react-icons/all'
import './CommentForm.css'

const CommentFormReact = ({user, comments, setComments}) => {

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
        setComments([...comments, ...newComment])
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
