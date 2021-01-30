const SET_COMMENT = "SET_COMMENT";
const GET_ALL_COMMENTS = "GET_ALL_COMMENTS";

export const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comment: comment,
  };
};

export const getAllComments = (comments) => {
  return {
    type: GET_ALL_COMMENTS,
    comments: comments,
  };
};

export const createComment = (data, eventId) => async (dispatch) => {
  const responseFromDb = await fetch(`/api/events/${eventId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (responseFromDb.ok) {
    const comment = await responseFromDb.json();
    dispatch(setComment(comment));
    return comment;
  }
};

export const fetchAllComments = (eventId) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/events/${eventId}/comments`);
    const commentsList = await responseFromDb.json();
    dispatch(
      getAllComments(commentsList)
    )
  }
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENT:
      newState = {state, ...action.comment}
      return newState;
    case GET_ALL_COMMENTS:
      newState = action.comments;
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
