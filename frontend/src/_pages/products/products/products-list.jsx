import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setProduct } from "./products-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";

function ListView() {
  const dispatch = useDispatch();
  const { products, product, currentPage, totalPages, loading, error, mode } =
    useSelector((state) => state.product);

  const handleSelect = (_product) => {
    dispatch(setProduct(_product));
    dispatch(setMode("view"));
  };

  useEffect(() => {
    dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
    console.log(products, product, "products");
  }, []);

  const onPageChange = (page) => {
    dispatch(fetchAll({ page, size: 10, filter: null }));
  };

  return (
    <>
      <Col
        className="d-flex flex-column  justify-content-between"
        lg={7}
        xl={mode !== null ? 8 : 12}
      >
        <ListGroup className="rounded-0">
          <ListGroupItem>
            <Row className="py-1 text-dark fw-semibold text-uppercase">
              <Col>product model</Col>
              <Col>product make</Col>
              <Col>product category</Col>
            </Row>
          </ListGroupItem>
          {products.length ? (
            <>
              {products?.map((row, index) => (
                <ListGroupItem
                  active={row.id === product?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.model}</Col>
                    <Col>{row.make}</Col>
                    <Col>{row.category}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            </>
          ) : (
            <ListGroupItem className="text-center py-5">
              No data to display
            </ListGroupItem>
          )}
        </ListGroup>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Col>
    </>
  );
}
export default ListView;
