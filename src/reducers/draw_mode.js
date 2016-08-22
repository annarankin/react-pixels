export default function (state = 'draw', action) {
  switch(action.type) {
  case 'SWITCH_MODE':
  console.log(state)
    return action.mode
  default:
    return state
  }
}
