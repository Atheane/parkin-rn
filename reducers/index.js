import { combineReducers } from "redux"
import spots from "./spots"
import userPosition from "./userPosition"

export default combineReducers({
  spots,
  userPosition
})