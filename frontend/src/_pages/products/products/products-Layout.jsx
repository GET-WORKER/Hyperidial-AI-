import { Button, Col, Row } from "react-bootstrap";
import ListView from "./products-list";
import EditForm from "./product-detail";
import { setProduct, setMode } from "./products-slice";
import { useDispatch } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const handlecreate = () => {
    dispatch(
      setProduct({ id: "", code: "", name: "", address: "", district: "" })
    );
    dispatch(setMode("create"));
  };
  return (
    <>
      <Row className="p-2">
        <header className="d-flex justify-content-between p-1 align-items-center">
          <h6 className="text-uppercase m-0 text-primary">Products</h6>
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

export default Products;
