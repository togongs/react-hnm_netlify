import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getProducts = () => {
    let searchQuery = query.get("q") || "";
    console.log("쿼리값은?", searchQuery);
    axios(
      `https://my-json-server.typicode.com/togongs/hnm-web/products?q=${searchQuery}`,
      {
        method: "get",
      }
    ).then((res) => {
      const data = res.data;
      console.log(data);
      setProductList(data);
    });
  };

  useEffect(() => {
    // api호출은 useEffect로
    getProducts();
  }, [query]);

  return (
    <div>
      <Container>
        <Row>
          {productList.map((item) => (
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
