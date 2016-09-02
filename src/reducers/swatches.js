export default function (state = getDefaultSwatches(), action) {
  // switch(action.type) {
  // case 'CHANGE_COLOR':
  //   return action.color
  //   break
  // default:
    return state
  // }
}

function getDefaultSwatches() {
  return [
    '#000000',
    '#AAAAAA',
    '#FFFFFF',
    '#DD1122',
    '#FF5555',
    '#FF8F33',
    '#EECCAA',
    '#FFFF55',
    '#33E744',
    '#4465CE',
    '#7733A2',
    '#DD55BC',
    '#FFBBBB',
  ]
}