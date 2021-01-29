const SET_GROUP_USERS = "SET_GROUP_USERS";
const SET_SINGLE_USER = "SET_SINGLE_USER"


export const setGroupUsers= (users) => {
  return {
    type: SET_GROUP_USERS,
    users: users,
  };
};

export const setSingleUser = (user) => {
  return {
    type: SET_SINGLE_USER,
    user: user
  }
}

export const fetchGroupUsers = (groupId) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/groups/${groupId}/members`); // /api/groups/${groupId}/users
    const usersList = await responseFromDb.json();
    dispatch(setGroupUsers(usersList));
  };
};

export const fetchSingleUser = (userId) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/users/${userId}`);
    const user = await responseFromDb.json();
    dispatch(setSingleUser(user))
  }
}

export const fetchEventUsers = (eventId) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/events/${eventId}/attendees`); // /api/groups/${groupId}/users
    const usersList = await responseFromDb.json();
    dispatch(setGroupUsers(usersList));
  };
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_GROUP_USERS:
      newState = action.users
      return newState;
      case SET_SINGLE_USER:
      newState = action.user
      return action.user;
    default:
        return state;
  }
};


export default usersReducer;
