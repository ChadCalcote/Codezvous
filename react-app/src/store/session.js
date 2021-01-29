const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export const currentUser = (user) => async (dispatch) => {
  const current_user = await fetch(`/api/`)
}

const initialState = {};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_CURRENT_USER:
      newState = action.user
      return newState
    default:
        return state;
  }
};



export default sessionReducer;
