
// Action
const SET_GROUPS = "SET_GROUPS";
const SET_ONE_GROUP = "SET_ONE_GROUP";

// Action Creator Carries Data to the State
export const setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    groups: groups
  }
};

export const setOneGroup = (group) => {
  return {
    type: SET_ONE_GROUP,
    group: group
  }
}

// Thunk
// What we use in the component
export const fetchAllGroups = () => {
  return async (dispatch) => {
    const responseFromDb = await fetch('/api/groups');
    const groupsList = await responseFromDb.json();
    dispatch(
      setGroups(groupsList)
    )
  }
}

export const fetchOneGroup = (groupsId) => {

  return async(dispatch) => {
    const responseFromDb = await fetch(`/api/groups/${groupsId}`);
    console.log('RES', responseFromDb);
    const group = await responseFromDb.json();
    dispatch(
      setOneGroup(group)
    )
  }
}



const initialState = [];

const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_GROUPS:
      newState = action.groups;
      return newState;
    case SET_ONE_GROUP:
      newState = action.group;
      return newState;
    default:
        return state;
  }
};


export default groupsReducer;
