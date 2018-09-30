import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER
} from "../actions/types";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case UPDATE_USER:
      return {
        ...state
      };
    default:
      return state;
  }
}
