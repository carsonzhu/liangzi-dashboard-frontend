import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { all } from "redux-saga/effects";

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history)
  });

export const saga = function*() {
  yield all([]);
};
