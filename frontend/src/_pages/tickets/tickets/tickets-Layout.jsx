import { Button, Col, Row } from "react-bootstrap";
import ListView from "./tickets-list";
import EditForm from "./ticket-form";
import { setTicket, setMode, setCustomer } from "./tickets-slice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation";
import TicketDetails from "./ticket-details";
import TicketCommunication from "./ticket-communication";

function Tickets() {
  const dispatch = useDispatch();
  const { mode, customer } = useSelector((state) => state.ticket);
  const handlecreate = () => {
    dispatch(setTicket({}));
    dispatch(setMode("create"));
    dispatch(setCustomer({ data: {}, state: true }));
  };
  return (
    <>
      <Row>
        <header className="d-flex justify-content-between p-1 px-3 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Tickets</h6>
          <Button
            size="sm"
            variant="success"
            type="submit"
            onClick={handlecreate}
          >
            Create New
          </Button>
        </header>
        <ListView />
        {mode !== null ? (
          <>
            <TicketDetails />
            <TicketCommunication />
          </>
        ) : (
          <Col className="text-center align-content-center">
            Select a ticket or start a new conversation
          </Col>
        )}

        <ConfirmationDialog />
      </Row>
    </>
  );
}

export default Tickets;
