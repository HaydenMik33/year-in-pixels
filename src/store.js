import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";

const store = createStore(
  combineReducers({
    userReducer
    ///somthing else here
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
