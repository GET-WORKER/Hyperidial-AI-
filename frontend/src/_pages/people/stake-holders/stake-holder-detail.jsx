import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { setMode, setStakeHolder } from "./stake-holders-slice";

function EditForm() {
  const dispatch = useDispatch();
  const { stake_holder, mode, loading, error } = useSelector(
    (state) => state.stake_holder
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
              <Col>{stake_holder?.primary_no}</Col>
              <Col>Farmer name</Col>
              <Col>{stake_holder?.farmer_name}</Col>
              <Col>Project code</Col>
              <Col>{stake_holder?.project_code}</Col>
              <Col>Mobile number</Col>
              <Col>{stake_holder?.mobile_number}</Col>
              <Col>District</Col>
              <Col>{stake_holder?.district}</Col>
              <Col>Tehsil</Col>
              <Col>{stake_holder?.tehsil}</Col>
              <Col>Address</Col>
              <Col>{stake_holder?.address}</Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </>
  );
}

export default EditForm;
