import { combineReducers } from "redux"

import user from "./userReducers"
import order from "./ordersReducers"

export default combineReducers({user, order})