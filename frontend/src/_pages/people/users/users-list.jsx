import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setUser } from "./users-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";
import { setUser as selectUser } from "../../projects/teams/teams-slice";
import { useNavigate } from "react-router-dom";
function ListView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, user, currentPage, totalPages, loading, error, mode } =
    useSelector((state) => state.user);
  const { isUserSelect } = useSelector((state) => state.team);
  const handleSelect = (_user) => {
    dispatch(setUser(_user));
    dispatch(setMode("view"));
    if (isUserSelect) {
      dispatch(selectUser({ data: _user, state: false }));
      navigate("/teams");
    }
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
              <Col>Name</Col>
              <Col lg={3}>Email</Col>
              <Col>Organization</Col>
              <Col>Phone</Col>
              <Col>Role</Col>
              <Col>Status</Col>
            </Row>
          </ListGroupItem>
          {users?.length ? (
            <>
              {users?.map((row, index) => (
                <ListGroupItem
                  active={row.id === user?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.name}</Col>
                    <Col lg={3}>{row.email}</Col>
                    <Col>{row.organization}</Col>
                    <Col>{row.phone}</Col>
                    <Col>{row.role}</Col>
                    <Col>{row.status}</Col>
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
