import axios from "axios";
const GET_All_EVENT = "GET_ALL_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const PUSH_CURRENT_EVENT = "PUSH_CURRENT_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const ADD_EVENT = "ADD_EVENT";
export function getAllEvents() {
  return {
    type: GET_All_EVENT,
    payload: axios.get(`/api/events`)
  };
}
export function updateEvent(
  id,
  formatDate,
  title,
  text,
  important,
  location,
  pixel_unique
) {
  return {
    type: UPDATE_EVENT,
    payload: axios.put(`/api/event/${id}`, {
      formatDate,
      title,
      text,
      important,
      location,
      pixel_unique
    })
  };
}
export function addEvent(
  formatDate,
  title,
  text,
  important,
  location,
  pixel_unique
) {
  return {
    type: ADD_EVENT,
    payload: axios.post(`/api/event`, {
      formatDate,
      title,
      text,
      important,
      location,
      pixel_unique
    })
  };
}
export function deleteEvent(id) {
  return {
    type: DELETE_EVENT,
    payload: axios.delete(`/api/event/${id}`)
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
    case `${ADD_EVENT}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data
      };
    case `${UPDATE_EVENT}_FULFILLED`:
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
