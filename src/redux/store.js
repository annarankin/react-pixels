import { createStore } from 'redux'
import reducer from './combined_reducers'

export default(
  createStore(reducer)
)
