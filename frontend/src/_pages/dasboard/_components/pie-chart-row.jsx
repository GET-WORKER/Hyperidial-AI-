import { Card, CardBody, Col, Row } from "react-bootstrap";
import { Pie, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const workloadDistributionData = {
  labels: ["Technician A", "Technician B", "Technician C"],
  datasets: [
    {
      label: "Assigned Workload",
      data: [5, 10, 3],
      backgroundColor: ["#007bff", "#dc3545", "#28a745"],
    },
  ],
};

function PieChartRow() {
  const { dashboard } = useSelector((state) => state.dashboard);

  const ticketStatusOverviewlabels = dashboard?.ticketStatusOverview?.map(
    (item) => item.status
  );
  const ticketStatusOverviewdata = dashboard?.ticketStatusOverview?.map(
    (item) => item.count
  );

  const ticketStatusData = {
    labels: ticketStatusOverviewlabels,
    datasets: [
      {
        data: ticketStatusOverviewdata,
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#dc3545",
          "#ffc107",
          "#17a2b8",
        ],
      },
    ],
  };

  const keyMetricsData = {
    labels: ["Tickets Opened", "Tickets Closed", "Average Resolution Time"],
    datasets: [
      {
        data: [
          dashboard?.openTickets?.openTickets,
          dashboard?.escalatedTickets?.escalatedTickets?.count,
          dashboard?.avgResolutionTime?.avgResolutionTime,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      },
    ],
  };
  return (
    <Row className="mt-4">
      {/* Ticket Status Overview */}
      <Col md={4}>
        <Card>
          <Card.Header>Ticket Status Overview</Card.Header>
          <CardBody>
            <Pie data={ticketStatusData} />
          </CardBody>
        </Card>
      </Col>

      {/* Workload Distribution */}
      <Col md={4}>
        <Card>
          <Card.Header>Workload Distribution</Card.Header>
          <CardBody>
            <Doughnut data={workloadDistributionData} />
          </CardBody>
        </Card>
      </Col>

      {/* Key Metrics */}
      <Col md={4}>
        <Card>
          <Card.Header>Key Metrics</Card.Header>
          <CardBody>
            <Doughnut data={keyMetricsData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default PieChartRow;
