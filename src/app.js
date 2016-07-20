import styles from './styles/style.css'
import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import GameBoard from './components/game_board.js'

render(<GameBoard/>, document.getElementById('game-board'))
