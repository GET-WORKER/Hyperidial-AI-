import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setCenter } from "./service-center-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";

function ListView() {
  const dispatch = useDispatch();
  const {
    service_centers,
    service_center,
    currentPage,
    totalPages,
    loading,
    error,
    mode,
  } = useSelector((state) => state.service);

  const handleSelect = (_service_center) => {
    dispatch(setCenter(_service_center));
    dispatch(setMode("view"));
  };

  useEffect(() => {
    dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
    console.log(service_centers, service_center, "service_centers");
  }, [dispatch]);

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
            <Row className="py-1 text-dark fw-semibold">
              <Col>Code</Col>
              <Col>Name</Col>
              <Col>Address</Col>
              <Col>Districts</Col>
            </Row>
          </ListGroupItem>
          {service_centers?.length ? (
            <>
              {service_centers?.map((row, index) => (
                <ListGroupItem
                  action
                  variant="light"
                  active={row.id === service_center?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.org_code}</Col>
                    <Col>{row.name}</Col>
                    <Col>{row.address}</Col>
                    <Col>{row.district}</Col>
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
