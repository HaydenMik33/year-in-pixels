import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import pixelReducer from "./ducks/pixelReducer";
import userReducer from "./ducks/userReducer";
import quoteReducer from "./ducks/quoteReducer";

const store = createStore(
  combineReducers({
    userReducer,
    pixelReducer,
    quoteReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
