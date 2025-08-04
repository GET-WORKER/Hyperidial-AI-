import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardGroup,
  CardText,
  CardTitle,
  Col,
  Figure,
  FigureCaption,
  FigureImage,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchClosureAttachmentsById } from "./tickets-slice";

function TicketAttachments() {
  const dispatch = useDispatch();
  const { tickets, ticket, closure_attachments } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    console.log(closure_attachments, "closure_attachments");
  }, []);
  return (
    <Col className="row row-cols-2 m-0 contact-list">
      {/*  <ListGroup>
        <ListGroupItem>
          <Row className="fw-semibold">
            <Col>
              File <title></title>
            </Col>
            <Col>File name</Col>
            <Col>File URL</Col>
            <Col>File type</Col>
            <Col>Created By</Col>
            <Col>Created At</Col>
            <Col></Col>
          </Row>
        </ListGroupItem>
        {closure_attachments.map((attachment, i) => (
          <ListGroupItem key={i + "index"} className="mb-3">
            <Row>
              <Col> {attachment?.title}</Col>
              <Col> {attachment?.file_name}</Col>
              <Col>{attachment?.file_url}</Col>
              <Col> {attachment?.attachment_type}</Col>
              <Col>{attachment?.created_by}</Col>
              <Col>{attachment?.created_at}</Col>
              <Col>download</Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup> */}
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <Figure key={index}>
            <FigureImage
              width={"100%"}
              height={180}
              alt="171x180"
              src="https://carbondesignsystem.com/static/aa0a421fa893262bc6c0d9b45a66a040/0b124/1_Empty_state_annotation_fullpage_website_image_1120.png"
            />
            <FigureCaption className="text-center">
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </FigureCaption>
          </Figure>
        ))}
    </Col>
  );
}
export default TicketAttachments;
