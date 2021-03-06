import { call, put, takeEvery } from "redux-saga/effects";

import { fetchError } from "./utilities";

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
  updateVehicleRequest,
  updateVehicleImageRequest
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
      payload: { error: fetchError({ error: err }) }
    });
  }
}

function* addVehiclesAsync(action) {
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

    const vehicleId = json.vehicle._id;

    yield call(updateVehicleImageRequest, {
      vehicleId,
      file: vehicleImage,
      token
    });

    yield put({
      type: ADD_VEHICLES_SUCC
    });

    const result = yield call(fetchVehiclesRequest, { token });

    yield put({
      type: FETCH_VEHICLES_SUCC,
      payload: result
    });
  } catch (err) {
    yield put({
      type: ADD_VEHICLES_FAIL,
      payload: { error: fetchError({ error: err }) }
    });
  }
}

function* updateVehiclesAsync(action) {
  const { token, vehicleId, fieldToUpdate } = action.payload;

  const { vehicleImage = null } = fieldToUpdate;
  delete fieldToUpdate.vehicleImage;

  try {
    yield call(updateVehicleRequest, {
      token,
      vehicleId,
      fieldToUpdate
    });

    if (typeof vehicleImage.name == "string") {
      yield call(updateVehicleImageRequest, {
        vehicleId,
        file: vehicleImage,
        token
      });
    }

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
      payload: { error: fetchError({ error: err }) }
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
