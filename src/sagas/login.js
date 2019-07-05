import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { LOGGING_IN, LOGIN_SUCC, LOGIN_FAILED } from "../reducers/login";

// Request
const loginRequest = ({ email, password }) => {
  // DEV: fake login
  const isDev =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "custom";

  if (isDev) {
    return password === "error"
      ? Promise.reject({ error: "incorrect" })
      : Promise.resolve({ userType: "normalAdmin", token: "abc123" });
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
  } catch (err) {
    yield put({
      type: LOGIN_FAILED,
      payload: { error: "The email/password is not valid" }
    });
  }
}

// Watcher Sagas
function* login() {
  yield takeEvery(LOGGING_IN, loginAsync);
}

export default [login()];
