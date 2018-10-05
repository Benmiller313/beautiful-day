import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './App.css';
import StationMap from './components/StationMap';
import rootReducer from './rootReducer'


const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StationMap/>
      </Provider>
    )
  }
}

export default App;
