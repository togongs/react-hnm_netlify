import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction"; // 객체로 반환한 것은 {객체명}으로
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton, Button } from "react-bootstrap";
import { getAllProducts, LoadMore } from "../redux/reducers/ProductReducer";

const ProductAll = () => {
  // const [productList, setProductList] = useState([]);
  const { productList, isLast, loading, error } = useSelector(
    (state) => state.product
  );
  const [query, setQuery] = useSearchParams(); // url 쿼리값 읽어오기
  const [sorted, setSortedArr] = useState(false);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1); // 더보기
  let cnt = 4; // 첫페이지 아이템 리스트

  // 서치바2
  // const getProducts = () => {
  //   let searchQuery = query.get("q") || "";
  //   console.log("쿼리값은?", searchQuery);
  //   dispatch(productAction.getProducts(searchQuery, page, cnt));
  //   // dispatch -> action미들웨어 -> reducer
  // };
  useEffect(() => {
    let searchQuery = query.get("q") || "";
    console.log("쿼리값은?", searchQuery);
    dispatch(getAllProducts({ searchQuery, page, cnt }));
  }, [query]);

  // 더보기
  const loadMore = () => {
    console.log("haha");
    const p = page + 1;
    setPage(p);
    // dispatch(productAction.loadMore(p, cnt));
    dispatch(LoadMore({ p, cnt }));
  };

  // useEffect(() => {
  //   // api호출 useEffect
  //   getProducts();
  // }, [query]);

  // Sorted Item
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

  // pending 상태일때
  if (loading) {
    return <div>로딩 중....</div>;
  }

  // error message
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col className="sort-btn">
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
            ? // 분류된 item이 있다면
              sorted.map((item) => (
                <Col lg={3}>
                  <ProductCard item={item} />
                </Col>
              ))
            : // 분류된 item이 없다면
              productList &&
              productList.map((item) => (
                <Col lg={3}>
                  <ProductCard item={item} />
                </Col>
              ))}
        </Row>
        <Row>
          <Col className="loadmore-btn">
            {console.log("isLast", isLast)}
            {!isLast && (
              // item이 마지막이라면
              <Button onClick={loadMore} variant="secondary">
                Load More
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
