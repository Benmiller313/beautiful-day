import {
  FETCH_STATIONS_SUCCESS,
  SET_STATION_FILTER,
} from './actions'

const defaultState = {
  stationList: null,
  filter: 'all',
}

export default function stationReducer(state=defaultState, action){
  switch(action.type){
    case FETCH_STATIONS_SUCCESS: 
      return {
        ...state,
        stationList: action.payload.map(value => ({...value, lat: parseFloat(value.latitude), lng: parseFloat(value.longitude)}))
      }
    case SET_STATION_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state;
  }
}
