import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setOrganization } from "./organizations-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";

function ListView() {
  const dispatch = useDispatch();
  const {
    organizations,
    organization,
    currentPage,
    totalPages,
    loading,
    error,
    mode,
  } = useSelector((state) => state.organization);

  const handleSelect = (_organization) => {
    dispatch(setOrganization(_organization));
    dispatch(setMode("view"));
  };

  useEffect(() => {
    dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
  }, []);

  const onPageChange = (page) => {
    dispatch(fetchAll({ page, size: 10, filter: null }));
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
              <Col>primary no</Col>
              <Col lg={3}>farmer name</Col>
              <Col>project code</Col>
              <Col>mobile number</Col>
              <Col>district</Col>
              <Col>tehsil</Col>
              <Col lg={2}>address</Col>
            </Row>
          </ListGroupItem>
          {organizations.length ? (
            <>
              {organizations?.map((row, index) => (
                <ListGroupItem
                  active={row.id === organization?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.primary_no}</Col>
                    <Col lg={3}>{row.farmer_name}</Col>
                    <Col>{row.project_code}</Col>
                    <Col>{row.mobile_number}</Col>
                    <Col>{row.district}</Col>
                    <Col>{row.tehsil}</Col>
                    <Col lg={2}>{row.address}</Col>
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
