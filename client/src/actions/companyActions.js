import axios from "axios";

import {
  GET_COMPANIES,
  GET_ERRORS,
  DELETE_COMPANY,
  DELETE_DASHBOARD
} from "./types";
export const getCompanies = () => dispatch => {
  setTimeout(() => {
    axios
      .get("/api/company/ordered")
      .then(res => dispatch({ type: GET_COMPANIES, payload: res.data }))
      .catch(err => dispatch({ type: GET_COMPANIES, payload: null }));
  }, 100);
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
  axios
    .delete(`/api/dashboard/remove/${id}`)
    .then(res => dispatch({ type: DELETE_DASHBOARD, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addCompany = data => dispatch => {
  axios
    .post("/api/company/add", data)
    .then(res => {
      console.log("company added");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
