import { Button, Col, Row } from "react-bootstrap";
import { MdClose } from "react-icons/md";

export default function FormHeader({ handleCancel, formTitle }) {
  return (
    <Row className="d-flex justify-content-center  align-items-center py-1">
      <Col className=" fw-medium">{formTitle}</Col>
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
  );
}
