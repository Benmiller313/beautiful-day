import {
  FETCH_STATIONS_SUCCESS,
  SET_STATION_FILTER,
  FETCH_STATION_GRAPH_ALL_SUCCESS,
} from './actions'

const defaultState = {
  stationList: null,
  stationGraphData: {},
  filters: {
    aggregatedData: false,
    name: '',
  },
}

export default function stationReducer(state=defaultState, action){
  switch(action.type){
    case FETCH_STATIONS_SUCCESS: 
      return {
        ...state,
        stationList: action.payload.map(value => ({...value, lat: parseFloat(value.latitude), lng: parseFloat(value.longitude)}))
      }
    case FETCH_STATION_GRAPH_ALL_SUCCESS:
      return {
        ...state,
        stationGraphData: {
          ...state.stationGraphData,
          [action.payload.stationId]: action.payload.data.map(row => [new Date(row[0]), parseFloat(row[1])]),
        }
      }
    case SET_STATION_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        },
      }
    default:
      return state;
  }
}
