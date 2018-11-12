import axios from "axios";

import {
  GET_COMPANIES,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_DASHBOARDS,
  DELETE_COMPANY,
  DELETE_DASHBOARD
} from "./types";
export const getCompanies = () => dispatch => {
  axios
    .get("/api/company/ordered")
    .then(res => dispatch({ type: GET_COMPANIES, payload: res.data }))
    .catch(err => dispatch({ type: GET_COMPANIES, payload: null }));
};

// Delete company
export const deleteCompany = id => dispatch => {
  axios
    .delete(`/api/company/remove/${id}`)
    .then(res => dispatch({ type: DELETE_COMPANY, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete dashboard
export const deleteDashboard = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/dashboard/remove/${id}`)
    .then(res => dispatch({ type: DELETE_DASHBOARD, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add company
export const addCompany = (data, closePopup) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/company/add", data)
    .then(res => {
      closePopup();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Edit company
export const editCompany = (data, closePopup) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/company/update/${data.id}`, data)
    .then(res => {
      closePopup();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get dashboards
export const getDashboards = () => dispatch => {
  axios
    .get("/api/company/ordered")
    .then(res => dispatch({ type: GET_DASHBOARDS, payload: res.data }))
    .catch(err => dispatch({ type: GET_DASHBOARDS, payload: null }));
};

// Add dashboard
export const addDashboard = (data, closePopup) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/dashboard/add", data)
    .then(res => {
      closePopup();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
