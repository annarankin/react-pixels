import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Swatch } from '.';

export class PallettePicker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  changePallette = (event) => {
    this.props.dispatch({ type: 'CHANGE_PALLETTE', palletteName: event.target.value })
  }

  renderNames = () => {
    const { palletteNames } = this.props
    return palletteNames.map((name, i) => <option value={name} key={i}>{name}</option>)
  } 

  render(){
    return(
      <div className='pallette-picker'>
        <select onChange={(event) => { this.changePallette(event) }} >
          {this.renderNames()}
        </select>
      </div>
    )
  } 
}

function mapStateToProps(state) {
  return {
    palletteNames: state.swatches.palletteNames
  }
}

export default connect(mapStateToProps)(PallettePicker)