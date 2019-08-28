import { call, put, takeEvery } from "redux-saga/effects";

import { fetchError } from "./utilities";

import {
  FETCH_RENTAL_COMPANIES,
  FETCH_RENTAL_COMPANIES_SUCC,
  FETCH_RENTAL_COMPANIES_FAIL,
  CREATE_RENTAL_COMPANIES,
  CREATE_RENTAL_COMPANIES_FAIL,
  CREATE_RENTAL_COMPANIES_SUCC,
  EDIT_RENTAL_COMPANIES,
  EDIT_RENTAL_COMPANIES_FAIL,
  EDIT_RENTAL_COMPANIES_SUCC
} from "../reducers/rentalCompanies";
import {
  getRentalCompaniesRequest,
  createRentalCompaniesRequest,
  editRentalCompaniesRequest
} from "../apis/rentalCompany.api";

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
      payload: { error: fetchError({ error: err }) }
    });
  }
}

function* createRentalCompaniesAsync(action) {
  const {
    token,
    name,
    address,
    image,
    rating,
    perks,
    locationAlias,
    companyRepName,
    companyPhoneNumber
  } = action.payload;
  try {
    const json = yield call(createRentalCompaniesRequest, {
      token,
      name,
      address,
      image,
      rating,
      perks,
      locationAlias,
      companyRepName,
      companyPhoneNumber
    });

    yield put({
      type: CREATE_RENTAL_COMPANIES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: CREATE_RENTAL_COMPANIES_FAIL,
      payload: { error: fetchError({ error: err }) }
    });
  }
}

function* editRentalCompaniesAsync(action) {
  const { token, rentalCompanyId, fieldToUpdate } = action.payload;
  try {
    yield call(editRentalCompaniesRequest, {
      token,
      rentalCompanyId,
      fieldToUpdate
    });

    yield put({
      type: EDIT_RENTAL_COMPANIES_SUCC
    });

    const json = yield call(getRentalCompaniesRequest, { token });

    yield put({
      type: FETCH_RENTAL_COMPANIES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: EDIT_RENTAL_COMPANIES_FAIL,
      payload: { error: fetchError({ error: err }) }
    });
  }
}

// Watcher Sagas
function* fetchRentalCompaniesSaga() {
  yield takeEvery(FETCH_RENTAL_COMPANIES, fetchRentalCompaniesAsync);
}

function* createRentalCompaniesSaga() {
  yield takeEvery(CREATE_RENTAL_COMPANIES, createRentalCompaniesAsync);
}

function* editRentalCompaniesSaga() {
  yield takeEvery(EDIT_RENTAL_COMPANIES, editRentalCompaniesAsync);
}

export default [
  fetchRentalCompaniesSaga(),
  createRentalCompaniesSaga(),
  editRentalCompaniesSaga()
];
