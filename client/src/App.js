import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import AppLayout from './containers/AppLayout';

const sagaMiddleware = createSagaMiddleware()

let store
if (process.env.REACT_APP_DEBUG) {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware), reduxDevTools))
}
else {
  store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)))
}
sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppLayout/>
      </Provider>
    )
  }
}

export default App;
