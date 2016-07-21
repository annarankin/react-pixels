import styles from './styles/style.css'

import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'

import { GameBoard } from './components'
import { Square } from './shapes'
import store from './redux/store'

class App extends Component {
  state = {
    drawingData: []
  }

  render() {
    // TO DO: remove
    window.Square = Square
    
    return(
      <Provider store={store}>
        <GameBoard/>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'))
