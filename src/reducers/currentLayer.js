export default function (state = 0, action) {
  switch(action.type) {
  case 'CHANGE_LAYER':
    console.log(`Editing layer ${action.position}`)
    return action.position
    break
  default:
    return state
  }
}
