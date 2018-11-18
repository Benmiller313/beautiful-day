import { put, call, takeEvery } from 'redux-saga/effects'

import { FETCH_GEOLOCATION, fetchGeolocationSuccess, fetchGeolocationError } from './actions'

const getUserLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
   location => resolve(location),
   error => reject(error),
  )
 })
 

function* fetchWorker() {
  console.log('doing this')
  try{
    const location = yield call(getUserLocation)
    yield put(fetchGeolocationSuccess(location))
  } catch (error) {
    console.log(error)
    yield put(fetchGeolocationError(error))
  }
}

export function* watchLocationAsync() {
  console.log('calling')
  yield takeEvery(FETCH_GEOLOCATION, fetchWorker)
}