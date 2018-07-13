import { combineReducers } from 'redux'
import {
  allUsers,
  filteredUsers,
  currentDisplay,
  currDispIndex,
  renderType
} from './reducers'

export default combineReducers({
  allUsers,
  filteredUsers,
  currentDisplay,
  currDispIndex,
  renderType
})
