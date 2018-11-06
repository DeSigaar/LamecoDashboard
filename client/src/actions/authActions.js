import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILE,
  PROFILE_LOADING
} from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/user/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  dispatch(clearErrors());
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Request forgot password
export const forgotPassword = (
  data,
  history,
  reverseFalse,
  reverseTrue
) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/forgot/request", data)
    .then(res => {
      reverseTrue();
      history.push("/sent-password-reset");
    })
    .catch(err => {
      reverseFalse();
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Update user by email from request
export const updateUserWithEmail = (data, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/forgot/update", data)
    .then(res => {
      history.push("/password-reset-success");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/user/current")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const updateProfile = (data, history) => dispatch => {
  axios
    .post(`/api/user/update/${data.id}`, data)
    .then(res => {
      dispatch(getCurrentProfile());
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addUser = (data, history) => dispatch => {
  axios
    .post("/api/user/register", data)
    .then(res => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
