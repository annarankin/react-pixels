import undoable, { includeAction } from 'redux-undo'
import { combineReducers } from 'redux'
import * as reducers from '../reducers'

// const reducerNames = Object.keys(reducers)

// const undoableReducers = {}
// reducerNames.forEach((reducerName) => undoableReducers[reducerName] = undoable(reducers[reducerName]))

reducers.layers = undoable(reducers.layers, { filter: includeAction('FILL_PIXEL_GROUP') })

const reducer = combineReducers(reducers)
export default reducer
