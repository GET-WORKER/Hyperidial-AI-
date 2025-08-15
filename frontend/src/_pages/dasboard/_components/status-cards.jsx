import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
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

  const handleNavigateCurrentStatus = () => {
    window.location.href = "/current-status";
  };

  const handleNavigateRespondedClients = () => {
    window.location.href = "/responded-clients";
  };

  const handleNavigateUnRespondedClients = () => {
    window.location.href = "/un-responded-clients";
  };

  return (
    <Row className="mt-5">
      <Row>
        <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card className="text-center h-100" style={{ minHeight: "220px" }}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle className="text-uppercase">Current Status </CardTitle>
              <CardText className="fs-2 fw-semibold m-0 text-success">
                {dashboard?.ticketsResolvedToday?.ticketsResolvedToday
                  ? `${dashboard?.ticketsResolvedToday?.ticketsResolvedToday}`
                  : "N/A"}
              </CardText>
              <Button onClick={handleNavigateCurrentStatus}>Enter</Button>
            </CardBody>
          </Card>
        </Col>
        {/* Average Resolution Time */}
        <Col xs={8} sm={6} md={4} lg={4} className="mb-4">
          <Card className="text-center h-100" style={{ minHeight: "220px" }}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle className="text-uppercase">Reports</CardTitle>
              <CardText className="fs-2 fw-semibold m-0 text-success">
                {dashboard?.avgResolutionTime?.avgResolutionTime
                  ? `${dashboard?.avgResolutionTime?.avgResolutionTime}`
                  : "N/A"}
              </CardText>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Col>

        {/* Customer Satisfaction */}
        <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card className="text-center h-100" style={{ minHeight: "220px" }}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle className="text-uppercase">
                Responded Clients
              </CardTitle>
              <CardText className="fs-2 fw-semibold m-0 text-success">
                {kpiData.customerSatisfaction} / 5
              </CardText>
              <Button onClick={handleNavigateRespondedClients}>Enter</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* First Response Time */}
        <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card className="text-center h-100" style={{ minHeight: "220px" }}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle className="text-uppercase">Dash Board</CardTitle>
              <CardText className="fs-2 fw-semibold m-0 text-success">
                {kpiData.firstResponseTime}
              </CardText>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Col>

        {/* SLA Compliance Rate */}
        <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card className="text-center h-100" style={{ minHeight: "220px" }}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle className="text-uppercase">
                Un-Responded Clients &/ Bad Deffors
              </CardTitle>
              <CardText className="fs-2 fw-semibold m-0 text-success">
                {kpiData.slaComplianceRate}%
              </CardText>
              <Button onClick={handleNavigateUnRespondedClients}>Enter</Button>
            </CardBody>
          </Card>
        </Col>

        {/* Open Tickets */}
        <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card className="text-center h-100" style={{ minHeight: "220px" }}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle className="text-uppercase">Google Sheets</CardTitle>
              <CardText className="fs-2 fw-semibold m-0 text-danger">
                {dashboard?.openTickets?.openTickets
                  ? `${dashboard?.openTickets?.openTickets}`
                  : "N/A"}
              </CardText>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}
export default StatusCards;
