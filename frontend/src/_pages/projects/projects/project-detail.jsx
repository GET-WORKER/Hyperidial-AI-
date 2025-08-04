import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  setMode,
  update,
  fetchAll,
  setProject,
  remove,
  create,
} from "./projects-slice";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";

function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { project, mode, currentPage } = useSelector((state) => state.project);

  const handleSave = (data) => {
    if (project?.id) {
      dispatch(
        showDialog({
          title: "project",
          message: "Update",
          onConfirm: () => {
            dispatch(update(data)).then(() => {
              dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
              dispatch(setMode(null));
            });
          },
          onCancel: () => {},
        })
      );
    }
    if (!project.id && mode === "create") {
      dispatch(
        showDialog({
          title: "project",
          message: "Create",
          onConfirm: () => {
            dispatch(create(data)).then(() => {
              dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
              dispatch(setMode(null));
            });
          },
          onCancel: () => {},
        })
      );
    }
    console.log(data);
  };

  const handleEdit = () => {
    dispatch(setMode("edit"));
    dispatch(setCustomer({ data: project?.customer, state: true }));
  };

  const handleCancel = () => {
    dispatch(setMode(null));
  };

  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "project",
        message: "Delete",
        onConfirm: () => {
          dispatch(remove(id)).then(() => {
            dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
            dispatch(setMode(null));
          });
        },
        onCancel: () => {},
      })
    );
  };

  useEffect(() => {
    if (project) {
      setValue("id", project.id);
      setValue("code", project.code);
      setValue("name", project.name);
      setValue("hrs_to_close", project.hrs_to_close);
      setValue("first_interaction_time", project.first_interaction_time);
      setValue("site_visit_within", project.site_visit_within);
      setValue("periodic_checkup_in_days", project.periodic_checkup_in_days);
      setValue("team_id", project.team_id);
    }
  }, [project, setValue]);

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
              ? "Edit Form"
              : mode === "create"
              ? "New Form"
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
          <Col md={6}>
            <Form.Label>Project Code:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="code"
              {...register("code")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("name")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Hours to Close:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("hrs_to_close")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>First Interaction Time(In Hrs):</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("first_interaction_time")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Site Visit(Physical Visit)Within(In Hrs):</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("site_visit_within")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Periodic Checkup(In Days):</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("periodic_checkup_in_days")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Project Team:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("team_id")}
              readOnly={mode === "view"}
            />
          </Col>
        </Form.Group>

        {/* <Card>
          <Button onClick={handleProjectSelect}>select project</Button>
        </Card> */}
        <ButtonGroup className="py-3">
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
                onClick={() => handleDelete(project?.id)}
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
                <Button onClick={() => handleEdit(true)}>Edit</Button>
              )}
            </>
          )}
        </ButtonGroup>
      </Form>
    </>
  );
}

export default EditForm;
