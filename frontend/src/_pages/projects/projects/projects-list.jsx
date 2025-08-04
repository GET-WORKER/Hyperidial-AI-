import { Component, useEffect } from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAll, setMode, setProject } from "./projects-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";
import { useNavigate } from "react-router-dom";
import { setProject as selectProject } from "../../projects/teams/teams-slice";

function ListView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, project, currentPage, totalPages, loading, error, mode } =
    useSelector((state) => state.project);
  const { isProjectSelect } = useSelector((state) => state.team);
  const handleSelect = (_project) => {
    dispatch(setProject(_project));
    dispatch(setMode("view"));
    if (isProjectSelect) {
      dispatch(selectProject({ data: _project, state: false }));
      navigate("/teams");
    }
  };


  useEffect(() => {
    dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
    console.log(projects, project, "projects");
  }, []);

  const onPageChange = (page) => {
    dispatch(fetchAll({ page, size: 10, filter: null }));
  };

  // handle loading states
  if (loading) {
    return (
      <Col className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Col>
    );
  }

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
              <Col>project Code</Col>
              <Col>project Name</Col>
            </Row>
          </ListGroupItem>
          {projects.length ? (
            <>
              {projects?.map((row, index) => (
                <ListGroupItem
                  active={row.id === project?.id}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <Row>
                    <Col>{row.code}</Col>
                    <Col>{row.name}</Col>
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
