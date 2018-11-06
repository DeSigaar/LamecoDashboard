import axios from "axios";

import { GET_COMPANIES, GET_ERRORS, ADD_COMPANIES } from "./types";
export const getCompanies = () => dispatch => {
  axios
    .get("/api/company/ordered")
    .then(res => dispatch({ type: GET_COMPANIES, payload: res.data }))
    .catch(err => dispatch({ type: GET_COMPANIES, payload: null }));
};

export const addCompany = (data, history) => dispatch => {
  axios
    .post("/api/company/add", data)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: ADD_COMPANIES,
        payload: err.response.data
      })
    );
};
