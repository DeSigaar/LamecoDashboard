import axios from "axios";

import { GET_COMPANIES, GET_ERRORS, ADD_COMPANIES } from "./types";
export const getCompanies = () => dispatch => {
  axios
    .get("/api/company/ordered")
    .then(res => dispatch({ type: GET_COMPANIES, payload: res.data }))
    .catch(err => dispatch({ type: GET_COMPANIES, payload: null }));
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

export const addDashboard = data => dispatch => {
  axios
    .post("/api/dashboard/add", data)
    .then(res => {
      console.log("dashboard added");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
