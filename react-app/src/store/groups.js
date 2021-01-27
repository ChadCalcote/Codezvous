
const SET_GROUPS = "SET_GROUPS"

export const setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    groups: groups
  }
}

export const fetchAllGroups = () => {
  return async (dispatch) => {
    const responseFromDb = await fetch('/api/groups');
    const groupsList = await responseFromDb.json();
    dispatch(
      setGroups(groupsList)
    )
  }
}



const initialState = {};

const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_GROUPS:
      return action.groups;
    default:
        return state;
  }
};


export default groupsReducer;
