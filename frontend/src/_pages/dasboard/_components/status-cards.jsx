import { Card, CardBody, CardText, CardTitle, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function StatusCards() {
  const kpiData = {
    ticketsResolvedToday: 15,
    avgResolutionTime: "3h 24m",
    customerSatisfaction: 4.5,
    firstResponseTime: "45m",
    slaComplianceRate: 92,
    openTickets: 23,
    pendingApprovals: 5,
    escalatedTickets: 3,
  };

  const { dashboard } = useSelector((state) => state.dashboard);

  return (
    <Row className="mt-4 ">
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Tickets Resolved </CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-success">
              {dashboard?.ticketsResolvedToday?.ticketsResolvedToday
                ? `${dashboard?.ticketsResolvedToday?.ticketsResolvedToday}`
                : "N/A"}
            </CardText>
            <CardText>Today</CardText>
          </CardBody>
        </Card>
      </Col>
      {/* Average Resolution Time */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Avg Resolution</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-success">
              {dashboard?.avgResolutionTime?.avgResolutionTime
                ? `${dashboard?.avgResolutionTime?.avgResolutionTime}`
                : "N/A"}
            </CardText>
            <CardText>Time</CardText>
          </CardBody>
        </Card>
      </Col>

      {/* Customer Satisfaction */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Satisfaction</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-success">
              {kpiData.customerSatisfaction} / 5
            </CardText>
            <CardText>Customer Rating</CardText>
          </CardBody>
        </Card>
      </Col>

      {/* First Response Time */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Response Time</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-success">
              {kpiData.firstResponseTime}
            </CardText>
            <CardText>First Response Time</CardText>
          </CardBody>
        </Card>
      </Col>

      {/* SLA Compliance Rate */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">SLA Compliance</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-success">
              {kpiData.slaComplianceRate}%
            </CardText>
            <CardText>Compliance Rate</CardText>
          </CardBody>
        </Card>
      </Col>

      {/* Open Tickets */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Open Tickets</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-danger">
              {dashboard?.openTickets?.openTickets
                ? `${dashboard?.openTickets?.openTickets}`
                : "N/A"}
            </CardText>
            <CardText>Tickets</CardText>
          </CardBody>
        </Card>
      </Col>

      {/* Pending Approvals */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Pending</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-warning">
              {dashboard?.pendingApprovalsDetails?.length
                ? `${dashboard?.pendingApprovalsDetails?.length}`
                : "N/A"}
            </CardText>
            <CardText>Approvals</CardText>
          </CardBody>
        </Card>
      </Col>

      {/* Escalated Tickets */}
      <Col>
        <Card className="text-center h-100">
          <CardBody className="d-flex flex-column justify-content-between">
            <CardTitle className="text-uppercase">Escalated Tickets</CardTitle>
            <CardText className="fs-3 fw-semibold m-0 text-danger">
              {dashboard?.escalatedTickets?.escalatedTickets?.count
                ? `${dashboard?.escalatedTickets?.escalatedTickets?.count}`
                : "N/A"}{" "}
            </CardText>
            <CardText>Tickets</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default StatusCards;
