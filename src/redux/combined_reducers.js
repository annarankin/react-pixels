import undoable from 'redux-undo';
import { combineReducers } from 'redux'
import * as reducers from '../reducers'

const reducerNames = Object.keys(reducers)

const undoableReducers = {}
reducerNames.forEach((reducerName) => undoableReducers[reducerName] = undoable(reducers[reducerName]))

const reducer = combineReducers(undoableReducers)
export default reducer
