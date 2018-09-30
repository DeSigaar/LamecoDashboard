import axios from "axios";
import {
  GET_DASHBOARDS,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  UPDATE_DASHBOARD
} from "./types";

export const getDashboards = () => dispatch => {
  axios.get("/api/dashboards").then(res =>
    dispatch({
      type: GET_DASHBOARDS,
      payload: res.data
    })
  );
};

export const addDashboard = dashboard => dispatch => {
  axios.post("/api/dashboards", dashboard).then(res =>
    dispatch({
      type: ADD_DASHBOARD,
      payload: res.data
    })
  );
};

export const deleteDashboard = id => dispatch => {
  axios.delete(`/api/dashboards/${id}`).then(res =>
    dispatch({
      type: DELETE_DASHBOARD,
      payload: id
    })
  );
};

export const updateDashboard = (id, stuff) => dispatch => {
  axios.post(`/api/dashboards/${id}`).then(res =>
    dispatch({
      type: UPDATE_DASHBOARD,
      payload: {
        id: id,
        stuff: stuff
      }
    })
  );
};
