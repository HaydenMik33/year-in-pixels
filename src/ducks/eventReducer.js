import axios from "axios";
const GET_All_EVENT = "GET_ALL_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const PUSH_CURRENT_EVENT = "PUSH_CURRENT_EVENT";
export function getAllEvents(ilgi_id) {
  return {
    type: GET_All_EVENT,
    payload: axios.get(`/api/events/${ilgi_id}`)
  };
}
export function deleteEvent(id, ilgi_id) {
  return {
    type: DELETE_EVENT,
    payload: axios.delete(`/api/event/${id}`, { ilgi_id })
  };
}
export function pushCurrentEvent(event) {
  return {
    type: PUSH_CURRENT_EVENT,
    payload: event
  };
}

const initialState = {
  events: [],
  currentEvent: {}
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_All_EVENT}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data
      };
    case `${DELETE_EVENT}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data
      };
    case PUSH_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.payload
      };
    default:
      return state;
  }
}
