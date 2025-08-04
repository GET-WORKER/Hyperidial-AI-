import { Button, Col, Row } from "react-bootstrap";
import ListView from "./organizations-list";
import EditForm from "./organization-detail";
import { setOrganization, setMode } from "./organizations-slice";
import { useDispatch } from "react-redux";

function Organization() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(
      setOrganization({ id: "", code: "", name: "", address: "", district: "" })
    );
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Organization</h6>
          {/* <Button
            size="sm"
            variant="success"
            type="submit"
            onClick={handlecreate}
          >
            create new
          </Button> */}
        </header>

        <ListView />
        <EditForm />
      </Row>
    </>
  );
}

export default Organization;
