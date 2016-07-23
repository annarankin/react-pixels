// import { SLIDESHOW_LOADING, ERROR_LOADING_SLIDESHOW, SLIDESHOW_LOADED } from '../actions/Slideshow'

export default function (state = defaultData(), action) {
  switch(action.type) {
  case 'FILL_PIXEL':
    // console.log(getPixelCoords(action.coords, action.size))
    const { x, y } = getPixelCoords(action.coords, action.size)
    const originalColumn = [ ...state[x] ]
    const originalSquare = { ...originalColumn[y] }

    const modifiedColumn = [
      ...originalColumn.slice(0, y),
      {
        ...originalSquare,
        fillColor: action.color,
      },
      ...originalColumn.slice(y + 1),
    ]

    return [
      ...state.slice(0, x),
      modifiedColumn,
      ...state.slice(x + 1),
    ]
  default:
    return state
  }
}

function defaultData() {
  // 16 x 12 board for now
  const grid = numberArray(16).map((row, x) => { 
    return numberArray(12).map((col, y) => {
      return { coords: [x, y], fillColor: '#FFF' }
    }) 
  })
  return grid
}

function getPixelCoords(coords, size){
  const { x, y } = coords
  return { x: Math.floor(x/size), y: Math.floor(y/size)}
}
function numberArray(length) {
  return Array.apply([], Array(length)).map((el, index) => index)
}