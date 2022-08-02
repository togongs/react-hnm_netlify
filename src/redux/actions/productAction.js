import axios from "axios";

// 미들웨어함수는 함수를 리턴한다

// 1. 데이터를 미들웨어에 먼저 보낸다
// 2. 받은 데이터를 reducer로 보낸다
function getProducts(searchQuery) {
  return (dispatch, getState) => {
    axios(
      `https://my-json-server.typicode.com/togongs/hnm-web/products?q=${searchQuery}`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log(data);
      // setProductList(data);
      dispatch({ type: "GET_PRODUCT_SUCCESS", payload: { data } });
    });
  };
}

function getProductsDetail(id) {
  return (dispatch, getState) => {
    axios(
      `https://my-json-server.typicode.com/togongs/hnm-web/products/${id}`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log(data);
      dispatch({ type: "GET_PRODUCT_DETAIL_SUCCESS", payload: { data } });
    });
  };
}

export const productAction = { getProducts, getProductsDetail };
