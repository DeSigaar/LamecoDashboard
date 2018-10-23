import isEmpty from "../validation/is-empty";
import {
  SET_CURRENT_USER,
  GET_PROFILE,
  PROFILE_LOADING
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
