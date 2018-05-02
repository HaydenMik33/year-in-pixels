import axios from "axios";
const initialState = {
  pixels: [],
  currentPixel: {},
  ilgi: []
};
const GET_ALL_PIXELS = "GET_ALL_PIXELS";
const UPDATE_PIXEL = "UPDATE_PIXEL";
const UPDATE_CURRENTPIXEL = "UPDATE_CURRENTPIXEL";
const SEND_ILGI_TO_REDUCER = "SEND_ILGI_TO_REDUCER";

export function getAllPixels(ilgi_id) {
  return {
    type: GET_ALL_PIXELS,
    payload: axios.get(`/api/pixels/${ilgi_id}`)
  };
}
export function sendIlgiToReducer(ilgi) {
  return {
    type: SEND_ILGI_TO_REDUCER,
    payload: ilgi
  };
}
export function updatePixel(id, text, img, ilgi_id) {
  return {
    type: UPDATE_PIXEL,
    payload: axios.post(`/api/pixel/${ilgi_id}/${id}`, {
      text,
      img
    })
  };
}

export function updateCurrentPixel(pixel) {
  return {
    type: UPDATE_CURRENTPIXEL,
    payload: pixel
  };
}

export default function pixelReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_CURRENTPIXEL":
      console.log(action.payload);
      return { ...state, currentPixel: action.payload };

    case `${GET_ALL_PIXELS}_FULFILLED`:
      return {
        ...state,
        pixels: action.payload.data
      };
    case `${UPDATE_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixels: action.payload.data
      };
    case "SEND_ILGI_TO_REDUCER":
      return { ...state, ilgi: action.payload };
    default:
      return state;
  }
}
