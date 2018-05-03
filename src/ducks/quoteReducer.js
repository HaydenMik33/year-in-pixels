import axios from "axios";
const GET_All_QUOTE = "GET_ALL_QUOTE";
export function getAllQuote(ilgi_id) {
  return {
    type: GET_All_QUOTE,
    payload: axios.get(`/api/quotes/${ilgi_id}`)
  };
}

const initialState = {
  quotes: []
};

export default function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_All_QUOTE}_FULFILLED`:
      return {
        ...state,
        quotes: action.payload.data
      };
    default:
      return state;
  }
}
