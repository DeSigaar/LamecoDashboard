import {
  GET_DASHBOARDS,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  UPDATE_DASHBOARD
} from "../actions/types";

const initialState = {
  dashboards: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARDS:
      return {
        ...state,
        dashboards: action.payload
      };
    case ADD_DASHBOARD:
      return {
        ...state,
        dashboards: [action.payload, ...state.dashboards]
      };
    case DELETE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.filter(
          dashboard => dashboard._id !== action.payload
        )
      };
    case UPDATE_DASHBOARD:
      return {
        ...state
      };
    default:
      return state;
  }
}
