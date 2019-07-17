import { call, put, takeEvery } from "redux-saga/effects";

// Sagas
function* fetchVehiclesAsync(action) {
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

// Watcher Sagas
function* fetchVehiclesSaga() {
  yield takeEvery(FETCH_ADMINS, fetchVehiclesAsync);
}

export default [fetchVehiclesSaga()];
