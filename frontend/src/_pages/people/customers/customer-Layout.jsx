import { Button, Form, InputGroup, Row } from "react-bootstrap";
import ListView from "./customer-list";
import EditForm from "./customer-detail";
import { MdSearch } from "react-icons/md";

function Customers() {
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 px-3 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Customers</h6>
          <Form>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                type="text"
                placeholder="Search customer"
              />
              <Button className="px-2 m-0 d-grid align-items-center">
                <MdSearch />
              </Button>
            </InputGroup>
          </Form>
        </header>
        <ListView />
        <EditForm />
      </Row>
    </>
  );
}

export default Customers;
