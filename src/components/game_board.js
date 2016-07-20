import React, { Component } from 'react'

export default class GameBoard extends Component {
  // What goes here?? This is just the canvas

  render(){
    return(
      <canvas id="game-board" width="800" height="600">
        <h1>Too bad!</h1>
        <p>Your browser doesn't seem to support canvas. Consider upgrading!</p>
      </canvas>
    )
  } 
}