import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { id, password } = data;
  try {
    console.log("data", data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    const { id, password, authenticate } = data;
    try {
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login(state, action) {
    //   console.log("login action", action);
    //   state.id = action.payload.id;
    //   state.password = action.payload.password;
    //   state.authenticate = true;
    // },
    // logout(state, action) {
    //   console.log("logout action", action);
    //   state.id = action.payload.id;
    //   state.password = action.payload.password;
    //   state.authenticate = false;
    // },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
    },
    [login.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.authenticate = action.payload.authenticate;
    },
    [login.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [logout.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
    },
    [logout.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.authenticate = action.payload.authenticate;
    },
    [logout.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

console.log("aaa", authSlice);
// Object : actions, reducer

export const authActions = authSlice.actions;
export default authSlice.reducer;
