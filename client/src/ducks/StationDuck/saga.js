import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from 'axios'
import {
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_ERROR,
  FETCH_STATION_GRAPH_ALL,
  FETCH_STATION_GRAPH_ALL_SUCCESS,
  FETCH_COMBINED_GRAPH,
  FETCH_COMBINED_GRAPH_SUCCESS,
  FETCH_PROJECTS,
  fetchProjectsSuccess,
  SET_METRIC,
} from './actions'
import { selectMetric } from './selectors';


function fetchStationsFromAPI() {
  return axios({
    method: "get",
    url: '/weather/stations/'
  })
}

function fetchProjectsFromAPI() {
  return axios.get('/weather/project/')
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

function* fetchProjectsWorker() {
  const response = yield call(fetchProjectsFromAPI)
  const projects = response.data
  yield put(fetchProjectsSuccess(projects))
}

function fetchGraphAllFromAPI(stationId) {
  return axios({
    method: "get",
    url: `/weather/stations/${stationId}/graph`,
  })
}

function fetchCombinedFromAPI(stations, metric) {
  return axios.get(`weather/stations/graphcombined?station_ids=${stations.map(station => station.id).join(',')}&columns=${metric}`)
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

function* fetchCombinedGraphWorker(action) {
  try {
    const metric = yield select(selectMetric)
    const response = yield call(fetchCombinedFromAPI, action.payload, metric)
    yield put({
      type: FETCH_COMBINED_GRAPH_SUCCESS,
      payload: { data: response.data.data, stationIds: action.payload.map(station => station.id).join('_'), metric,},
    })
  } catch (error) {
    console.log(error)
  }
}

function* setMetricWorker(action) {
  const state = yield select()
  const data = state.stations.combinedGraphData[action.payload.stations.map(station => station.id).join('_')]
  if (!data || !data[action.payload.metric]) {
    try {
      const response = yield call(fetchCombinedFromAPI, action.payload.stations, action.payload.metric)
      yield put({
        type: FETCH_COMBINED_GRAPH_SUCCESS,
        payload: { 
          data: response.data.data,
          stationIds: action.payload.stations.map(station => station.id).join('_'),
          metric: action.payload.metric,
        },
      })  
    } catch (error) {
      console.log(error)
    }
  }
}

export function* watchStationAsync() {
  yield takeEvery(FETCH_STATIONS, fetchWorker)
  yield takeEvery(FETCH_PROJECTS, fetchProjectsWorker)
  yield takeLatest(FETCH_STATION_GRAPH_ALL, fetchGraphAllWorker)
  yield takeLatest(FETCH_COMBINED_GRAPH, fetchCombinedGraphWorker)
  yield takeEvery(SET_METRIC, setMetricWorker)
}