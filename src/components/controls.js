import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import fs from 'fs'
import path from 'path';

export class Controls extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  saveImageData = () => {
    const { pixelData } = this.props
    fs.writeFile('data.json', JSON.stringify(pixelData.present), (err) => {
      if (err) {return console.log(err)}
      console.log('yaya')
    })
  }

  loadImageData = () => {
    const { dispatch } = this.props
    fs.readFile('data.json', 'utf8', (err, file) => {
      if (err) {return console.log(err)}
      dispatch({ type: 'LOAD_PIXEL_DATA', pixels: JSON.parse(file)})
    })
  }

  render(){
    window.controls = this
    return(
      <div className="controls" style={{['-webkit-app-region']: 'drag', display: 'flex', justifyContent: 'space-around'}}>
        <p>Pixely stuff</p>
        <button
          onClick={() => { this.saveImageData() } }
        >Save</button>
        <button
          onClick={() => { this.loadImageData()} }
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

function mapStateToProps(state) {
  return { pixelData: state.pixelData }
}

export default connect(mapStateToProps)(Controls)
