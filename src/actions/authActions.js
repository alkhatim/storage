import http from "../services/http";
import types from "./types";
import messages from "../services/messages";

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await http.post("/authentication", {
      UserName: username,
      Password: password,
    });
    const user = res.data;
    const token = user.token;
    localStorage.setItem("token", token);
    http.setToken(token);
    dispatch({
      type: types.LOGGED_IN,
      payload: {
        user,
      },
    });
  } catch (error) {
    messages.error(error);
    localStorage.removeItem("token");
    http.setToken(null);
    dispatch({
      type: types.LOGIN_FAILED,
    });
  }
};

export const register = (username, password, email) => async (dispatch) => {
  try {
    await http.post("/register", {
      UserName: username,
      Password: password,
      Email: email,
    });
    messages.success("User registered");
    dispatch({
      type: types.REGISTERED,
    });
  } catch (error) {
    messages.error(error);
    dispatch({
      type: types.REGISTER_FAILED,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token)
    return dispatch({
      type: types.USER_LOAD_FAILED,
    });

  http.setToken(token);

  try {
    const res = await http.get("/authentication");
    const user = res.data;
    dispatch({
      type: types.USER_LOADED,
      payload: {
        user,
      },
    });
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 401) {
      http.setToken(null);
      localStorage.removeItem("token");
    }
    dispatch({
      type: types.USER_LOAD_FAILED,
    });
  }
};

export const logOut = () => async (dispatch) => {
  localStorage.removeItem("token");
  http.setToken(null);
  dispatch({
    type: types.LOGGED_OUT,
  });
};
