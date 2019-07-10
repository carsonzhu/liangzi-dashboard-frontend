import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCHING,
  FETCH_ADMINS,
  FETCH_ADMINS_FAILED
} from "../reducers/admins";
import { fetchUsersRequest } from "../apis/admins.api";

// Sagas
function* fetchAdminsAsync(action) {
  try {
    const json = yield call(fetchUsersRequest);

    yield put({
      type: FETCH_ADMINS,
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
  yield takeEvery(FETCHING, fetchAdminsAsync);
}

export default [fetchAdminSaga()];
