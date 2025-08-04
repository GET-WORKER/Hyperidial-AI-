import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { setMode } from "./customer-slice";
import { useNavigate } from "react-router-dom";

function EditForm() {
  const dispatch = useDispatch();

  const { customer, mode, loading, error } = useSelector(
    (state) => state.customer
  );

  const handleCancel = () => {
    dispatch(setMode(null));
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
          <Col className=" fw-medium"></Col>
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
        <Card>
          <CardBody>
            <Row className="row-cols-2 g-2">
              <Col>Primary number</Col>
              <Col>{customer?.primary_no}</Col>
              <Col>Farmer name</Col>
              <Col>{customer?.farmer_name}</Col>
              <Col>Project code</Col>
              <Col>{customer?.project_code}</Col>
              <Col>Mobile number</Col>
              <Col>{customer?.mobile_number}</Col>
              <Col>District</Col>
              <Col>{customer?.district}</Col>
              <Col>Tehsil</Col>
              <Col>{customer?.tehsil}</Col>
              <Col>Address</Col>
              <Col>{customer?.address}</Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </>
  );
}

export default EditForm;
