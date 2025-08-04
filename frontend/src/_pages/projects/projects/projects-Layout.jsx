import { Button, Col, Row } from "react-bootstrap";
import ListView from "./projects-list";
import EditForm from "./project-detail";
import { setProject, setMode } from "./projects-slice";
import ConfirmationDialog from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation";
import { useDispatch } from "react-redux";

function Projects() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(setProject({ id: "", code: "", name: "" }));
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Projects</h6>
        </header>
        <ListView />
        <EditForm />
        <ConfirmationDialog />
      </Row>
    </>
  );
}

export default Projects;
