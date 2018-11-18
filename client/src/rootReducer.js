import { combineReducers } from 'redux'

import StationReducer from './ducks/StationDuck/reducer'
import GeolocationReducer from './ducks/GeolocationDuck/reducer'

const rootReducer = combineReducers({
    stations: StationReducer,
    geolocation: GeolocationReducer,
})

export default rootReducer