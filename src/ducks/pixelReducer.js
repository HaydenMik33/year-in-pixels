import axios from "axios";
const initialState = {
  pixels: [],
  currentPixel: []
};
const GET_ALL_PIXELS = "GET_ALL_PIXELS";
const UPDATE_PIXEL = "UPDATE_PIXEL";
const UPDATE_CURRENTPIXEL = "UPDATE_CURRENTPIXEL";

export function getAllPixels(ilgi_id) {
  return {
    type: GET_ALL_PIXELS,
    payload: axios.get(`/api/pixels/${ilgi_id}`)
  };
}
export function updatePixel(id, text, img, colorValue, ilgi_id) {
  //console.log(id, text, img, colorValue);
  //I'm getting right data
  return {
    type: UPDATE_PIXEL,
    payload: axios.post(`/api/pixel/${ilgi_id}/${id}`, {
      text,
      img,
      colorValue
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

    default:
      return state;
  }
}
