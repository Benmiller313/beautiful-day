import { combineReducers } from 'redux'

import StationReducer from './ducks/StationDuck/reducer'

const rootReducer = combineReducers({
    stations: StationReducer,
})

export default rootReducer