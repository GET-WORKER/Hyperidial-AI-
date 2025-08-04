import { Card, CardBody, Col, Row } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";

const statusTimelineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Tickets Status Over Time",
      data: [5, 10, 8, 6, 12, 9],
      fill: false,
      backgroundColor: "#17a2b8",
      borderColor: "#17a2b8",
    },
  ],
};

const technicianPerformanceData = {
  labels: ["Technician A", "Technician B", "Technician C"],
  datasets: [
    {
      label: "Tickets Resolved",
      data: [10, 15, 8],
      backgroundColor: ["#28a745", "#ffc107", "#17a2b8"],
    },
  ],
};

function LineChartRow() {
  return (
    <Row className="mt-4">
      {/* Technician Performance */}
      <Col md={6}>
        <Card>
          <Card.Header>Technician Performance</Card.Header>
          <CardBody>
            <Bar data={technicianPerformanceData} />
          </CardBody>
        </Card>
      </Col>

      {/* Status Timeline */}
      <Col md={6}>
        <Card>
          <Card.Header>Status Timeline</Card.Header>
          <CardBody>
            <Line data={statusTimelineData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default LineChartRow;
