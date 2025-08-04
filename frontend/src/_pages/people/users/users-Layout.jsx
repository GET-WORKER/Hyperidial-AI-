import { Row, Button } from "react-bootstrap";
import ListView from "./users-list";
import EditForm from "./user-detail";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation";
import { setUser, setMode } from "./users-slice";

function Users() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(setUser({ id: "", code: "", name: "" }));
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Users</h6>
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
        <ConfirmationDialog />
      </Row>
    </>
  );
}

export default Users;
