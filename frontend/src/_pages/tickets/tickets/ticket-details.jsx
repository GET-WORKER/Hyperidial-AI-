import { Button, Col, Row, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "./ticket-form";
import { setCustomer, setMode } from "./tickets-slice";
function TicketDetails() {
  const dispatch = useDispatch();
  const { ticket, mode, customer, loading, error } = useSelector(
    (state) => state.ticket
  );
  const handleEdit = () => {
    dispatch(setMode("edit"));
    dispatch(setCustomer({ data: ticket?.customer, state: true }));
  };
  const splitAndDisplay = (value) => {
    if (!value) return null;
    return value
      .split(";")
      .map((item, index) => <div key={index}>{item.trim()}</div>);
  };
  return (
    <>
      {mode === "view" ? (
        <Col xs={12} lg={3} className="p-0">
          <Accordion className="rounded-0 ">
            <Accordion.Item
              eventKey="0"
              className="rounded-0 border-end-0 border-start-0 "
            >
              <Accordion.Header>Customer Info</Accordion.Header>
              <Accordion.Body>
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Farmer Name
                        </small>
                      </td>
                      <td>{ticket?.customer?.farmer_name}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Address
                        </small>
                      </td>
                      <td>{ticket?.customer?.address}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          District
                        </small>
                      </td>
                      <td>{ticket?.customer?.district}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">State</small>
                      </td>
                      <td>{ticket?.customer?.state}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              eventKey="1"
              className="rounded-0 border-end-0 border-start-0"
            >
              <Accordion.Header>Product Info</Accordion.Header>
              <Accordion.Body className="drop-menu-h">
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          pump head sr.no
                        </small>
                      </td>
                      <td>{ticket?.customer?.pump_head_sr_no}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          pump capacity
                        </small>
                      </td>
                      <td>{ticket?.customer?.pump_capacity}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          pump type
                        </small>
                      </td>
                      <td>{ticket?.customer?.pump_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          pump head mtrs
                        </small>
                      </td>
                      <td>{ticket?.customer?.pump_head_mtrs}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          controller sr.no
                        </small>
                      </td>
                      <td>{ticket?.customer?.controller_sr_no}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          motor sr.no
                        </small>
                      </td>
                      <td>{ticket?.customer?.motor_sr_no}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          imei no
                        </small>
                      </td>
                      <td>{ticket?.customer?.imei_no}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          panel make
                        </small>
                      </td>
                      <td>{ticket?.customer?.panel_make}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          panel model
                        </small>
                      </td>
                      <td>{ticket?.customer?.panel_model}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          no of panels installed
                        </small>
                      </td>
                      <td>{ticket?.customer?.no_of_panels_installed}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase ">
                          pv sr.no
                        </small>
                      </td>
                      <td>
                        <td>{splitAndDisplay(ticket?.customer?.pv_sr_no)}</td>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          pump sub type
                        </small>
                      </td>
                      <td>{ticket?.customer?.pump_sub_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          water source
                        </small>
                      </td>
                      <td>{ticket?.customer?.water_source}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          water available depth
                        </small>
                      </td>
                      <td>{ticket?.customer?.water_available_depth}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="2"
              className="rounded-0 border-end-0 border-start-0"
            >
              <Accordion.Header>Contact Info</Accordion.Header>
              <Accordion.Body>
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Contact number
                        </small>
                      </td>
                      <td>{ticket?.customer?.mobile_number}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Address
                        </small>
                      </td>
                      <td>{ticket?.customer?.address}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              eventKey="3"
              className="rounded-0 border-end-0 border-start-0"
            >
              <Accordion.Header>Installation Info</Accordion.Header>
              <Accordion.Body>
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Service centre
                        </small>
                      </td>
                      <td>{ticket?.customer?.service_centre}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Installer name
                        </small>
                      </td>
                      <td>{ticket?.customer?.installer_name}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Installer code
                        </small>
                      </td>
                      <td>{ticket?.customer?.installer_code}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              eventKey="4"
              className="rounded-0 border-end-0 border-start-0"
            >
              <Accordion.Header>Ticket status</Accordion.Header>
              <Accordion.Body>
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Status code
                        </small>
                      </td>
                      <td>{ticket?.status}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Reported Issue
                        </small>
                      </td>
                      <td>{ticket?.customer?.reported_issue}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Fault code
                        </small>
                      </td>
                      <td>{ticket?.customer?.fault_code}</td>
                    </tr>
                    <tr>
                      <td>
                        <small className="fw-light text-uppercase">
                          Installer code
                        </small>
                      </td>
                      <td>{ticket?.customer?.installer_code}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {customer && (
            <Button className="m-2" onClick={() => handleEdit(true)}>
              Edit
            </Button>
          )}
        </Col>
      ) : (
        <Col xs={12} lg={3} className="p-0">
          <EditForm />
        </Col>
      )}
    </>
  );
}
export default TicketDetails;
