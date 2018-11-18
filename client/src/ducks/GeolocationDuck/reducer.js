import { 
  FETCH_GEOLOCATION_SUCCESS,
  FETCH_GEOLOCATION,
  FETCH_GEOLOCATION_ERROR,
} from './actions'

const defaultState = {
  geolocation: null,
  fetchingGeolocation: true,
}

export default function geoloactionReducer(state=defaultState, action) {
  switch (action.type) {
    case FETCH_GEOLOCATION:
      console.log('fetching geolocation')
      return {
        ...state,
        fetchingGeolocation: true,
      }
    case FETCH_GEOLOCATION_ERROR:
      return {
        ...state,
        fetchingGeolocation: false,
      }
    case FETCH_GEOLOCATION_SUCCESS:
      return {
        ...state,
        geolocation: action.payload,
        fetchingGeolocation: false,  
      }
    default:
      return state
  }
}