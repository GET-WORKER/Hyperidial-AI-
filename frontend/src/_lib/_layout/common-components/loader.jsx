import { Col, Spinner } from "react-bootstrap";

export const Loader = () => (
  <Col className="d-flex align-items-center justify-content-center">
    <Spinner animation="border" />
  </Col>
);
