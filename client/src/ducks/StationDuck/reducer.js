import {
  FETCH_STATIONS_SUCCESS,
  SET_STATION_FILTER,
  FETCH_STATION_GRAPH_ALL_SUCCESS,
  FETCH_COMBINED_GRAPH_SUCCESS,
} from './actions'

const defaultState = {
  combinedGraphData: {},
  stationList: null,
  stationGraphData: {},
  yearGraphData: {},
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
    case FETCH_COMBINED_GRAPH_SUCCESS:
      const processedData = action.payload.data.map(row => [new Date(row.shift()), ...row.map(parseFloat)])
      const yearData = processedData.reduce((map, row) => {
        const year = row[0].getFullYear()
        if (!map[year]) {
          map[year] = []
        }
        map[year].push(row)
        return map
      }, {})
      return {
        ...state,
        combinedGraphData: {
          ...state.combinedGraphData,
          [action.payload.stationIds]: processedData,
        },
        yearGraphData: {
          ...state.yearGraphData,
          [action.payload.stationIds]: yearData
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
