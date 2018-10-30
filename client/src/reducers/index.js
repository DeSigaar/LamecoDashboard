import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import companyReducer from "./companyReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  company: companyReducer
});
