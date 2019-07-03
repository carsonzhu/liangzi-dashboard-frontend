import { all } from "redux-saga/effects";
import ComponentState from "./componentState";

export default function* rootSaga() {
  yield all([...ComponentState]);
}
