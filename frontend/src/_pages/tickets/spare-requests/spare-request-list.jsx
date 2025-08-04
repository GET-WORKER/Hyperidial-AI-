import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchSpareRequests,
  setCustomer,
  setMode,
  setSpare,
} from "./spare-request-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";
function ListView() {
  const dispatch = useDispatch();
  const {
    spare_requests,
    spare_request,
    currentPage,
    totalPages,
    isRequestSelect,
    loading,
    error,
    mode,
  } = useSelector((state) => state.spare_request);

  const handleSelect = (_spare_request) => {
    if (!isRequestSelect) {
      dispatch(setSpare(_spare_request));
      dispatch(setMode("view"));
      dispatch(
        setCustomer({ data: _spare_request?.ticket?.customer, state: false })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchSpareRequests({ page: currentPage, size: 10, filter: null }));
    console.log(spare_requests, spare_request, "spare_requests");
  }, []);

  const onPageChange = (page) => {
    dispatch(fetchSpareRequests({ page, size: 10, filter: null }));
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
              <Col>Ticket_id</Col>
              <Col>request_item</Col>
              <Col>description</Col>
              <Col>status</Col>
            </Row>
          </ListGroupItem>
          {spare_requests?.length ? (
            <>
              {spare_requests?.map((row, index) => (
                <ListGroupItem
                  active={row.id === spare_request?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.ticket_id}</Col>
                    <Col>{row?.request_item}</Col>
                    <Col>{row?.description}</Col>
                    <Col>{row?.status}</Col>
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
