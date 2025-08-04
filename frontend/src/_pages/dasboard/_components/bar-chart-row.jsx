import { Card, CardBody, Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

function BarChartRow() {
  const { dashboard } = useSelector((state) => state.dashboard);

  const sparePartsData = {
    labels: ["Requested", "Approved", "Issued", "Pending", "Returned"],
    datasets: [
      {
        label: "Spare Parts Status",
        data: [
          dashboard?.sparePartsManagement?.spare_parts_requested,
          dashboard?.sparePartsManagement?.spare_parts_approved,
          dashboard?.sparePartsManagement?.spare_parts_issued,
          dashboard?.sparePartsManagement?.spare_parts_pending,
          dashboard?.sparePartsManagement?.spare_parts_returned,
        ],
        backgroundColor: "#007bff",
      },
    ],
  };

  const ticketAgingData = {
    labels: ["1-3 Days", "4-7 Days", "8-14 Days", "15-30 Days", "31+ Days"],
    datasets: [
      {
        label: "Ticket Aging Analysis",
        data: [
          dashboard?.ticketAgeingAnalysis?._1_3_days,
          dashboard?.ticketAgeingAnalysis?._4_7_days,
          dashboard?.ticketAgeingAnalysis?._8_15_days,
          dashboard?.ticketAgeingAnalysis?._16_30_days,
          dashboard?.ticketAgeingAnalysis?._30_plus_days,
        ],
        backgroundColor: "#dc3545",
      },
    ],
  };

  const InventoryCategory = dashboard?.sparePartsInventory?.map(
    (category, i) => category.category
  );
  const InventoryItem = dashboard?.sparePartsInventory?.map(
    (item, i) => item.count
  );
  const sparePartsInventoryData = {
    labels: InventoryCategory,
    datasets: [
      {
        label: "Inventory Levels",
        data: InventoryItem,
        backgroundColor: "#ffc107",
      },
    ],
  };

  return (
    <Row className="mt-4">
      {/* Spare Parts Management */}
      <Col md={4}>
        <Card>
          <Card.Header>Spare Parts Management</Card.Header>
          <CardBody>
            <Bar data={sparePartsData} />
          </CardBody>
        </Card>
      </Col>

      {/* Spare Parts Inventory */}
      <Col md={4}>
        <Card>
          <Card.Header>Spare Parts Inventory</Card.Header>
          <CardBody>
            <Bar data={sparePartsInventoryData} />
          </CardBody>
        </Card>
      </Col>

      {/* Ticket Aging Analysis */}
      <Col md={4}>
        <Card>
          <Card.Header>Ticket Aging Analysis</Card.Header>
          <CardBody>
            <Bar data={ticketAgingData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default BarChartRow;
