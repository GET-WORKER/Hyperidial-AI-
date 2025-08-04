import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { MdClose, MdSearch } from "react-icons/md";
import {
  setMode,
  setTicket,
  createTicket,
  updateTicket,
  removeTicket,
  setCustomer,
  fetchAllTickets,
} from "./tickets-slice";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";

const reasons = [
  "Motor Not Running",
  "Low Water discharge",
  "External System Damage",
  "Theft",
  "Natural Calamities",
  "Others",
];
const statusReason = [
  "Ticket Created",
  "Investigation Done",
  "Issue Fixed",
  "Spare Requested",
  "Ticket Closed",
  "Escalated",
  "Pending Approval",
  "Closed",
  "Created",
];
function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, unregister, handleSubmit, setValue } = useForm();
  const {
    ticket,
    customer,
    mode,
    currentPage,
    isCustomerSelect,
    loading,
    error,
  } = useSelector((state) => state.ticket);

  const handleSave = (data) => {
    if (ticket?.id) {
      dispatch(
        showDialog({
          title: "ticket",
          message: "Update",
          onConfirm: () => {
            dispatch(updateTicket(data)).then(() => {
              dispatch(
                fetchAllTickets({ page: currentPage, size: 10, filter: null })
              );
              dispatch(setMode(null));
              dispatch(setCustomer({ data: ticket?.customer, state: false }));
            });
          },
          onCancel: () => {},
        })
      );
    }
    if (!ticket.id && mode === "create") {
      dispatch(
        showDialog({
          title: "ticket",
          message: "Create",
          onConfirm: () => {
            dispatch(createTicket(data)).then(() => {
              dispatch(
                fetchAllTickets({ page: currentPage, size: 10, filter: null })
              );
              dispatch(setMode(null));
              dispatch(setCustomer({ data: {}, state: false }));
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
    dispatch(setCustomer({ data: {}, state: false }));
  };
  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "ticket",
        message: "Delete",
        onConfirm: () => {
          dispatch(removeTicket(id));
          dispatch(setMode(null));
        },
        onCancel: () => {},
      })
    );
  };
  const handleEdit = () => {
    dispatch(setMode("edit"));
    dispatch(setCustomer({ data: ticket?.customer, state: true }));
  };
  const handleCustomerselect = () => {
    navigate("/customers");
    dispatch(setCustomer({ state: true }));
  };

  useEffect(() => {
    if (ticket) {
      setValue("customer_id", ticket?.customer?.id);
      setValue("classification", ticket?.classification);
      setValue("priority", ticket?.priority);
      setValue("reported_issue", ticket?.reported_issue);
      setValue("status", ticket?.status);

      unregister("farmer_name");
    }
  }, [ticket, setValue]);

  return (
    <>
      <Form className={`text-start border p-3 me-2 `}>
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
                required
                disabled={!isCustomerSelect || mode === "view"}
                className={`rounded-0 ${
                  mode === "view" && "shadow-none border"
                }`}
                name="farmer_name"
                defaultValue={ticket?.customer?.farmer_name}
                readOnly={isCustomerSelect || mode === "view"}
              />
              <Button
                onClick={handleCustomerselect}
                disabled={!isCustomerSelect && mode === "view"}
              >
                <MdSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Reported Issue</Form.Label>
              <Form.Select
                required
                disabled={!isCustomerSelect || mode === "view"}
                {...register("classification")}
                className="shadow-none border-0 rounded-0 border-bottom cursor-pointer"
              >
                {reasons.map((reason, i) => (
                  <option key={i + 1} value={reason}>
                    {reason}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide primary contact
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="g-3 align-items-end my-1">
          <Col>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                required
                disabled={!isCustomerSelect || mode === "view"}
                {...register("status")}
                className="shadow-none border-0 rounded-0 border-bottom cursor-pointer"
              >
                {statusReason.map((reason, i) => (
                  <option key={i + 1} value={reason}>
                    {reason}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide primary contact
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                {...register("reported_issue")}
                className="shadow-none border-0 rounded-0 border-bottom cursor-pointer"
              />
            </Form.Group>
          </Col>
        </Form.Group>
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
                onClick={() => handleDelete(ticket?.id)}
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
