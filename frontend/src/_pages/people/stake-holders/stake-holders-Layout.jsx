import { Row } from "react-bootstrap";
import ListView from "./stake-holders-list";
import EditForm from "./stake-holder-detail";
import { setStakeHolder, setMode } from "./stake-holders-slice";
import { useDispatch } from "react-redux";

function StackHolders() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(
      setStakeHolder({ id: "", code: "", name: "", address: "", district: "" })
    );
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">StackHolders</h6>
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

export default StackHolders;
