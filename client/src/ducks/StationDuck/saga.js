import { put, call, takeEvery } from 'redux-saga'
import axios from 'axios'
import { 
  FETCH_SATIONS,
  FETCH_STATIONS_SUCCESS,
  fetchStations,
  fetchedStations,
  FETCH_STATIONS_ERROR,
} from './actions'


function fetchStationsFromAPI() {
  return axios({
    method: "get",
    url: 'localhost:8000/weather/stations/'
  })
}

function* fetchWorker() {
  try {
    const response = yield call(fetchStationsFromAPI)
    const stations = response.data
    yield put({
      type: FETCH_STATIONS_SUCCESS,
      payload: stations,
    })
  } catch (error) {
    yield put({
      type: FETCH_STATIONS_ERROR,
      error,
    })
  }
}

export function* watchStationAsync() {
  yield takeEvery(FETCH_SATIONS, fetchWorker)
}