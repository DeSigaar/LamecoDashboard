import {
  GET_COMPANIES,
  DELETE_COMPANY,
  DELETE_DASHBOARD
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

    default:
      return state;
  }
}
