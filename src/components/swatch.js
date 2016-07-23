import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class Swatch extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
  }

  setColor = () => {
    this.props.dispatch({type: 'CHANGE_COLOR', color: this.props.color})
  }

  render(){
    const swatchStyle = {
      display: 'inline-block',
      height: '30px',
      width: '30px',
      border: '1px solid black',
      backgroundColor: this.props.color
    }
    return(
      <div
        style={swatchStyle}
        onClick={() => this.setColor()}
      />
    )
  } 
}

function mapStateToProps(state) {
  return {
    colors: state.colors.present
  }
}

export default connect(mapStateToProps)(Swatch)
