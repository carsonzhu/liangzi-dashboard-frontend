import { call, put, takeEvery } from "redux-saga/effects";

import { cacheItem } from "../utilities/cache-handler";

import { LOGGING_IN, LOGIN_SUCC, LOGIN_FAILED } from "../reducers/login";
import { loginRequest } from "../apis/login.api";

// Sagas
function* loginAsync(action) {
  const { email, password } = action.payload;

  try {
    const json = yield call(loginRequest, { email, password });

    //cache the result
    cacheItem({
      name: "userLogin",
      data: JSON.stringify(json),
      expiry: 1
      // storeInCookie: true
    });

    yield put({
      type: LOGIN_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILED,
      payload: { error: err.msg }
    });
  }
}

// Watcher Sagas
function* login() {
  yield takeEvery(LOGGING_IN, loginAsync);
}

export default [login()];
