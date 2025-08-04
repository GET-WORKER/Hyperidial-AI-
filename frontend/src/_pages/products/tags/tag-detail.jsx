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
  setTag,
  remove,
  create,
} from "./tags-slice";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";

function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { tag, mode, currentPage } = useSelector((state) => state.tag);

  const handleSave = (data) => {
    if (tag?.id) {
      dispatch(
        showDialog({
          title: "tag",
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
    if (!tag.id && mode === "create") {
      dispatch(
        showDialog({
          title: "tag",
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
    dispatch(setCustomer({ data: tag?.customer, state: true }));
  };

  const handleCancel = () => {
    dispatch(setMode(null));
  };

  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "tag",
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
    if (tag) {
      setValue("name", tag.name);
    }
  }, [tag, setValue]);

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
        </Form.Group>
        {/* <Card>
            <Button onClick={handleTagSelect}>select tag</Button>
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
                onClick={() => handleDelete(tag?.id)}
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
