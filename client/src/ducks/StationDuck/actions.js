export const FETCH_STATIONS = 'FETCH_STATIONS'
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS'
export const FETCH_STATIONS_ERROR = 'FETCH_STATIONS_ERROR'

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