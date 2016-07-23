// import { SLIDESHOW_LOADING, ERROR_LOADING_SLIDESHOW, SLIDESHOW_LOADED } from '../actions/Slideshow'

export default function (state = '#000', action) {
  switch(action.type) {
  case 'CHANGE_COLOR':
    return action.color
    break
  default:
    return state
  }
}
