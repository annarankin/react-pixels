import React, { Component, PropTypes } from 'react'

export default class BackgroundLayer extends Component {
  static propTypes = {
    ctx: PropTypes.object,
    dimensions: PropTypes.object,
  }

  state = {
    img: null,
  }

  componentDidMount() {
    const img = new Image()
    img.src = './images/checkerboard.png'
    img.onload = () => {
      this.setState({img})
    }
  }

  renderLayer() {
    const { ctx, dimensions } = this.props
    const { img } = this.state
    if (!img) { return null }

    var ptrn = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
  }

  render(){
    this.renderLayer()
    return null
  } 
}

