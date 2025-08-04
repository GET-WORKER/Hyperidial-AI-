import { Button, Card, CardBody, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { setMode, setOrganization } from "./organizations-slice";

function EditForm() {
  const dispatch = useDispatch();
  const { organization, mode, loading, error } = useSelector(
    (state) => state.organization
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
              <Col>{organization?.primary_no}</Col>
              <Col>Farmer name</Col>
              <Col>{organization?.farmer_name}</Col>
              <Col>Project code</Col>
              <Col>{organization?.project_code}</Col>
              <Col>Mobile number</Col>
              <Col>{organization?.mobile_number}</Col>
              <Col>District</Col>
              <Col>{organization?.district}</Col>
              <Col>Tehsil</Col>
              <Col>{organization?.tehsil}</Col>
              <Col>Address</Col>
              <Col>{organization?.address}</Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </>
  );
}

export default EditForm;
