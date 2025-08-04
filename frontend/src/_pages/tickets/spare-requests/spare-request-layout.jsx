import { Button, Col, Row } from "react-bootstrap";

import { setSpare, setMode } from "./spare-request-slice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation";
import ListView from "./spare-request-list";
import EditForm from "./spare-request-detail";

function SpareRequest() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(setSpare({ id: "", code: "", name: "" }));
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 px-3 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">spare_requests</h6>
          <Button
            size="sm"
            variant="success"
            type="submit"
            onClick={handlecreate}
          >
            view
          </Button>
        </header>
        <ListView />
        <EditForm />
        <ConfirmationDialog />
      </Row>
    </>
  );
}

export default SpareRequest;
