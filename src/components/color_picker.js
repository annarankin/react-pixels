import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Swatch } from '.';

export class ColorPicker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  renderSwatches = () => {
    if (!this.props.swatches) {return}
    return this.props.swatches.map((color, i) => <Swatch key={i} color={color} />)
  }

  render(){
    return(
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {this.renderSwatches()}
      </div>
    )
  } 
}

function mapStateToProps(state) {
  return {
    swatches: state.swatches.present
  }
}

export default connect(mapStateToProps)(ColorPicker)
