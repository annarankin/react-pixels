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
    pixels: [],
    strokePixels: [],
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
          col.color
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
    this.strokeGrid(this.state.pixels)
  }

  fillPixels = (pixelData) => {
    this.state.pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.color = pixelData[x][y].color
        square.fill()
      })
    })
  }

  strokeGrid = (pixels) => {
    pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.stroke()
      })
    })    
  }

  getPixelData = (event) => {
    const { color }            = this.props
    const { size }             = this.props.dimensions 
    const { offsetX, offsetY } = event.nativeEvent

    const coords = { x: Math.floor(offsetX/size), y: Math.floor(offsetY/size) }
    return { ...coords, color }
  }

  fillPixel = (event) => {
    console.log('action firing')
    const { dispatch } = this.props
    const newPixel = this.getPixelData(event)
    const gridPixel = this.state.pixels[newPixel.x][newPixel.y]
    gridPixel.color = this.props.color
    gridPixel.fill()
    this.strokeGrid(this.state.pixels)
  }

  // Event handlers

  handleDrag = (event) => {
    if (!this.state.dragging) {return}
    const { pixelData } = this.props
    const newPixel = this.getPixelData(event)
    this.fillPixel(event)
    const noChangesOccurred = pixelData[newPixel.x][newPixel.y].color === newPixel.color
    if (noChangesOccurred) { return }

    this.setState({ strokePixels: this.state.strokePixels.concat(newPixel) })
  }

  handleMouseUp = (event) => {
    if (_.isEmpty(this.state.strokePixels)) { return }
    const { dispatch } = this.props
    dispatch({type: 'FILL_PIXEL_GROUP', pixels: this.state.strokePixels})
    this.setState({ dragging: false, strokePixels: [] })
  }
  
  handleMouseDown = (event) => {
    const newPixel = this.getPixelData(event)   
    this.fillPixel(event) 
    this.setState({ dragging: true, strokePixels: [newPixel] })
  }

  render(){
    window.board = this
    return(
      <canvas 
        id="game-board" 
        width={this.props.dimensions.width} 
        height={this.props.dimensions.height}
        onMouseDown={(event) => {this.handleMouseDown(event)}}
        onMouseUp={(event) => {this.handleMouseUp(event)}}
        onMouseMove={(event) => { this.handleDrag(event) }}
        onMouseLeave={(event) => {this.handleMouseUp(event)}}
        ref={this.getContext}
      >
        <h1>Too bad!</h1>
        <p>Your browser does not seem to support canvas. Consider upgrading!</p>
      </canvas>
    )
  }
  // Helper Functions

  getContext = (c) => {
    this.ctx = c.getContext('2d')
  } 
}

function mapStateToProps(state) {
  return {
    pixelData: state.pixelData.present,
    dimensions: state.dimensions,
    color: state.colors,
  }
}

export default connect(mapStateToProps)(GameBoard)
