const SET_COMMENT = "SET_COMMENT";

export const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comment: comment,
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

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENT:
        newState = action.comments
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
