const SET_USER_RSVPS = "SET_USER_RSVPS";

export const setUserRSVPs = (userRSVPs) => {
  return {
    type: SET_USER_RSVPS,
    userRSVPs: userRSVPs,
  };
};

export const fetchUserRSVPs = (userId) => {
    return async(dispatch) => {
      const responseFromDb = await fetch(`/api/users/${userId}/rsvps`);
      const userRSVPs = await responseFromDb.json();
      dispatch(
        setUserRSVPs(userRSVPs)
      )
    }
  }

const initialState = [];
const RSVPsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER_RSVPS:
        newState = action.userRSVPs;
        return newState;
    default:
      return state;
  }
};

export default RSVPsReducer;