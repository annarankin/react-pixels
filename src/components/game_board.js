import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Square } from '../shapes'
import { Layer, BackgroundLayer, GridLayer } from '.'

export class GameBoard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    layers: PropTypes.array.isRequired,
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
    currentLayer: 0,
  }

  componentWillReceiveProps(nextProps) {
    const pixels = this.mapPixelDataToSquares(nextProps.layers) 
    this.setState({pixels})    
  }

  componentDidMount() {   
    const pixels = this.mapPixelDataToSquares() 
    this.setState({pixels})
  }

  mapPixelDataToSquares(data) {
    const { currentLayer } = this.state
    const pixelData = data ? data[currentLayer].pixelData : this.props.layers[currentLayer].pixelData
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
    return pixels
  }

  getColor = () => {
    const { drawMode, color } = this.props
    return drawMode === 'erase' ? 'transparent' : color
  }

  getPixelData = (event) => {
    const color                = this.getColor()
    const { size }             = this.props.dimensions 
    const { offsetX, offsetY } = event.nativeEvent


    const coords = { x: Math.floor(offsetX/size), y: Math.floor(offsetY/size) }
    return { ...coords, color }
  }

  fillPixel = (event) => {
    const newPixel = this.getPixelData(event)
    const gridPixel = this.state.pixels[newPixel.x][newPixel.y]
    gridPixel.color = this.getColor()
    gridPixel.fill()
    if (this.props.gridEnabled) {gridPixel.stroke()}
  }

  floodFill = (event) => {
    const { dispatch } = this.props
    const color = this.getColor()
    const pixelCoords = this.getPixelData(event)
    const gridPixel = this.props.layers[this.state.currentLayer].pixelData[pixelCoords.x][pixelCoords.y]

    let queue          = []
    const pixelsToFill = []
    queue.push(gridPixel)

    while (queue.length > 0) {
      const currentPixel = queue.shift()  
      const neighbors = this.getNeighbors(currentPixel)
      const toFill = _.filter(neighbors, (neighbor) => {
        return !!neighbor && neighbor.color === currentPixel.color && !_.find(pixelsToFill, neighbor)
      })
      queue = _.uniqWith(queue.concat(toFill), _.isEqual)
      pixelsToFill.push(currentPixel)
    }
    dispatch({type: 'FILL_PIXEL_GROUP', pixels: pixelsToFill, color})
  }


  getNeighbors = (pixel) => {
    if (!pixel) {return []}

    const { size }   = this.props.dimensions 
    const { x,y }    = pixel
    const { pixelData } = this.props.layers[this.state.currentLayer]

    const topNeighbor     = !!pixelData[x][y-1] ? pixelData[x][y - 1] : undefined
    const bottomNeighbor  = !!pixelData[x][y+1] ? pixelData[x][y + 1] : undefined
    const rightNeighbor   =  !!pixelData[x + 1] ? pixelData[x+1][y] : undefined 
    const leftNeighbor    =  !!pixelData[x - 1] ? pixelData[x-1][y] : undefined 
    return _.filter([topNeighbor, bottomNeighbor, rightNeighbor, leftNeighbor], (el) => {return !!el} )
  }
  // Event handlers

  handleDrag = (event) => {
    if (!this.state.dragging) {return}
    const { pixelData } = this.props.layers[this.state.currentLayer]
    const newPixel = this.getPixelData(event)
    this.fillPixel(event)
    const noChangesOccurred = pixelData[newPixel.x][newPixel.y].color === newPixel.color
    if (noChangesOccurred) { return }

    this.setState({ strokePixels: this.state.strokePixels.concat(newPixel) })
  }

  handleMouseUp = (event) => {
    if (_.isEmpty(this.state.strokePixels)) { return }
    const { dispatch } = this.props
    const color = this.getColor()
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
    const { dimensions, layers, gridEnabled } = this.props
    return(
      <canvas 
        id="game-board" 
        width={dimensions.width} 
        height={dimensions.height}
        onMouseDown={(event) => {this.handleMouseDown(event)}}
        onMouseUp={(event) => {this.handleMouseUp(event)}}
        onMouseMove={(event) => { this.handleDrag(event) }}
        onMouseLeave={(event) => {this.handleMouseUp(event)}}
        ref={this.getContext} >
        <BackgroundLayer
          pixels={this.state.pixels}
          dimensions={dimensions} 
          ctx={this.ctx} />
        <Layer 
          pixels={this.state.pixels}
          dimensions={dimensions} />
        <GridLayer
          pixels={this.state.pixels}
          gridEnabled={gridEnabled} />
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
    layers: state.layers.present,
    dimensions: state.dimensions,
    color: state.colors,
    drawMode: state.drawMode,
    gridEnabled: state.gridEnabled,
  }
}

export default connect(mapStateToProps)(GameBoard)