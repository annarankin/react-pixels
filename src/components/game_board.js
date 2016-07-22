import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Square } from '../shapes'


export class GameBoard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pixelData: PropTypes.array.isRequired,
    dimensions: PropTypes.object.isRequired,
  }

  state = {
    pixels: []
  }

  componentDidMount() {
    const { pixelData } = this.props
    const { size } = this.props.dimensions
    const { ctx } = this.state

    const pixels = pixelData.map((row, x) => {
      return row.map((col, y) => {
        const coords = { x: col.coords[0] * size, y: col.coords[1] * size }
        const pixel = new Square(
          null,
          size,
          coords,
          '#' + col.fillColor
        )
        return pixel
      })
    })
    this.setState({pixels: pixels})     
  }

  componentDidUpdate = () => {
    
    this.state.pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.ctx = this.state.ctx
        square.color = '#' + this.props.pixelData[x][y].fillColor
        square.fill()
      })
    })
    this.strokeGrid(this.state.pixels, this.state.ctx)
  }
  
  strokeGrid = (pixels, ctx) => {
    pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.ctx = ctx
        square.stroke()
      })
    })    
    // grab squaregrid and do this for each
    // const sqr = new Path2D();
    // this.ctx.strokeStyle = 'rgb(200,200,200)';
    // sqr.moveTo(100, 100)
    // sqr.lineTo(100, 200)
    // sqr.lineTo(200, 200)
    // sqr.lineTo(200, 100)
    // sqr.lineTo(100, 100)
    // this.ctx.stroke(sqr)
  }

  fillPixel = (event) => {
    const { dispatch, dimensions } = this.props
    const { offsetX, offsetY } = event.nativeEvent
    console.log('Dispatch an action to update the state of the pixel board')
    dispatch({type: 'FILL_PIXEL', coords: { x: offsetX, y: offsetY}, size: dimensions.size})
  }

  handleDrag = (event) => {
    if (!this.state.dragging) {return}
    this.fillPixel(event)
  }

  getContext = (c) => {
    this.setState({ctx: c.getContext('2d')})
    console.log(this.state)
  }

  render(){
    // TO DO: remove
    window.board = this

    return(
      <canvas 
        id="game-board" 
        width={this.props.dimensions.width} 
        height={this.props.dimensions.height}
        onClick={(event) => { this.fillPixel(event) }}
        onMouseDown={() => {this.setState({dragging: true})}}
        onMouseUp={() => {this.setState({dragging: false})}}
        onMouseMove={(event) => { this.handleDrag(event) }}
        ref={this.getContext}
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
    dimensions: state.dimensions,
  }
}

export default connect(mapStateToProps)(GameBoard)
