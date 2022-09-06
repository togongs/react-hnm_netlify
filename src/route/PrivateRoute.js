import React from "react";
import { Navigate } from "react-router-dom";
import ProductDetail from "../page/ProductDetail";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = () => {
  const authenticate = useSelector((state) => state.auth.authenticate);
  return (
    authenticate &&
    (authenticate ? <ProductDetail /> : <Navigate to="/login" />)
  );
};

export default PrivateRoute;
