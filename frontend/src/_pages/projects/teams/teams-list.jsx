import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setTeam } from "./teams-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";

function ListView() {
  const dispatch = useDispatch();
  const {
    teams,
    team,
    setTeam,
    currentPage,
    totalPages,
    loading,
    error,
    mode,
  } = useSelector((state) => state.team);

  const handleSelect = (_team) => {
    dispatch(setTeam(_team));
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
        className="d-flex flex-column  justify-content-between"
        lg={7}
        xl={mode !== null ? 8 : 12}
      >
        <ListGroup className="rounded-0">
          <ListGroupItem>
            <Row className="py-1 text-dark fw-semibold">
              <Col>Name</Col>
              <Col>Projects</Col>
              <Col>Users</Col>
            </Row>
          </ListGroupItem>
          {teams.length ? (
            <>
              {teams?.map((row, index) => (
                <ListGroupItem
                  active={row.id === service_center?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.naem}</Col>
                    <Col>{row.projects}</Col>
                    <Col>{row.users}</Col>
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
