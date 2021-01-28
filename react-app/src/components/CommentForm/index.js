import React from "react";
import CommentForm from "../../../../app/forms/comment_form.py";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CommentFormReact = () => {


    const [comment, setComment] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();

        const comment = await dispatchEvent(createComment())
    }



    return (
      <form method="post" action="/events/<int:id>/comments">
        <div>
          <label>Comment</label>
          <textarea value={comment} onChange={event => setComment(event.target.value)}/>
        </div>
      </form>
    );
}

export default CommentFormReact;