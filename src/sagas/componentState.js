import { call, put, takeLatest } from "redux-saga/effects";

// Sagas
function* openLoginFunc() {
  yield put({ type: "OPEN_LOGIN_MODAL" });
}

function* openLogin() {
  yield takeLatest("OPEN_LOGIN", openLoginFunc);
}

export default [openLogin];
