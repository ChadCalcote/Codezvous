const SET_COMMENT = "SET_COMMENT";

export const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comments: comment,
  };
};

export const createComment = (data) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/events/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log("HELLLLOOOOO")
    if (responseFromDb.ok) {
      const comment = await responseFromDb.json();
      dispatch(setComment(comment));
    }
  };
}
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
