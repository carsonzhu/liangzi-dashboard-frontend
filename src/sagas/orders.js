import { call, put, takeEvery } from "redux-saga/effects";

import { fetchError } from "./utilities";

import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCC,
  FETCH_ORDERS_FAIL
} from "../reducers/orders";

import {} from "../apis/rentalCompany.api";

// Sagas
function* fetchOrdersAsync(action) {
  const { token } = action.payload;
  try {
    const json = yield call(getOrdersRequest, { token });

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

// Watcher Sagas
function* fetchOrdersSaga() {
  yield takeEvery(FETCH_RENTAL_COMPANIES, fetchOrdersAsync);
}

export default [fetchOrdersSaga()];
