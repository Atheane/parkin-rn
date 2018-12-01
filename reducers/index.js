import { combineReducers } from "redux"
import spots from "./spots"
import userPosition from "./userPosition"
import socketId from './socketId'

export default combineReducers({
  spots,
  userPosition,
  socketId
})