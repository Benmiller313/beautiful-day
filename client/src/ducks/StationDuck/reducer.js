import {
  FETCH_STATIONS_SUCCESS
} from './actions'


export default function stationReducer(state=[], action){
  switch(action.type){
    case FETCH_STATIONS_SUCCESS: 
      return action.payload.filter((station, index) => {
        return index % 1 === 0;
      }).map(value => ({...value, lat: parseFloat(value.latitude), lng: parseFloat(value.longitude)}))
    default:
      return state;
  }
}
