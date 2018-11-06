import axios from "axios";

import { GET_COMPANIES, GET_ERRORS, DELETE_COMPANY } from "./types";
export const getCompanies = () => dispatch => {
  axios
    .get("/api/company/ordered")
    .then(res => dispatch({ type: GET_COMPANIES, payload: res.data }))
    .catch(err => dispatch({ type: GET_COMPANIES, payload: null }));
};

// Delete post
export const deleteCompany = id => dispatch => {
  axios
    .delete(`/api/company/remove/${id}`)
    .then(res => dispatch({ type: DELETE_COMPANY, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
