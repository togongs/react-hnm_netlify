import { authActions } from "../reducers/authenticateReducer";

function login(id, password) {
  return (dispatch, getState) => {
    console.log("login success action");
    // dispatch({ type: "LOGIN_SUCCESS", payload: { id, password } });
    dispatch(authActions.login({ id, password }));
  };
}

function logout() {
  return (dispatch, getState) => {
    console.log("logout success action");
    // dispatch({
    //   type: "LOGOUT_SUCCESS",
    //   payload: { id: "", password: "" },
    // });
    dispatch(authActions.logout({ id: "", password: "" }));
  };
}

export const authenticateAction = { login, logout };
