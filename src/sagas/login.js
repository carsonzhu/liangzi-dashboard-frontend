import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { LOGGING_IN, LOGIN_SUCC, LOGIN_FAILED } from "../reducers/login";

// Request
const loginRequest = ({ email, password }) => {
  const isDev =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "custom";

  // DEV: fake login
  if (isDev) {
    return Promise.resolve({ userType: "normalAdmin", token: "abc123" });
  }

  return axios({
    method: "post",
    url: `${process.env.LIANG_ZI_BACKEND_URL}/apis/authentication/login`,
    data: {
      email,
      password
    }
  });
};

// Sagas
function* loginAsync({ email, password }) {
  try {
    const json = yield call(loginRequest, { email, password });

    yield put({
      type: LOGIN_SUCC,
      payload: json
    });
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: { error } });
  }
}

// Watcher Sagas
function* login() {
  yield takeEvery(LOGGING_IN, loginAsync);
}

export default [login()];
