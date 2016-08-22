export default function (state = 'fill', action) {
  switch(action.type) {
  case 'SWITCH_MODE':
  console.log(state)
    return state === 'fill' ? 'draw' : 'fill'
  default:
    return state
  }
}
