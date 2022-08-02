import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction"; // 객체로 반환한 것은 {객체명}으로

const ProductAll = () => {
  // const [productList, setProductList] = useState([]);
  const productList = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();

  const getProducts = () => {
    let searchQuery = query.get("q") || "";
    console.log("쿼리값은?", searchQuery);
    dispatch(productAction.getProducts(searchQuery));
  };

  useEffect(() => {
    // api호출은 useEffect로
    getProducts();
  }, [query]);

  return (
    <div>
      <Container>
        <Row>
          {productList &&
            productList.map((item) => (
              <Col lg={3}>
                <ProductCard item={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
