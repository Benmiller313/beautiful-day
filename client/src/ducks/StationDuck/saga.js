import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { 
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCESS,
  fetchStations,
  fetchedStations,
  FETCH_STATIONS_ERROR,
} from './actions'


function fetchStationsFromAPI() {
  return axios({
    method: "get",
    url: 'http://localhost:8000/weather/stations/'
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
    console.log(error)
    yield put({
      type: FETCH_STATIONS_ERROR,
      error,
    })
  }
}

export function* watchStationAsync() {
  yield takeEvery(FETCH_STATIONS, fetchWorker)
}