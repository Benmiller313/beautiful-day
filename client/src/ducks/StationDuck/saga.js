import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_ERROR,
  FETCH_STATION_GRAPH_ALL,
  FETCH_STATION_GRAPH_ALL_SUCCESS,
} from './actions'


function fetchStationsFromAPI() {
  return axios({
    method: "get",
    url: '/weather/stations/'
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
    alert('Could not load station data. Error: ' + error.response.status)
    yield put({
      type: FETCH_STATIONS_ERROR,
      error,
    })
  }
}

function fetchGraphAllFromAPI(stationId) {
  return axios({
    method: "get",
    url: `/weather/stations/${stationId}/graph`,
  })
}

function* fetchGraphAllWorker(action) {
  try {
    const response = yield call(fetchGraphAllFromAPI, action.payload)
    yield put({
      type: FETCH_STATION_GRAPH_ALL_SUCCESS,
      payload: { data: response.data.data, stationId: action.payload },
    })
  } catch (error) {
    console.log(error)
  }
}

export function* watchStationAsync() {
  yield takeEvery(FETCH_STATIONS, fetchWorker)
  yield takeLatest(FETCH_STATION_GRAPH_ALL, fetchGraphAllWorker)
}