export const FETCH_GEOLOCATION = "FETCH_GEOLOCATION"
export const FETCH_GEOLOCATION_SUCCESS = "FETCH_GEOLOCATION_SUCCESS"
export const FETCH_GEOLOCATION_ERROR = "FETCH_GEOLOCATION_ERROR"

export const fetchGeolocation = () => ({
    type: FETCH_GEOLOCATION,
})

export const fetchGeolocationSuccess = (geolocation) => ({
    type: FETCH_GEOLOCATION_SUCCESS,
    payload: geolocation,
})

export const fetchGeolocationError = (error) => ({
    type: FETCH_GEOLOCATION_ERROR,
    payload: error
})