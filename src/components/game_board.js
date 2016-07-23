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
    const { ctx } = this

    const pixels = pixelData.map((row, x) => {
      return row.map((col, y) => {
        const coords = { x: col.coords[0] * size, y: col.coords[1] * size }
        const pixel = new Square(
          ctx,
          size,
          coords,
          col.fillColor
        )
        return pixel
      })
    })
    this.strokeGrid(pixels, ctx)

    this.setState({pixels: pixels})     
  }


  componentWillReceiveProps = (nextProps) => {
    const noChangesOccurred = (_.isEqual(nextProps.pixelData, this.props.pixelData))
    if (noChangesOccurred) { return }
    this.fillPixels(nextProps.pixelData)
    this.strokeGrid(this.state.pixels, this.ctx)
  }

  fillPixels = (pixelData) => {
    this.state.pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.color = pixelData[x][y].fillColor
        square.fill()
      })
    })
  }

  strokeGrid = (pixels, ctx) => {
    pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.ctx = ctx
        square.stroke()
      })
    })    
  }

  fillPixel = (event) => {
    const { dispatch, dimensions, color, pixelData } = this.props
    const { offsetX, offsetY } = event.nativeEvent

    const pixelX = Math.floor(offsetX / dimensions.size)
    const pixelY = Math.floor(offsetY / dimensions.size)
    const noChangesOccurred = pixelData[pixelX][pixelY].fillColor === color
    if (noChangesOccurred) { return }
    console.log('action firing')
    // compare pixel color to this.props.color
    dispatch({type: 'FILL_PIXEL', coords: { x: offsetX, y: offsetY}, size: dimensions.size, color})
  }

  handleDrag = (event) => {
    if (!this.state.dragging) {return}
    //  fill pixel, add newly filled pixel to array of pixels to be sent to reducer
    this.fillPixel(event)
  }

  getContext = (c) => {
    this.ctx = c.getContext('2d')
  }

  handleMouseUp = (event) => {
    this.setState({dragging: false})
  }

  render(){
    window.board = this

    return(
      <canvas 
        id="game-board" 
        width={this.props.dimensions.width} 
        height={this.props.dimensions.height}
        onClick={(event) => { this.fillPixel(event) }}
        onMouseDown={() => {this.setState({dragging: true})}}
        onMouseUp={(event) => {this.handleMouseUp(event)}}
        onMouseMove={(event) => { this.handleDrag(event) }}
        onMouseLeave={(event) => {this.setState({dragging: false})}}
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
    pixelData: state.pixelData.present,
    dimensions: state.dimensions.present,
    color: state.colors.present,
  }
}

export default connect(mapStateToProps)(GameBoard)
