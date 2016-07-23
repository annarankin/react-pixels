import styles from './styles/style.css'

import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'

import { GameBoard, ColorPicker, Controls } from './components'
import store from './redux/store'

class App extends Component {
  state = {
    drawingData: []
  }

  render() {
    return(
      <Provider store={store}>
        <div style={{width: '800px'}}>
          <Controls/>
          <GameBoard/>
          <ColorPicker/>
        </div>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'))
