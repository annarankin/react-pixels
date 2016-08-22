export default function (state = '#000', action) {
  switch(action.type) {
  case 'CHANGE_COLOR':
    return action.color
    break
  default:
    return state
  }
}
