import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import authenticateReducer from "./authenticateReducer";

export default combineReducers({
  auth: authenticateReducer,
  product: productReducer,
});
