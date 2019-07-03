import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* login() {
  yield takeLatest("LOGGING_IN", loginAsync);
}

const loginRequest = ({ email, password }) => {
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
function* loginAsync() {
  try {
    const json = yield call(loginRequest);

    yield put({
      type: "LOGIN_SUCC",
      payload: { userType: "rentalCompanyAdmin", token: "abc123" }
    });
  } catch (error) {
    yield put({ type: "LOGIN_FAILED", payload: { error } });
  }
}

export default [login];
