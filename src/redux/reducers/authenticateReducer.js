import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  id: "",
  password: "",
  authenticate: false,
};

// function authenticateReducer(state = initialState, action) {
//   let { type, payload } = action;
//   console.log("action", action);
//   switch (type) {
//     case "LOGIN_SUCCESS":
//       console.log("login success reducer");
//       return {
//         ...state,
//         id: payload.id,
//         password: payload.password,
//         authenticate: true,
//       };
//     case "LOGOUT_SUCCESS":
//       console.log("logout success reducer");
//       return {
//         ...state,
//         id: payload.id,
//         password: payload.password,
//         authenticate: false,
//       };
//     default:
//       return { ...state };
//   }
// }

// export default authenticateReducer;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log("login action", action);
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.authenticate = true;
    },
    logout(state, action) {
      console.log("logout action", action);
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.authenticate = false;
    },
  },
});

console.log("aaa", authSlice);
// Object : actions, reducer

export const authActions = authSlice.actions;
export default authSlice.reducer;
