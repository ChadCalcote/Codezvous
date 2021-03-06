const SET_USER_GROUP = "SET_USER_GROUP";

export const setUserGroup = (userGroup) => {
  return {
    type: SET_USER_GROUP,
    userGroup: userGroup,
  };
};

export const createUserGroup = (newUserGroup) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/groups/new-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserGroup),
    });

    if (responseFromDb.ok) {
      const userGroup = await responseFromDb.json();
      dispatch(setUserGroup(userGroup));
    }
  };
};

const initialState = [];
const userGroupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER_GROUP:
      newState = action.userGroup;
      return newState
    default:
      return state;
  }
};

export default userGroupsReducer;