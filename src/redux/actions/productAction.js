// redux middleware action creator

import axios from "axios";
import { productActions } from "../reducers/ProductReducer";

// 1. 데이터를 미들웨어에 먼저 보낸다
// 2. 받은 데이터를 reducer로 보낸다

// 미들웨어 함수들
function getProducts(searchQuery, page, cnt) {
  // 미들웨어함수는 함수를 리턴한다
  return async (dispatch, getState) => {
    await axios(
      `https://my-json-server.typicode.com/togongs/react-hnm_netlify/products?q=${searchQuery}`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log("getProducts data?", data);

      const list = data.slice(0, cnt * page); // 페이지 당 아이템 리스트
      console.log("list", list);

      dispatch(productActions.getAllProducts({ list })); // reducer의 createSlice의 getAllProducts액션함수를 호출
    });
  };
}

function getProductsDetail(id) {
  return async (dispatch, getState) => {
    await axios(
      `https://my-json-server.typicode.com/togongs/react-hnm_netlify/products/${id}`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log(data);
      dispatch(productActions.getSingleProduct({ data }));
    });
  };
}

function loadMore(p, cnt) {
  console.log("p", p);
  return async (dispatch) => {
    await axios(
      `https://my-json-server.typicode.com/togongs/react-hnm_netlify/products/`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log("data", data);

      const list = data.slice(0, cnt * p); // 페이지 당 아이템 리스트
      console.log("list", list);

      console.log("data.length", data.length);
      console.log("list.length", list.length);
      // 총 결과수 랑 표시할 결과가 같은경우
      if (data.length == 0 || list.length == data.length) {
        dispatch(productActions.getAllProducts({ list, isLast: true })); // reducer의 createSlice의 getAllProducts액션함수를 호출
      } else {
        dispatch(productActions.getAllProducts({ list, isLast: false })); // reducer의 createSlice의 getAllProducts액션함수를 호출
      }
    });
  };
}

export const productAction = { getProducts, getProductsDetail, loadMore };
