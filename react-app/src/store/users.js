const SET_GROUP_USERS = "SET_GROUP_USERS";

export const setGroupUsers= (users) => {
  return {
    type: SET_GROUP_USERS,
    users: users,
  };
};

export const fetchGroupUsers = (groupId) => {
  return async (dispatch) => {
    const responseFromDb = await fetch("/api/users/"); // /api/groups/${groupId}/users
    const usersList = await responseFromDb.json();
    dispatch(setGroupUsers(usersList));
  };
};

const initialState = {

};

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_GROUP_USERS:
      return action.users;
    default:
        return state;
  }
};


export default usersReducer;
