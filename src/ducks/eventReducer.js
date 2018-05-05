import axios from "axios";
const GET_All_EVENT = "GET_ALL_EVENT";
const ADD_EVENT = "ADD_EVENT";
export function getAllEvents(ilgi_id) {
  return {
    type: GET_All_EVENT,
    payload: axios.get(`/api/events/${ilgi_id}`)
  };
}

export function addEvent(
  date,
  title,
  text,
  important,
  location,
  pixel_unique,
  ilgi_id
) {
  return {
    type: GET_All_EVENT,
    payload: axios.post("/api/event", {
      date,
      title,
      text,
      important,
      location,
      pixel_unique,
      ilgi_id
    })
  };
}
const initialState = {
  events: []
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_All_EVENT}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data
      };
    case `${ADD_EVENT}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data
      };
    default:
      return state;
  }
}
