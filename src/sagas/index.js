import { all } from "redux-saga/effects";
import Login from "./login";
import ComponentState from "./componentState";

export default function* rootSaga() {
  yield all([...Login, ...ComponentState]);
}
