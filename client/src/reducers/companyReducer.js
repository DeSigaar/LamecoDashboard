import {
  DELETE_COMPANY,
  DELETE_DASHBOARD,
  GET_COMPANIES,
  ADD_COMPANIES
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        company: action.payload
      };
    case DELETE_COMPANY:
      return {
        ...state
      };
    case DELETE_DASHBOARD:
      return {
        ...state
      };

    case ADD_COMPANIES:
      return {
        ...state,
        company: action.payload
      };
    default:
      return state;
  }
}
