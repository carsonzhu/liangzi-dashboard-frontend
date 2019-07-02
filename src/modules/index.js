import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { all } from "redux-saga/effects";
import appReducer from "../reducers";

export const createRootReducer = history =>
  combineReducers({
    ...appReducer,
    router: connectRouter(history)
  });

export const saga = function*() {
  yield all([]);
};
