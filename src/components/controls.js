import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo';

export class Controls extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  render(){
    window.controls = this
    return(
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button
          onClick={() => { this.props.dispatch(ActionCreators.undo()) }}
        >Undo</button>
        <button
          onClick={() => { this.props.dispatch(ActionCreators.redo()) }}
        >Redo</button>
      </div>
    )
  } 
}

export default connect()(Controls)
