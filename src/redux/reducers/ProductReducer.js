import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

let initialState = {
  productList: [],
  selectedItem: "",
  loading: false,
  isLast: false,
  error: null,
};

// 1. 매번 ifelse switch
// 2. 액션함수의 정해준 이름과 똑같아야한다 (오타 가능성 up)
// 3. ...state와 return 필수

// function productReducer(state = initialState, action) {
//   let { type, payload } = action;
//   console.log("action", action);
//   switch (type) {
//     case "GET_PRODUCT_SUCCESS":
//       return { ...state, productList: payload.data };

//     case "GET_SINGLE_PRODUCT_SUCCESS":
//       return { ...state, selectedItem: payload.data };

//     default:
//       return { ...state };
//   }
// }
// export default productReducer;

// action type 생성
// thunk action creator 반환 (pending, fulfilled, rejected)
// action creator? => promise 콜백을 실행, promise기반으로 lifecycle action을 dispatch
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  // 썽크는 하나의 매개변수만 입력 가능
  // 그러므로 dispatch를 할때 객체로 전달해야함
  async (data, thunkAPI) => {
    // console.log("All data", data);
    const { searchQuery, page, cnt } = data;

    try {
      const res = await api.get(
        `https://my-json-server.typicode.com/togongs/react-hnm_netlify/products?q=${searchQuery}`
      );
      const data = res.data;
      const list = data.slice(0, cnt * page); // 페이지 당 아이템 리스트 갯수
      console.log("list", list);

      return thunkAPI.fulfillWithValue(list);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LoadMore = createAsyncThunk(
  "product/LoadMore",
  // 썽크는 하나의 매개변수만 입력 가능
  // 그러므로 dispatch를 할때 객체로 전달해야함
  async (data, thunkAPI) => {
    console.log("LoadMore data", data);
    const { p, cnt } = data;

    try {
      const res = await api.get(
        `https://my-json-server.typicode.com/togongs/react-hnm_netlify/products`
      );
      const data = res.data;
      const list = data.slice(0, cnt * p - 4); // 4개씩 더 가져오기
      console.log("list", list);

      // 총 결과수 랑 표시할 결과가 같은 경우
      if (data.length === 0 || list.length === data.length) {
        // dispatch(productActions.getAllProducts({ list, isLast: true })); // reducer의 createSlice의 getAllProducts액션함수를 호출
        return thunkAPI.fulfillWithValue({ list, isLast: true });
      } else {
        // dispatch(productActions.getAllProducts({ list, isLast: false })); // reducer의 createSlice의 getAllProducts액션함수를 호출
        return thunkAPI.fulfillWithValue({ list, isLast: false });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (data, thunkAPI) => {
    console.log("Detail data??", data);
    const { id } = data;

    try {
      const res = await api.get(
        `https://my-json-server.typicode.com/togongs/react-hnm_netlify/products/${id}`
      );
      const data = res.data;
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      // 오류처리
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product", // unique한 액션네임을 만들어줌 (직접만들필요x)
  initialState,
  reducers: {
    // ifelse, switch 써서 만든 케이스들
    // 함수로 만듦
    // getAllProducts(state, action) {
    //   // 액션함수들
    //   // return ...state x
    //   state.productList = action.payload.list;
    //   state.isLast = action.payload.isLast;
    // },
    // getSingleProduct(state, action) {
    //   state.selectedItem = action.payload.data;
    // },
  },
  // 썽크 미들웨어는 extraReducers
  // 리듀서 생성
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.loading = false;
      state.productList = action.payload;
    },
    [getAllProducts.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.loading = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [LoadMore.pending]: (state, action) => {
      state.loading = true;
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
    },
    [LoadMore.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.loading = false;
      state.productList = action.payload.list;
      state.isLast = action.payload.isLast;
    },
    [LoadMore.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.loading = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [getSingleProduct.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
      state.loading = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.loading = false;
      state.selectedItem = action.payload;
    },
    [getSingleProduct.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.loading = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

console.log("ppp", productSlice);
// Object : { actions(getAllProduct, getSingleProduct), name, reducer( getAllProduct(), getSingleProduct() )}
// reducer- 함수들 통합
export const productActions = productSlice.actions;
export default productSlice.reducer;
