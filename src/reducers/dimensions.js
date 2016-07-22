// import { SLIDESHOW_LOADING, ERROR_LOADING_SLIDESHOW, SLIDESHOW_LOADED } from '../actions/Slideshow'

export default function (state = defaultData(), action) {
  // console.log(state)
  // Actions - fill pixel, set grid size
  return state
}

function defaultData() {
  const width = 800, 
        height = 600,
        size = 50

  return  { 
    size,
    width,
    height,
    maxCols: Math.floor(width/size),
    maxRows: Math.floor(height/size),
  }
}