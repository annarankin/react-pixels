// import { SLIDESHOW_LOADING, ERROR_LOADING_SLIDESHOW, SLIDESHOW_LOADED } from '../actions/Slideshow'

export default function (state = defaultData(), action) {
  // console.log(state)
  // Actions - fill pixel, set grid size
  return state
}

function defaultData() {
  // 16 x 12 board for now
  const grid = numberArray(16).map((row, x) => { 
    return numberArray(12).map((col, y) => {
      return { coords: [x, y], fillColor: 'FFF' }
    }) 
  })
  return grid
}

function numberArray(length) {
  return Array.apply([], Array(length)).map((el, index) => index)
}