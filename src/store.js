import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import pixelReducer from "./ducks/pixelReducer";
import userReducer from "./ducks/userReducer";
import quoteReducer from "./ducks/quoteReducer";
import eventReducer from "./ducks/eventReducer";

const store = createStore(
  combineReducers({
    userReducer,
    pixelReducer,
    quoteReducer,
    eventReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
