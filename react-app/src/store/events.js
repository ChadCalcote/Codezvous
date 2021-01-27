const SET_EVENTS = "SET_EVENTS"

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events: events
  }
}

export const fetchAllEvents = () => {
  return async (dispatch) => {
    const responseFromDb = await fetch('/api/events');
    const eventsList = await responseFromDb.json();
    dispatch(
      setEvents(eventsList)
    )
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    default:
        return state;
  }
};

export default eventsReducer;
