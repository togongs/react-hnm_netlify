import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const getProductsDetail = () => {
    axios(
      `https://my-json-server.typicode.com/togongs/hnm-web/products/${id}`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log(data);
      setProduct(data);
    });
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
