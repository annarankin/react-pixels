import React, { Component, PropTypes } from 'react'

export default class Layer extends Component {
  static propTypes = {
    pixels: PropTypes.array,
    dimensions: PropTypes.object,
  }

  static defaultProps = {
    pixels: []
  }

  renderLayer() {
    ::this.fillPixels()
  }

  fillPixels() {
    this.props.pixels.forEach((row, x) => {
      row.forEach((square, y) => {
        square.fill()
      })
    })
  }

  render(){
    this.renderLayer()
    return null
  } 
}

