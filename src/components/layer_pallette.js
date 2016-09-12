import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class LayerPallette extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    layers: PropTypes.array.isRequired,
  }

  changeCurrentLayer = (position) => {
    this.props.dispatch({ type: 'CHANGE_LAYER', position })
  }

  renderNames = () => {
    const { layers } = this.props
    return layers.map((layer, i) => {
      return (
        <p 
        style={ {backgroundColor: 'yellow'}}
        value={layer.position} 
        key={i}
        onClick={ () => { this.changeCurrentLayer(layer.position) }} >
        Layer {layer.position}
      </p>)
    })
  } 

  render(){
    return(
      <div className='layer-pallette'>
        {this.renderNames()}
        <button
          onClick={() => { this.props.dispatch({type: 'ADD_LAYER'}) }}
          >Add Layer</button>
      </div>
    )
  } 
}

function mapStateToProps(state) {
  return {
    layers: state.layers.present
  }
}

export default connect(mapStateToProps)(LayerPallette)