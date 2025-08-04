import { Button, Col, Row } from "react-bootstrap";
import ListView from "./teams-list";
import EditForm from "./team-detail";
import { setTeam, setMode } from "./teams-slice";
import { useDispatch } from "react-redux";

function Teams() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(
      setTeam({ id: "", name: "" })
    );
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Teams</h6>
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
    </>
  );
}

export default Teams;
