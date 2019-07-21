import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_VEHICLES,
  FETCH_VEHICLES_SUCC,
  FETCH_VEHICLES_FAIL
} from "../reducers/cars";

import { fetchVehiclesRequest } from "../apis/vehicle.api";

// Sagas
function* fetchVehiclesAsync(action) {
  const { token } = action.payload;
  try {
    const json = yield call(fetchVehiclesRequest, { token });

    console.log("fetchVehicle", json);

    yield put({
      type: FETCH_VEHICLES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: FETCH_VEHICLES_FAIL,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchVehiclesSaga() {
  yield takeEvery(FETCH_VEHICLES, fetchVehiclesAsync);
}

export default [fetchVehiclesSaga()];
