import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_RENTAL_COMPANIES,
  FETCH_RENTAL_COMPANIES_SUCC,
  FETCH_RENTAL_COMPANIES_FAIL
} from "../reducers/rentalCompanies";
import { getRentalCompaniesRequest } from "../apis/rentalCompany.api";

// Sagas
function* fetchRentalCompaniesAsync(action) {
  const { token } = action.payload;
  try {
    const json = yield call(getRentalCompaniesRequest, { token });

    yield put({
      type: FETCH_RENTAL_COMPANIES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: FETCH_RENTAL_COMPANIES_FAIL,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchRentalCompaniesSaga() {
  yield takeEvery(FETCH_RENTAL_COMPANIES, fetchRentalCompaniesAsync);
}

export default [fetchRentalCompaniesSaga()];
