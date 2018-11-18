import { fork } from 'redux-saga/effects'

import { watchStationAsync } from './ducks/StationDuck/saga'
import { watchLocationAsync } from './ducks/GeolocationDuck/saga'


export default function* rootSaga() {
    yield [
        fork(watchStationAsync),
        fork(watchLocationAsync),
    ];
}
