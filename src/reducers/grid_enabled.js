export default function (state = true, action) {
  switch(action.type) {
  case 'TOGGLE_GRID':
    return !state 
  default:
    return state
  }
}
