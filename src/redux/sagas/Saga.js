import { all, call, put, takeLatest } from "redux-saga/effects";

import { Axios } from "../../api/axios";
import { getSimplifiedError } from "../../utils/error";
import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from "../reducers/Reducer";

async function dashboard() {
  return await Axios.get(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );
}
function* handleDashboardApi() {
  try {
    const response = yield call(dashboard);
    if (response) {
      yield put({
        type: DATA_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: DATA_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([takeLatest(DATA_REQUEST, handleDashboardApi)]);
