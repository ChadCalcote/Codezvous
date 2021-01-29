import React from "react";
import CommentForm from "../../../../app/forms/comment_form.py";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/comments";


const CommentFormReact = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const { eventId } = params;


    const [comment, setComment] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();

        const newComment = {
            user_id: userId,
            body: comment
        }

        const addComment = await dispatch(createComment(newComment, eventId))
    }


    return (
      <form onSubmit={onSubmit} method="post" action="/events/<int:id>/comments">
        <div>
          <label>Comment</label>
          <textarea value={comment} onChange={event => setComment(event.target.value)}/>
        </div>
        <button type="submit">Add Comment</button>
      </form>
    );
}


export default CommentFormReact;