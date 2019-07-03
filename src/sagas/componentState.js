import { call, put, takeLatest } from "redux-saga/effects";

import { openLoginModal, closeLoginModal } from "../actioins/componentState";

// Sagas
function* openLoginFunc() {
  yield put(openLoginModal());
}

function* openLogin() {
  yield takeLatest("OPEN_LOGIN", openLoginFunc);
}

export default [openLogin];
