import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_VEHICLES,
  FETCH_VEHICLES_SUCC,
  FETCH_VEHICLES_FAIL,
  UPDATE_VEHICLES,
  UPDATE_VEHICLES_SUCC,
  UPDATE_VEHICLES_FAIL
} from "../reducers/cars";

import {
  fetchVehiclesRequest,
  updateVehicleRequest
} from "../apis/vehicle.api";

// Sagas
function* fetchVehiclesAsync(action) {
  const { token } = action.payload;
  try {
    const json = yield call(fetchVehiclesRequest, { token });

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

function* updateVehiclesAsync(action) {
  const { token, vehicleId, fieldToUpdate } = action.payload;
  try {
    yield call(updateVehicleRequest, {
      token,
      vehicleId,
      fieldToUpdate
    });

    yield put({
      type: UPDATE_VEHICLES_SUCC
    });

    const json = yield call(fetchVehiclesRequest, { token });

    yield put({
      type: FETCH_VEHICLES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: UPDATE_VEHICLES_FAIL,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchVehiclesSaga() {
  yield takeEvery(FETCH_VEHICLES, fetchVehiclesAsync);
}

function* updateVehiclesSaga() {
  yield takeEvery(UPDATE_VEHICLES, updateVehiclesAsync);
}

export default [fetchVehiclesSaga(), updateVehiclesSaga()];
