import React, { Component, PropTypes } from 'react'

export default class Layer extends Component {
  static propTypes = {
    pixels: PropTypes.array,
    gridEnabled: PropTypes.bool,
  }

  static defaultProps = {
    pixels: []
  }

  renderLayer() {
    this.strokeGrid(null)
  }

  strokeGrid = (gridEnabled) => {
    const enabled = gridEnabled || this.props.gridEnabled
    if (!enabled) { return }
    this.props.pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.stroke()
      })
    })    
  }

  render(){
    this.renderLayer()
    return null
  } 
}

