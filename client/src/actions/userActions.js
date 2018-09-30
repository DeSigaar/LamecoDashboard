import axios from "axios";
import { GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER } from "./types";

export const getUsers = () => dispatch => {
  axios.get("/api/users").then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  );
};

export const addUser = user => dispatch => {
  axios.post("/api/users", user).then(res =>
    dispatch({
      type: ADD_USER,
      payload: res.data
    })
  );
};

export const deleteUser = id => dispatch => {
  axios.delete(`/api/users/${id}`).then(res =>
    dispatch({
      type: DELETE_USER,
      payload: id
    })
  );
};

export const updateUser = (id, name) => dispatch => {
  axios.post(`/api/users/${id}`).then(res =>
    dispatch({
      type: UPDATE_USER,
      payload: {
        id: id,
        name: name
      }
    })
  );
};
