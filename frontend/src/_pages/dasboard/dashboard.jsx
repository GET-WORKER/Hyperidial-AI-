import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Table,
  Badge,
} from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import "chart.js/auto";
import "../../Dashboard.css";
import StatusCards from "./_components/status-cards";
import PieChartRow from "./_components/pie-chart-row";
import LineChartRow from "./_components/line-chart-row";
import BarChartRow from "./_components/bar-chart-row";
import { fetchAll } from "./dashboard-slice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboard } = useSelector((state) => state.dashboard);
  // Mock data for lists and tables
  const slaComplianceList = [
    { id: 1, description: "SLA met for Ticket A" },
    { id: 2, description: "SLA breached for Ticket B" },
    { id: 3, description: "SLA met for Ticket C" },
  ];

  const notificationsList = [
    { id: 1, description: "New ticket created by User A" },
    { id: 2, description: "Spare part delivered for Ticket B" },
    { id: 3, description: "Technician C completed repair for Ticket C" },
  ];

  const recentTickets = [
    { id: 1, title: "Issue with Motor A", status: "Open" },
    { id: 2, title: "Sensor Malfunction", status: "Investigating" },
    { id: 3, title: "Relay Replacement Needed", status: "Pending Spare" },
  ];

  const recentActivities = [
    { id: 1, activity: "Technician B fixed Issue with Motor A" },
    { id: 2, activity: "Spare part requested for Sensor Malfunction" },
    { id: 3, activity: "Relay replacement approved" },
  ];

  const topTechnicians = [
    { id: 1, name: "Technician A", ticketsResolved: 15 },
    { id: 2, name: "Technician B", ticketsResolved: 10 },
    { id: 3, name: "Technician C", ticketsResolved: 8 },
  ];

  const pendingApprovals = [
    { id: 1, description: "Spare part approval for Sensor Malfunction" },
    { id: 2, description: "Approval for Relay Replacement" },
  ];

  const slaComplianceDetails = [
    { id: 1, ticket: "Ticket A", sla: "Met", resolutionTime: "3 days" },
    { id: 2, ticket: "Ticket B", sla: "Breached", resolutionTime: "8 days" },
    { id: 3, ticket: "Ticket C", sla: "Met", resolutionTime: "2 days" },
  ];

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  return (
    <Container fluid className="mt-4 pb-5">
      <StatusCards />

      <PieChartRow />

      <BarChartRow />

      <LineChartRow />

      <Row className="mt-4">
        {/* SLA Compliance */}
        <Col md={6}>
          <Card>
            <Card.Header>SLA Compliance</Card.Header>
            <ListGroup variant="flush">
              {slaComplianceList.map((sla) => (
                <ListGroup.Item key={sla.id}>{sla.description}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Notifications & Alerts */}
        <Col md={6}>
          <Card>
            <Card.Header>Notifications & Alerts</Card.Header>
            <ListGroup variant="flush">
              {notificationsList.map((notification) => (
                <ListGroup.Item key={notification.id}>
                  {notification.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* SLA Compliance Details */}
        <Col md={12}>
          <Card>
            <Card.Header>SLA Compliance Details</Card.Header>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>SLA Status</th>
                  <th>Resolution Time</th>
                </tr>
              </thead>
              <tbody>
                {slaComplianceDetails.map((detail) => (
                  <tr key={detail.id}>
                    <td>{detail.ticket}</td>
                    <td>{detail.sla}</td>
                    <td>{detail.resolutionTime}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Recent Tickets */}
        <Col md={6}>
          <Card>
            <Card.Header>Recent Tickets</Card.Header>
            <ListGroup variant="flush">
              {dashboard?.recentTickets.map((ticket) => (
                <ListGroup.Item key={ticket.id} className="text-capitalize">
                  {ticket.reported_issue}{" "}
                  <Badge variant="primary">{ticket.status}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col md={6}>
          <Card>
            <Card.Header>Recent Activity</Card.Header>
            <ListGroup variant="flush">
              {recentActivities.map((activity) => (
                <ListGroup.Item key={activity.id}>
                  {activity.activity}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Top Technicians */}
        <Col md={6}>
          <Card>
            <Card.Header>Top Technicians</Card.Header>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tickets Resolved</th>
                </tr>
              </thead>
              <tbody>
                {topTechnicians.map((technician) => (
                  <tr key={technician.id}>
                    <td>{technician.name}</td>
                    <td>{technician.ticketsResolved}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* Pending Approvals */}
        <Col md={6}>
          <Card>
            <Card.Header>Pending Approvals</Card.Header>
            <ListGroup variant="flush">
              {dashboard?.pendingApprovalsDetails?.map((approval, i) => (
                <ListGroup.Item
                  key={i + "index"}
                  className="d-flex gap-2 align-items-center"
                >
                  <Badge>Ticket ID {approval.ticket_id}</Badge>
                  <p className="text-capitalize m-0">{approval.description}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
