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
    '#5F634F',
    '#9BC4CB',
    '#CFEBDF',
    '#E2FADB',
    '#DBEFBC',
    '#FFFFFF',
    '#721121',
    '#A5402D',
    '#F15156',
    '#FFC07F',
    '#FFCF99',
  ]
}