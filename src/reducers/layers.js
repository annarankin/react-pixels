export default function (state = defaultData(), action) {
  switch(action.type) {

  case 'ADD_LAYER':
    return state.concat(defaultData(1))

  case 'CLEAR_PIXELS':
    return defaultData()
  
  case 'FILL_PIXEL':
    const { newPixel } = action
    const { x, y, color } = action.newPixel
    const originalColumn = [ ...state[0][x] ]
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
      { ...state[0], pixelData: [...state[0].pixelData.slice(0, x),
      modifiedColumn,
      ...state[0].pixelData.slice(x + 1),]}
    ]
  
  case 'FILL_PIXEL_GROUP':
    const pixelsToFill = action.pixels
    const stateCopy = _.cloneDeep(state)
    pixelsToFill.forEach((pixel, i) => {
      stateCopy[0].pixelData[pixel.x][pixel.y].color = action.color
    })
    return stateCopy
  
  case 'LOAD_PIXEL_DATA':
    return action.pixels
  
  default:
    return state
  }
}

function defaultData(position) {
  // 16 x 12 board for now
  const pixelData = numberArray(16).map((row, x) => {
    return numberArray(16).map((col, y) => {
      return { x, y, color: 'transparent' }
    })
  })
  return [ { position: position || 0, pixelData, visible: true } ]
}

function numberArray(length) {
  return Array.apply([], Array(length)).map((el, index) => index)
}