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
      <div className="controls" style={{['-webkit-app-region']: 'drag', display: 'flex', justifyContent: 'space-around'}}>
        <p>Pixely stuff</p>
        <button
          onClick={() => { this.props.dispatch({type: 'SAVE_IMG' }) } }
        >Save</button>
        <button
          onClick={() => { this.props.dispatch({type: 'LOAD_IMG' }) } }
        >Load</button>
        <button
          onClick={() => { this.props.dispatch({type: 'CLEAR_PIXELS' }) } }
        >Clear</button>
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
