import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/comments";
import { getCurrentUser } from "../../store/session";


const CommentFormReact = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { eventId } = params;

    const  user = useSelector(state => {
      return state.session
    })

    useEffect(() => {
      dispatch(getCurrentUser())
    }, [])

    const [comment, setComment] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();

        const newComment = {
            user_id: user.id,
            body: comment,
            event_id: parseInt(eventId)
        };

          dispatch(createComment(newComment));
          setComment("");
    }


    return (
      <form onSubmit={onSubmit}>
        <div>
          <label>Comment</label>
          <textarea value={comment} onChange={event => setComment(event.target.value)}/>
        </div>
        <button type="submit">Add Comment</button>
      </form>
    );
}


export default CommentFormReact;