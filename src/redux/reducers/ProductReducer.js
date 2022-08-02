let initialState = {
  productList: [],
  selectedItem: "",
};

function productReducer(state = initialState, action) {
  let { type, payload } = action;
  console.log("action", action);
  switch (type) {
    case "GET_PRODUCT_SUCCESS":
      return { ...state, productList: payload.data };

    case "GET_PRODUCT_DETAIL_SUCCESS":
      return { ...state, selectedItem: payload.data };

    default:
      return { ...state };
  }
}

export default productReducer;
