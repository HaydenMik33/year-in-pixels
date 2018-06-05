import axios from "axios";
// ACTION TYPES (CONSTANTS)
const GET_USER = "GET_USER";
const GET_ILGI = "GET_ILGI";
const NEW_ILGI = "NEW_ILGI";
export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
}

export function getIlgi(id) {
  return {
    type: GET_ILGI,
    payload: axios.get(`/api/ilgi/${id}`)
  };
}
export function newIlgi(title) {
  return {
    type: NEW_ILGI,
    payload: axios.post("/api/ilgi", { title })
  };
}
const initialState = {
  user: {},
  ilgi: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${GET_ILGI}_FULFILLED`:
      return {
        ...state,
        ilgi: action.payload.data[0]
      };
    case `${NEW_ILGI}_FULFILLED`:
      return {
        ...state,
        ilgi: action.payload.data[0]
      };
    default:
      return state;
  }
}
