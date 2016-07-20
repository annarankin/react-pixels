import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export class GameBoard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    drawingData: PropTypes.array.isRequired,
  }

  handleClick = () => {
    const { dispatch } = this.props
    console.log('Dispatch an action to update the state of the pixel board')
    dispatch({type: 'coloring a pixel'})
    // Should determine where click occurred and let redux know that pixel should change color
  }

  render(){

    return(
      <canvas 
        id="game-board" 
        width="800" 
        height="600"
        onClick={() => { this.handleClick() }}
      >
        <h1>Too bad!</h1>
        <p>Your browser does not seem to support canvas. Consider upgrading!</p>
      </canvas>
    )
  } 
}

function mapStateToProps(state) {
  return {
    drawingData: state.drawingData,
  }
}

export default connect(mapStateToProps)(GameBoard)
