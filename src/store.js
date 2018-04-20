import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import pixelReducer from "./ducks/pixelReducer";
import userReducer from "./ducks/userReducer";

const store = createStore(
  combineReducers({
    userReducer,
    pixelReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
