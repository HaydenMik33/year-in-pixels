import axios from "axios";
// ACTION TYPES (CONSTANTS)
const GET_USER = "GET_USER";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
}

const initialState = {
  user: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      // Object.assign({}, state, { user: action.payload.data })
      return {
        ...state,
        user: action.payload.data
      };
    default:
      return state;
  }
}
