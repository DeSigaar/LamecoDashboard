import { combineReducers } from "redux";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  user: userReducer,
  dashboard: dashboardReducer
});
