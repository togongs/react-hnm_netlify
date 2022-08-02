let initialState = {
  id: "",
  password: "",
  authenticate: false,
};

function authenticateReducer(state = initialState, action) {
  let { type, payload } = action;
  console.log("action", action);
  switch (type) {
    case "LOGIN_SUCCESS":
      console.log("login success reducer");
      return {
        ...state,
        id: payload.id,
        password: payload.password,
        authenticate: true,
      };
    case "LOGOUT_SUCCESS":
      console.log("logout success reducer");
      return {
        ...state,
        id: payload.id,
        password: payload.password,
        authenticate: false,
      };
    default:
      return { ...state };
  }
}

export default authenticateReducer;
