import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  productList: [],
  selectedItem: "",
  isLast: false,
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

const productSlice = createSlice({
  name: "product", // unique한 액션네임을 만들어줌 (직접만들필요x)
  initialState,
  reducers: {
    // ifelse, wsitch 써서 만든 케이스들
    // 함수로 만듦
    getAllProducts(state, action) {
      // 액션함수들
      // return ...state x
      console.log("action.payload.isLast", action.payload);
      state.productList = action.payload.list;
      state.isLast = action.payload.isLast;
    },
    getSingleProduct(state, action) {
      state.selectedItem = action.payload.data;
    },
  },
});

console.log("ppp", productSlice);
// Object : { actions(getAllProduct, getSingleProduct), name, reducer( getAllProduct(), getSingleProduct() )}
// reducer- 함수들 통합
export const productActions = productSlice.actions;
export default productSlice.reducer;
