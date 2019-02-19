export const FETCH_STATIONS = 'FETCH_STATIONS'
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS'
export const FETCH_STATIONS_ERROR = 'FETCH_STATIONS_ERROR'
export const SET_STATION_FILTER = 'SET_STATION_FILTER'
export const FETCH_STATION_GRAPH_ALL = 'FETCH_STATION_GRAPH_ALL'
export const FETCH_STATION_GRAPH_ALL_SUCCESS = 'FETCH_STATION_GRAPH_ALL_SUCCESS'

export const fetchStations = () => ({
    type: FETCH_STATIONS
})

export const fetchStationsSuccess = (stations) => ({
    type: FETCH_STATIONS_SUCCESS,
    payload: stations,
})

export const fetchStationsError = (error) => ({
    type: FETCH_STATIONS_ERROR,
    error: error,
})

export const setStationFilter = (filter) => ({
    type: SET_STATION_FILTER,
    payload: filter,
})

export const fetchStationGraphAll = (stationId) => ({
    type: FETCH_STATION_GRAPH_ALL,
    payload: stationId,
})

export const fetchStationGraphAllSuccess = (data) => ({
    type: FETCH_STATION_GRAPH_ALL_SUCCESS,
    payload: data,
})