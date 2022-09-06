import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction";
import { getSingleProduct } from "../redux/reducers/ProductReducer";

const ProductDetail = () => {
  const product = useSelector((state) => state.product.selectedItem);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getProductsDetail = () => {
    // dispatch(productAction.getProductsDetail(id));
    dispatch(getSingleProduct({ id }));
  };

  useEffect(() => {
    getProductsDetail();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="product-img">
          <img src={product?.img} alt="" />
        </Col>
        <Col>
          <div>{product?.title}</div>
          <div>{product?.price}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
