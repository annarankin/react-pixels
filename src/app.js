import styles from './styles/style.css'
import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { GameBoard } from './components'
import { Provider } from 'react-redux'
import store from './redux/store'

class App extends Component {
  state = {
    drawingData: []
  }

  render() {
    return(
      <Provider store={store}>
        <GameBoard/>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'))
