import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_INSURANCES,
  FETCH_INSURANCES_SUCC,
  FETCH_INSURANCES_FAILED,
  EDIT_INSURANCE,
  EDIT_INSURANCE_SUCC,
  EDIT_INSURANCE_FAILED,
  CREATE_NEW_INSURANCE,
  CREATE_NEW_INSURANCE_SUCC,
  CREATE_NEW_INSURANCE_FAILED,
  DELETE_INSURANCE_SUCC,
  DELETE_INSURANCE,
  DELETE_INSURANCE_FAILED
} from "../reducers/insurances";
import {
  fetchInsurancesRequest,
  updateInsuranceRequest,
  addInsuranceRequest,
  deleteInsuranceRequest
} from "../apis/insurances.api";

// Sagas
function* fetchInsurancesAsync(action) {
  const { token } = action.payload;
  try {
    const json = yield call(fetchInsurancesRequest, { token });

    yield put({
      type: FETCH_INSURANCES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: FETCH_INSURANCES_FAILED,
      payload: { error: err }
    });
  }
}

function* editInsuranceAsync(action) {
  const { insuranceId, fieldToUpdate, token } = action.payload;

  try {
    yield call(updateInsuranceRequest, { insuranceId, fieldToUpdate, token });

    yield put({
      type: EDIT_INSURANCE_SUCC
    });

    const json = yield call(fetchInsurancesRequest, { token });

    yield put({
      type: FETCH_INSURANCES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: EDIT_INSURANCE_FAILED,
      payload: { error: err }
    });
  }
}

function* deleteInsuranceAsync(action) {
  const { insuranceId, token } = action.payload;

  try {
    yield call(deleteInsuranceRequest, { insuranceId, token });

    yield put({
      type: DELETE_INSURANCE_SUCC
    });

    const json = yield call(fetchInsurancesRequest, { token });

    yield put({
      type: FETCH_INSURANCES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: DELETE_INSURANCE_FAILED,
      payload: { error: err }
    });
  }
}

function* createNewInsuranceAsync(action) {
  const {
    rentalCompanyId,
    rentalCompanyName,
    name,
    description,
    dailyRate,
    dailyRateUnit,
    token
  } = action.payload;

  try {
    const { insurance } = yield call(addInsuranceRequest, {
      rentalCompanyId,
      rentalCompanyName,
      name,
      description,
      dailyRate,
      dailyRateUnit,
      token
    });

    yield put({
      type: CREATE_NEW_INSURANCE_SUCC,
      payload: { insurance }
    });
  } catch (err) {
    yield put({
      type: CREATE_NEW_INSURANCE_FAILED,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchInsuranceSaga() {
  yield takeEvery(FETCH_INSURANCES, fetchInsurancesAsync);
}

function* updateInsuranceSaga() {
  yield takeEvery(EDIT_INSURANCE, editInsuranceAsync);
}

function* createNewInsuranceSaga() {
  yield takeEvery(CREATE_NEW_INSURANCE, createNewInsuranceAsync);
}

function* deleteInsuranceSaga() {
  yield takeEvery(DELETE_INSURANCE, deleteInsuranceAsync);
}

export default [
  fetchInsuranceSaga(),
  updateInsuranceSaga(),
  createNewInsuranceSaga(),
  deleteInsuranceSaga()
];
