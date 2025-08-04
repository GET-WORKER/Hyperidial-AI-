import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { MdClose, MdSearch } from "react-icons/md";
import {
  setMode,
  setTeam,
  create,
  update,
  remove,
  setProject,
  setUser,
} from "./teams-slice";
import { useNavigate } from "react-router-dom";

function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const {
    team,
    mode,
    loading,
    error,
    projects,
    users,
    isProjectSelect,
    isUserSelect,
  } = useSelector((state) => state.team);

  const handleSave = (data) => {
    if (mode === "edit") {
      dispatch(update(team.id, data)).then(() => {
        dispatch(setMode("view"));
      });
    } else {
      dispatch(create(data)).then(() => {
        dispatch(setMode("view"));
      });
    }
  };
  const handleCancel = () => {
    dispatch(setMode(null));
  };

  const handleDelete = (state) => {
    dispatch(setMode(state));
  };

  useEffect(() => {
    if (team) {
      setValue("id", team.id);
      setValue("name", team.name);
      setValue("users", team.users);
    }
  }, [team, setValue]);

  const handleProjectSelect = (nav) => {
    if (nav === "projects") {
      dispatch(setProject({ state: true }));
      navigate("/projects");
    } else {
      dispatch(setUser({ state: true }));
      navigate("/users");
    }
  };

  return (
    <>
      <Form
        as={Col}
        className={`text-start ${mode !== null ? "d-block fs-6" : "d-none"} `}
        lg={5}
        xl={4}
      >
        <Row className="d-flex justify-content-center  align-items-center py-1">
          <Col className=" fw-medium">
            {mode === "edit"
              ? "Edit Team"
              : mode === "create"
              ? "New Team"
              : "View"}
          </Col>
          <Col className="text-end pe-4">
            {mode === "view" && (
              <Button
                variant="light"
                className="border"
                onClick={handleCancel}
                size="sm"
              >
                <MdClose className="fs-4" />
              </Button>
            )}
          </Col>
        </Row>
        <Form.Group as={Row} className="my-3">
          <Col>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              disabled={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="code"
              {...register("code")}
              readOnly={mode === "view"}
            />
          </Col>
        </Form.Group>

        <Col xs={12}>
          <Form.Label>Projects:</Form.Label>
          <InputGroup>
            <Form.Control
              disabled={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="farmer_name"
              /*    defaultValue={ticket?.customer?.farmer_name} */
              /* readOnly={mode === "view"} */
            />
            <Button
              onClick={() => handleProjectSelect("projects")}
              disabled={!isProjectSelect && mode === "view"}
            >
              <MdSearch />
            </Button>
          </InputGroup>
          <ListGroup className="drop-menu-h border" variant="flush">
            {projects?.map((item, i) => (
              <ListGroupItem>
                {item?.name}
                {i}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12}>
          <Form.Label>users:</Form.Label>
          <InputGroup>
            <Form.Control
              disabled={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="farmer_name"
              /*    defaultValue={ticket?.customer?.farmer_name} */
              /* readOnly={mode === "view"} */
            />
            <Button
              onClick={() => handleProjectSelect("users")}
              disabled={!isProjectSelect && mode === "view"}
            >
              <MdSearch />
            </Button>
          </InputGroup>
          <ListGroup className="drop-menu-h border" variant="flush">
            {users?.map((item, i) => (
              <ListGroupItem>
                {item?.name}
                {i}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {/*  <Form.Group className="mb-3">
          <Form.Label>Members:</Form.Label>
          <Form.Control
            disabled={mode === "view"}
            className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
            name="members"
            readOnly={mode === "view"}
            {...register("members")}
            as="textarea"
          />
        </Form.Group> */}
        <ButtonGroup>
          {mode === "edit" || mode === "create" ? (
            <>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit(handleSave)}
              >
                Save
              </Button>
              <Button
                className={`${mode === "create" ? "d-none" : "d-block"}`}
                variant="info"
                onClick={() => handleDelete("delete")}
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              {mode === "view" && (
                <Button
                  variant="secondary"
                  onClick={() => dispatch(setMode("edit"))}
                >
                  Edit
                </Button>
              )}
            </>
          )}
        </ButtonGroup>
      </Form>
    </>
  );
}

export default EditForm;
