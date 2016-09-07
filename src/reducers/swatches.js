export default function (state = getDefaultPallette(), action) {
  switch(action.type) {
  case 'CHANGE_PALLETTE':
    return getPallette(action.palletteName)
    break
  default:
    return state
  }
}

function getDefaultPallette() {
  return getPallette('rich')
}

function getPallette(name) {
  const pallettes = { 
    default: [
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
      '#FFBBBB',],
    rich: [
      '#1a1334',
      '#26294a', 
      '#01545a',
      '#017351',
      '#03c383', 
      '#aad962',
      '#fbbf45',
      '#ef6a32', 
      '#ed0345',
      '#a12a5e',
      '#710162', 
      '#110141',], 
    xmas: [
      '#a50026',
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#ffffbf',
      '#d9ef8b',
      '#a6d96a',
      '#66bd63',
      '#1a9850',
      '#006837',
    ],
    pastel: [
      '#d53e4f',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#ffffbf',
      '#e6f598',
      '#abdda4',
      '#88ddaa',
      '#66c2a5',
      '#37b69b',
      '#3288bd',
      '#71acbc',
    ]
  }
  return({ palletteNames: Object.keys(pallettes), swatches: pallettes[name] })
}

