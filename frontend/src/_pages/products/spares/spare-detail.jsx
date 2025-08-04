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
  setSpare,
  remove,
  create,
} from "./spares-slice";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";

function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { spare, mode, currentPage } = useSelector((state) => state.spare);

  const handleSave = (data) => {
    if (spare?.id) {
      dispatch(
        showDialog({
          title: "spare",
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
    if (!spare.id && mode === "create") {
      dispatch(
        showDialog({
          title: "spare",
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
    dispatch(setCustomer({ data: spare?.customer, state: true }));
  };

  const handleCancel = () => {
    dispatch(setMode(null));
  };

  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "spare",
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
    if (spare) {
      setValue("service_center_id", spare.service_center_id);
      setValue("product_id", spare.product_id);
      setValue("sr_no", spare.sr_no);
    }
  }, [spare, setValue]);

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
            <Form.Label>Service Center Id:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="code"
              {...register("service_center_id")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Product Id:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("product_id")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Serial Number:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              {...register("sr_no")}
              readOnly={mode === "view"}
            />
          </Col>
        </Form.Group>
        {/* <Card>
            <Button onClick={handleSpareSelect}>select spare</Button>
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
                onClick={() => handleDelete(spare?.id)}
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
