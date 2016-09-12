export default function (state = defaultData(), action) {
  switch(action.type) {
  case 'CLEAR_PIXELS':
    return defaultData()
  case 'FILL_PIXEL':
    const { newPixel } = action
    const { x, y, color } = action.newPixel
    const originalColumn = [ ...state[x] ]
    const originalSquare = { ...originalColumn[y] }

    const modifiedColumn = [
      ...originalColumn.slice(0, y),
      {
        ...originalSquare,
        color: color,
      },
      ...originalColumn.slice(y + 1),
    ]

    return [
      ...state.slice(0, x),
      modifiedColumn,
      ...state.slice(x + 1),
    ]
  case 'FILL_PIXEL_GROUP':
    const pixelsToFill = action.pixels
    const stateCopy = _.cloneDeep(state)
    pixelsToFill.forEach((pixel, i) => {
      stateCopy[pixel.x][pixel.y].color = action.color
    })
    return stateCopy
  case 'LOAD_PIXEL_DATA':
    return action.pixels
  default:
    return state
  }
}

function defaultData() {
  // 16 x 12 board for now
  const grid = numberArray(16).map((row, x) => {
    return numberArray(16).map((col, y) => {
      return { x, y, color: 'transparent' }
    })
  })
  return grid
}

function numberArray(length) {
  return Array.apply([], Array(length)).map((el, index) => index)
}