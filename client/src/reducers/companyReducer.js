import { GET_COMPANIES, ADD_COMPANIES } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        company: action.payload
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
