import { combineReducers } from 'redux'
import {
  allUsers,
  filteredUsers,
  renderType
} from './reducers'

export default combineReducers({
  allUsers,
  filteredUsers,
  renderType
})
