import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_VEHICLES,
  FETCH_VEHICLES_SUCC,
  FETCH_VEHICLES_FAIL,
  CREATE_VEHICLE,
  CREATE_VEHICLE_SUCC,
  CREATE_VEHICLE_FAIL
} from "../reducers/cars";

import { fetchVehiclesRequest, addVehicleRequest } from "../apis/vehicle.api";

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

function* createVehicleAsync(action) {
  const {
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
    insuranceIds,
    token
  } = action.payload;
  try {
    const json = yield call(addVehicleRequest, {
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
      insuranceIds,
      token
    });

    console.log("createVehicle", json);

    yield put({
      type: CREATE_VEHICLE_SUCC,
      payload: json
    });
  } catch (err) {
    yield put({
      type: CREATE_VEHICLE_FAIL,
      payload: { error: err }
    });
  }
}

// Watcher Sagas
function* fetchVehiclesSaga() {
  yield takeEvery(FETCH_VEHICLES, fetchVehiclesAsync);
}

function* createVehicleSaga() {
  yield takeEvery(CREATE_VEHICLE, createVehicleAsync);
}

export default [fetchVehiclesSaga(), createVehicleSaga()];
