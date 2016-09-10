import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Square } from '../shapes'

export class GameBoard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pixelData: PropTypes.array.isRequired,
    dimensions: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    gridEnabled: PropTypes.bool,
    drawMode: PropTypes.string,
  }

  static defaultProps = {
    gridEnabled: true,
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
        const coords = { x: col.x * size, y: col.y * size }
        const pixel = new Square(
          ctx,
          size,
          coords,
          col.color
        )
        return pixel
      })
    })
    this.setState({pixels: pixels}, () => {
      this.fillPixels(pixelData)
      this.strokeGrid(pixels)
    })
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(this.props, nextProps)
    const noChangesOccurred = (_.isEqual(nextProps.pixelData, this.props.pixelData) && _.isEqual(nextProps.gridEnabled, this.props.gridEnabled))
    if (noChangesOccurred) { return }
    this.fillPixels(nextProps.pixelData)
    this.strokeGrid(this.state.pixels, nextProps.gridEnabled)
  }

  fillPixels = (pixelData) => {
    this.state.pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.color = pixelData[x][y].color
        square.fill()
      })
    })
  }

  strokeGrid = (pixels, gridEnabled) => {
    const enabled = gridEnabled || this.props.gridEnabled
    if (!gridEnabled) { return }
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
    if (this.props.gridEnabled) {gridPixel.stroke()}
  }

  floodFill = (event) => {
    const { dispatch, color } = this.props
    const pixelCoords = this.getPixelData(event)
    const gridPixel = this.props.pixelData[pixelCoords.x][pixelCoords.y]

    // debugger
    if (color === gridPixel.color) { return console.log('Colors are the same!')}
    console.log('Flood fill BEGIN') 

    let queue          = []
    const pixelsToFill = []
    queue.push(gridPixel)

    while (queue.length > 0) {
      // console.log(queue)
      const currentPixel = queue.shift()  
      const neighbors = this.getNeighbors(currentPixel)
      // debugger
      const toFill = _.filter(neighbors, (neighbor) => {
        console.log(!_.find(pixelsToFill, neighbor))
        return !!neighbor && neighbor.color === currentPixel.color && !_.find(pixelsToFill, neighbor)
      })
      queue = _.uniqWith(queue.concat(toFill), _.isEqual)
      pixelsToFill.push(currentPixel)
      // either add them to the queue or eliminate them based on color/already analyzed
      // remove the first pixel from the queue and add it to pixelsToFill
    }
    dispatch({type: 'FILL_PIXEL_GROUP', pixels: pixelsToFill, color})
  }


  getNeighbors = (pixel) => {
    if (!pixel) {return []}

    const { size }   = this.props.dimensions 
    const { x,y }    = pixel
    const { pixelData } = this.props

    const topNeighbor     = !!pixelData[x][y-1] ? pixelData[x][y - 1] : undefined
    const bottomNeighbor  = !!pixelData[x][y+1] ? pixelData[x][y + 1] : undefined
    const rightNeighbor   =  !!pixelData[x + 1] ? pixelData[x+1][y] : undefined 
    const leftNeighbor    =  !!pixelData[x - 1] ? pixelData[x-1][y] : undefined 
    // try to grab neighbors... without dying :/
    // debugger
    return _.filter([topNeighbor, bottomNeighbor, rightNeighbor, leftNeighbor], (el) => {return !!el} )
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
    const { dispatch, color } = this.props
    dispatch({type: 'FILL_PIXEL_GROUP', pixels: this.state.strokePixels, color})
    this.setState({ dragging: false, strokePixels: [] })
  }
  
  handleMouseDown = (event) => {
    if (this.props.drawMode === 'fill') {
      this.floodFill(event)
    } else {
      this.fillPixel(event) 
      const newPixel = this.getPixelData(event)  
      this.setState({ dragging: true, strokePixels: [newPixel] })
    } 
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
    drawMode: state.drawMode,
    gridEnabled: state.gridEnabled,
  }
}

export default connect(mapStateToProps)(GameBoard)