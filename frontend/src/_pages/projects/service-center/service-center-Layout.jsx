import { Button, Col, Row } from "react-bootstrap";
import ListView from "./service-center-list";
import EditForm from "./service-center-detail";
import { setCenter, setMode } from "./service-center-slice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation";

function ServiceCenter() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 px-3 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">service center</h6>
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
        <EditForm />
      </Row>
      <ConfirmationDialog />
    </>
  );
}

export default ServiceCenter;
