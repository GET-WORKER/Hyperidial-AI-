import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
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
  setSpare,
  create,
  updateSpareRequest,
  remove,
  setCustomer,
  fetchSpareRequests,
} from "./spare-request-slice";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";
function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, unregister, handleSubmit, setValue } = useForm();
  const {
    spare_request,
    customer,
    mode,
    currentPage,
    isRequestSelect,
    loading,
    error,
  } = useSelector((state) => state.spare_request);

  const handleSave = (data) => {
    if (spare_request?.id) {
      dispatch(
        showDialog({
          title: "spare request",
          message: "Update",
          onConfirm: () => {
            dispatch(updateSpareRequest(data)).then(() => {
              dispatch(
                fetchSpareRequests({
                  page: currentPage,
                  size: 10,
                  filter: null,
                })
              );
              dispatch(setMode(null));
              dispatch(
                setCustomer({ data: spare_request?.customer, state: false })
              );
            });
          },
          onCancel: () => {},
        })
      );
    }

    console.log(data);
  };
  const handleCancel = () => {
    dispatch(setMode(null));
    dispatch(setCustomer({ data: null, state: false }));
  };
  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "spare request",
        message: "Delete",
        onConfirm: () => {
          dispatch(remove(id));
          dispatch(setMode(null));
        },
        onCancel: () => {},
      })
    );
  };
  const handleEdit = () => {
    dispatch(setMode("edit"));
    dispatch(
      setCustomer({ data: spare_request?.ticket?.customer, state: true })
    );
  };
  const handleCustomerselect = () => {
    navigate("/customers");
    dispatch(setCustomer({ state: true }));
  };

  return (
    <>
      <Form
        as={Col}
        className={`text-start card p-3 ${
          mode !== null ? "d-block fs-6" : "d-none"
        } `}
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
            <Button
              variant="light"
              className="border"
              onClick={handleCancel}
              size="sm"
            >
              <MdClose className="fs-4" />
            </Button>
          </Col>
        </Row>
        <Form.Group as={Row} className="g-3 align-items-end">
          <Col xs={12}>
            <Form.Label>Farmer / Customer</Form.Label>
            <InputGroup>
              <Form.Control
                disabled
                className={`rounded-0 ${
                  mode === "view" && "shadow-none border"
                }`}
                defaultValue={customer?.farmer_name}
                readOnly={isRequestSelect || mode === "view"}
              />
              {/*   <Button
                onClick={handleCustomerselect}
                disabled={!isRequestSelect && mode === "view"}
              >
                <MdSearch />
              </Button> */}
            </InputGroup>
          </Col>
        </Form.Group>
        <Row className="my-2 row-cols-2 mx-0">
          <Row className="row-cols-1 g-1 m-0 text-uppercase fw-medium">
            {customer?.pump_type && <Col>pump_type</Col>}
            {customer?.controller_sr_no && <Col>controller_sr_no</Col>}
            {customer?.pump_capacity && <Col>pump_capacity</Col>}
            {customer?.panel_make && <Col>panel_make</Col>}
            {customer?.panel_model && <Col>panel_model</Col>}
          </Row>
          <Row className="row-cols-1 g-1 m-0 text-primary fw-semibold">
            {customer?.pump_type && <Col>{customer?.pump_type}</Col>}
            {customer?.controller_sr_no && (
              <Col>{customer?.controller_sr_no}</Col>
            )}
            {customer?.pump_capacity && <Col>{customer?.pump_capacity}</Col>}
            {customer?.panel_make && <Col>{customer?.panel_make}</Col>}
            {customer?.panel_model && <Col>{customer?.panel_model}</Col>}
          </Row>
        </Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              {...register("status")}
              readOnly={isRequestSelect || mode === "view"}
              disabled={!isRequestSelect && mode === "view"}
              className="shadow-none border-0 px-3 py-2 rounded-0 border-bottom cursor-pointer"
            >
              <option value={"Pending"}>
                Pending
              </option>
              <option value={"Approved"}>
                Approved
              </option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please provide the spare_request priority.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
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
                onClick={() => handleDelete(spare_request?.id)}
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
