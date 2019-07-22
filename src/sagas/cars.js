import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_VEHICLES,
  FETCH_VEHICLES_SUCC,
  FETCH_VEHICLES_FAIL,
  ADD_VEHICLES,
  ADD_VEHICLES_SUCC,
  ADD_VEHICLES_FAIL,
  UPDATE_VEHICLES,
  UPDATE_VEHICLES_SUCC,
  UPDATE_VEHICLES_FAIL
} from "../reducers/cars";

import {
  fetchVehiclesRequest,
  addVehicleRequest,
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

function* addVehiclesAsync(action) {
  console.log("addVehiclesAsync", action.payload);
  const {
    token,
    dailyRate,
    dailyRateUnit,
    locationAddress,
    locationHours,
    specialServices = "",
    transmission,
    vehicleType,
    trunkSize,
    seats,
    rentalCompanyId,
    vehicleMake,
    vehicleImage,
    vehicleNotes,
    insuranceIds
  } = action.payload;

  try {
    const json = yield call(addVehicleRequest, {
      token,
      dailyRate,
      dailyRateUnit,
      locationAddress,
      locationHours,
      specialServices,
      transmission,
      vehicleType,
      trunkSize,
      seats,
      rentalCompanyId,
      vehicleMake,
      vehicleImage,
      vehicleNotes,
      insuranceIds
    });

    console.log("json", json);
    yield put({
      type: ADD_VEHICLES_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: ADD_VEHICLES_FAIL,
      payload: { error: err }
    });
  }
}

function* updateVehiclesAsync(action) {
  console.log("updateVehiclesAsync", action.payload);
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

function* addVehiclesSaga() {
  yield takeEvery(ADD_VEHICLES, addVehiclesAsync);
}

function* updateVehiclesSaga() {
  yield takeEvery(UPDATE_VEHICLES, updateVehiclesAsync);
}

export default [fetchVehiclesSaga(), addVehiclesSaga(), updateVehiclesSaga()];
