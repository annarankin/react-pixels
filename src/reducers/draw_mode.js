export default function (state = 'draw', action) {
  switch(action.type) {
  case 'SWITCH_MODE':
    return action.mode
  default:
    return state
  }
}
