import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import AppLayout from './containers/AppLayout';

const sagaMiddleware = createSagaMiddleware()
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware), reduxDevTools))
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
