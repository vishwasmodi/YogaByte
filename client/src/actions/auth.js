import * as actions from "./types";

import AuthService from "../services/auth.service";

export const register = (name, username, email, password) => (dispatch) => {
  return AuthService.register(name, username, email, password).then(
    (data) => {
      const message = "Success!";
      dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: { user: data },
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.data.data;
      dispatch({
        type: actions.REGISTER_FAIL,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      const message = "Success!";
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: { user: data },
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data;

      dispatch({
        type: actions.LOGIN_FAIL,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: actions.LOGOUT,
  });
};
