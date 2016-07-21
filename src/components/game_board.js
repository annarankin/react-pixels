import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export class GameBoard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pixelData: PropTypes.array.isRequired,
  }

  // Create grid function
  // grab pixel data and generate squares for the grid
  // Do we want to serialize the instances themselves? Iono

  strokeGrid = () => {
    // grab squaregrid and do this for each
    const sqr = new Path2D();
    this.ctx.strokeStyle = 'rgb(200,200,200)';
    sqr.moveTo(100, 100)
    sqr.lineTo(100, 200)
    sqr.lineTo(200, 200)
    sqr.lineTo(200, 100)
    sqr.lineTo(100, 100)
    this.ctx.stroke(sqr)
  }

  handleClick = (event) => {
    // debugger
    const { dispatch } = this.props
    console.log('Dispatch an action to update the state of the pixel board')
    dispatch({type: 'coloring a pixel'})
    // Should determine where click occurred and let redux know that pixel should change color
  }

  render(){
    // TO DO: remove
    window.board = this

    return(
      <canvas 
        id="game-board" 
        width="800" 
        height="600"
        onClick={(event) => { this.handleClick(event) }}
        ref={(c) => this.ctx = c.getContext('2d')}
      >
        <h1>Too bad!</h1>
        <p>Your browser does not seem to support canvas. Consider upgrading!</p>
      </canvas>
    )
  } 
}

function mapStateToProps(state) {
  return {
    pixelData: state.pixelData,
  }
}

export default connect(mapStateToProps)(GameBoard)
