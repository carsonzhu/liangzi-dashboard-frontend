import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_ADMINS,
  FETCH_ADMINS_SUCC,
  FETCH_ADMINS_FAILED,
  EDIT_ADMINS,
  EDIT_ADMINS_SUCC,
  EDIT_ADMINS_FAILED,
  CREATE_NEW_ADMINS,
  CREATE_NEW_ADMINS_SUCC,
  CREATE_NEW_ADMINS_FAILED
} from "../reducers/admins";
import {
  fetchAdminsRequest,
  updateAdminRequest,
  addAdminRequest
} from "../apis/admins.api";

// Sagas
function* fetchAdminsAsync(action) {
  const { token } = action.payload;
  try {
    const json = yield call(fetchAdminsRequest, { token });

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

function* editAdminAsync(action) {
  const { userId, fieldToUpdate, token } = action.payload;

  try {
    yield call(updateAdminRequest, { userId, fieldToUpdate, token });

    yield put({
      type: EDIT_ADMINS_SUCC
    });

    const json = yield call(fetchAdminsRequest, { token });

    yield put({
      type: FETCH_ADMINS_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: EDIT_ADMINS_FAILED,
      payload: { error: err }
    });
  }
}

function* createNewAdminAsync(action) {
  const {
    email,
    password,
    userType,
    allowedOperations,
    username,
    token,
    rentalCompanyId
  } = action.payload;

  try {
    console.log("action.payload", action.payload);
    const { admin } = yield call(addAdminRequest, {
      email,
      password,
      userType,
      allowedOperations,
      username,
      token,
      rentalCompanyId
    });

    yield put({
      type: CREATE_NEW_ADMINS_SUCC,
      payload: { admin }
    });
  } catch (err) {
    yield put({
      type: CREATE_NEW_ADMINS_FAILED,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchAdminSaga() {
  yield takeEvery(FETCH_ADMINS, fetchAdminsAsync);
}

function* updateAdminSaga() {
  yield takeEvery(EDIT_ADMINS, editAdminAsync);
}

function* createNewAdminSaga() {
  yield takeEvery(CREATE_NEW_ADMINS, createNewAdminAsync);
}

export default [fetchAdminSaga(), updateAdminSaga(), createNewAdminSaga()];
