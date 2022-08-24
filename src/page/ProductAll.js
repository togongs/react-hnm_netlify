import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction"; // 객체로 반환한 것은 {객체명}으로
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ProductAll = () => {
  // const [productList, setProductList] = useState([]);
  const productList = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();
  const [sorted, setSortedArr] = useState(false);
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

  const selectItem = (eventKey) => {
    console.log("eventKey", typeof eventKey);

    if (eventKey == 1) {
      // 가나다순
      let list = [...productList];
      list.sort((a, b) => (a.title < b.title ? -1 : 1));
      setSortedArr(list);
      // 낮은 가격순
    } else if (eventKey == 2) {
      let list = [...productList];
      list.sort((a, b) => a.price - b.price);
      setSortedArr(list);
      // 높은 가격순
    } else {
      let list = [...productList];
      list.sort((a, b) => b.price - a.price);
      setSortedArr(list);
    }
  };

  return (
    <div>
      {console.log("productList", productList)}
      <Container>
        <Row>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              key={"Secondary"}
              variant={"Secondary".toLowerCase()}
              title={"전체"}
              onSelect={selectItem}
            >
              <Dropdown.Item eventKey="1" active>
                가나다순
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">낮은 가격순</Dropdown.Item>
              <Dropdown.Item eventKey="3">높은 가격순</Dropdown.Item>
            </DropdownButton>
          </Col>
          {/* <Col>
            <DropdownButton
              as={ButtonGroup}
              key={"Secondary"}
              variant={"Secondary".toLowerCase()}
              title={"전체"}
            >
              <Dropdown.Item eventKey="1" active>
                Action
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Active Item</Dropdown.Item>
            </DropdownButton>
          </Col> */}
        </Row>
        <Row>
          {sorted
            ? sorted.map((item) => (
                <Col lg={3}>
                  <ProductCard item={item} />
                </Col>
              ))
            : productList &&
              productList.map((item) => (
                <Col lg={3}>
                  <ProductCard item={item} />
                </Col>
              ))}
          {console.log("sorted", sorted)}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
