import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { cacheItem } from "../utilities/cache-handler";

import { LOGGING_IN, LOGIN_SUCC, LOGIN_FAILED } from "../reducers/login";

// Request
const loginRequest = ({ email, password }) => {
  // DEV: fake login
  const isDev =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "custom";

  if (isDev) {
    switch (password) {
      case "error": {
        return Promise.reject({ error: "incorrect" });
      }
      case "super": {
        return Promise.resolve({
          userType: "superAdmin",
          token: "abc123",
          userId: "abc123"
        });
      }

      default: {
        return Promise.resolve({
          userType: "normalAdmin",
          token: "abc123",
          userId: "abc123"
        });
      }
    }
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
function* loginAsync(action) {
  const { email, password } = action.payload;

  try {
    const json = yield call(loginRequest, { email, password });

    //cache the result
    cacheItem({
      name: "userType",
      data: json.userType,
      expiry: 1
      // storeInCookie: true
    });
    cacheItem({
      name: "userToken",
      data: json.token,
      expiry: 1
      // storeInCookie: true
    });
    cacheItem({
      name: "userId",
      data: json.userId,
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
      payload: { error: "The email/password is not valid" }
    });
  }
}

// Watcher Sagas
function* login() {
  yield takeEvery(LOGGING_IN, loginAsync);
}

export default [login()];
