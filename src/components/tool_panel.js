import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PallettePicker } from '.'  

export class ToolPanel extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  render(){
    window.controls = this
    return(
      <div className="tool-panel">
        <button
          className={this.props.drawMode === 'draw' ? 'selected' : null}
          onClick={() => { this.props.dispatch({type: 'SWITCH_MODE', mode: 'draw'}) } }
        >
          <img src="./images/pencil.png"/>
        </button>
        <button
          className={this.props.drawMode === 'fill' ? 'selected' : null}
          onClick={() => { this.props.dispatch({type: 'SWITCH_MODE', mode: 'fill'}) } }
        >
          <img src="./images/bucket.png"/>
        </button>
        <button
          className={!!this.props.gridEnabled ? 'highlighted' : null}
          onClick={() => { this.props.dispatch({type: 'TOGGLE_GRID'}) } }
        >
          <img src="./images/grid.png"/>
        </button>
        <PallettePicker />
      </div>
    )
  } 
}

function mapStateToProps(state) {
  return { drawMode: state.drawMode, gridEnabled: state.gridEnabled }
}

export default connect(mapStateToProps)(ToolPanel)
