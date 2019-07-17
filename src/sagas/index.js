import { all } from "redux-saga/effects";
import Login from "./login";
import ComponentState from "./componentState";
import Admins from "./admins";
import Cars from "./cars";

export default function* rootSaga() {
  yield all([...Login, ...ComponentState, ...Admins, ...Cars]);
}
