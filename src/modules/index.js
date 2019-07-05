import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "../reducers";

export const createRootReducer = history =>
  combineReducers({
    ...appReducer,
    router: connectRouter(history)
  });
