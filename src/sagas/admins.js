import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_ADMINS,
  FETCH_ADMINS_SUCC,
  FETCH_ADMINS_FAILED
} from "../reducers/admins";
import { fetchUsersRequest } from "../apis/admins.api";

// Sagas
function* fetchAdminsAsync(action) {
  try {
    const json = yield call(fetchUsersRequest);

    yield put({
      type: FETCH_ADMINS_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: FETCH_ADMINS_FAILED,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchAdminSaga() {
  yield takeEvery(FETCH_ADMINS, fetchAdminsAsync);
}

function* updateAdminSaga() {
  yield takeEvery;
}

export default [fetchAdminSaga()];
