const SET_EVENTS = "SET_EVENTS"
const SET_ONE_EVENT = "SET_ONE_EVENT"

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events: events
  }
}
export const setOneEvent = (event) => {
  return {
    type: SET_ONE_EVENT,
    event: event
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

export const fetchOneEvent = (eventId) => {
  return async (dispatch) => {
    const responseFromDb = await fetch(`/api/events/${eventId}`);
    const event = await responseFromDb.json();
    dispatch(
      setOneEvent(event)
    )
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    case SET_ONE_EVENT:
      return action.event;
    default:
        return state;
  }
};

export default eventsReducer;
