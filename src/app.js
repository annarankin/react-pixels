import styles from './styles/style.css'

import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'

import { GameBoard, ColorPicker, Controls, TitleBar } from './components'
import store from './redux/store'

class App extends Component {
  state = {
    drawingData: []
  }

  render() {
    return(
      <Provider store={store}>
        <div style={{width: '100%'}}>
          <Controls/>
          <div id="display"> 
            <GameBoard/>
          </div>
          <ColorPicker/>
        </div>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'))
