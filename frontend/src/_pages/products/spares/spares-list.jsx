import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setSpare } from "./spares-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";

function ListView() {
  const dispatch = useDispatch();
  const { spares, spare, currentPage, totalPages, loading, error, mode } =
    useSelector((state) => state.spare);

  const handleSelect = (_spare) => {
    dispatch(setSpare(_spare));
    dispatch(setMode("view"));
  };

  useEffect(() => {
    dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
  }, []);

  const onPageChange = (page) => {
    dispatch(fetchAll({ page: page, size: 10, filter: null }));
  };

  return (
    <>
      <Col
        className="d-flex flex-column justify-content-between"
        lg={mode !== null ? 7 : 12}
        xl={mode !== null ? 8 : 12}
      >
        <ListGroup className="rounded-0">
          <ListGroupItem>
            <Row className="py-1 text-dark fw-semibold text-uppercase fs-6">
              <Col>Service Center Id</Col>
              <Col>Product Id</Col>
              <Col>Serial Number</Col>
            </Row>
          </ListGroupItem>
          {spares?.length ? (
            <>
              {spares?.map((row, index) => (
                <ListGroupItem
                  active={row.id === spare?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.service_center_id}</Col>
                    <Col>{row.product_id}</Col>
                    <Col>{row.sr_no}</Col>
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
