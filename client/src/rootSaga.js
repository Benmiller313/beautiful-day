import { fork } from 'redux-saga/effects'

import { watchStationAsync } from './ducks/StationDuck/saga'


export default function* rootSaga() {
    yield [
        fork(watchStationAsync),
    ];
}
