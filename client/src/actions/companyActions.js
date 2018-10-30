import axios from "axios";

import { GET_COMPANIES } from "./types";
export const getCompanies = () => dispatch => {
  axios
    .get("/api/company/all")
    .then(res => dispatch({ type: GET_COMPANIES, payload: res.data }))
    .catch(err => dispatch({ type: GET_COMPANIES, payload: null }));
};
