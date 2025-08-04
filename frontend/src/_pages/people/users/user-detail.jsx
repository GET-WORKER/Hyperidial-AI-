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
  setUser,
  remove,
  create,
} from "./users-slice";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";

function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { user, mode, currentPage } = useSelector((state) => state.user);

  const handleSave = (data) => {
    if (user?.id) {
      dispatch(
        showDialog({
          title: "user",
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
    if (!user.id && mode === "create") {
      dispatch(
        showDialog({
          title: "user",
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
    dispatch(setCustomer({ data: user?.customer, state: true }));
  };

  const handleCancel = () => {
    dispatch(setMode(null));
  };

  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "user",
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
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("organisation_id", user.organisation_id);
      setValue("phone", user.phone);
      setValue("status", user.status);
      setValue("role", user.role);
    }
  }, [user, setValue]);

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
            <Form.Label>Name:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="code"
              {...register("name")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("email")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("password")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Organisation Id:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("organisation_id")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("phone")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Status:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("status")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Role:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("role")}
              readOnly={mode === "view"}
            />
          </Col>
        </Form.Group>
        {/* <Card>
          <Button onClick={handleUserSelect}>select user</Button>
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
                onClick={() => handleDelete(user?.id)}
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
